"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Editorial gallery: no thumbnails and no lightbox.
 *
 * - Below lg: a swipeable, snap-aligned rail with dot indicators, so the buy
 *   panel isn't pushed several screens down.
 * - lg and up: the images are laid out and scrolled past, two up and then
 *   full width, while the buy panel stays pinned beside them.
 *
 * `fit="contain"` pads packshots inside fixed beige frames. `fit="natural"`
 * shows lifestyle photographs whole, at their own proportions, so nothing
 * is cropped.
 */
export default function ProductGallery({
  images,
  alt,
  fit = "contain",
}: {
  images: string[];
  alt: string;
  fit?: "contain" | "natural";
}) {
  const natural = fit === "natural";
  const gallery = images.length ? images : [];
  const [first, second, ...rest] = gallery;
  const rail = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const altFor = (i: number) => (i === 0 ? alt : `${alt} — view ${i + 1}`);

  const onScroll = () => {
    const el = rail.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) => {
    const el = rail.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  /** One gallery image, either framed (contain) or at natural size.
   *  Called as a function (not a component) so images never remount. */
  const shot = ({
    src,
    index,
    frame,
    pad,
    sizes,
    priority = false,
  }: {
    src: string;
    index: number;
    frame: string;
    pad: string;
    sizes: string;
    priority?: boolean;
  }) =>
    natural ? (
      <div className="overflow-hidden rounded-[6px] bg-beige">
        <Image
          src={src}
          alt={altFor(index)}
          width={0}
          height={0}
          priority={priority}
          quality={90}
          sizes={sizes}
          className="block h-auto w-full"
        />
      </div>
    ) : (
      <div className={cn("relative overflow-hidden rounded-[6px] bg-beige", frame)}>
        <Image
          src={src}
          alt={altFor(index)}
          fill
          priority={priority}
          quality={90}
          sizes={sizes}
          className={cn("object-contain", pad)}
        />
      </div>
    );

  return (
    <>
      {/* Phones & tablets: swipe rail */}
      <div className="lg:hidden">
        <div
          ref={rail}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-[6px]"
        >
          {gallery.map((src, i) => (
            <div key={src} className="w-full flex-none snap-start">
              {natural ? (
                // Equal-height slides: the whole photo sits on a soft blurred
                // copy of itself, so nothing is cropped and there are no gaps.
                <div className="relative aspect-[4/5] overflow-hidden bg-beige sm:aspect-[4/3]">
                  <Image
                    src={src}
                    alt=""
                    aria-hidden
                    fill
                    // This copy only ever ships behind a 2xl blur at 60%
                    // opacity, so a thumbnail carries it. Asking for 50vw
                    // pulled a full half-viewport file to smear into a ground.
                    quality={40}
                    sizes="48px"
                    className="scale-110 object-cover opacity-60 blur-2xl"
                  />
                  <Image
                    src={src}
                    alt={altFor(i)}
                    fill
                    priority={i === 0}
                    quality={90}
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                shot({
                  src,
                  index: i,
                  frame: "aspect-square sm:aspect-[4/3]",
                  pad: "p-4 sm:p-10",
                  sizes: "100vw",
                  priority: i === 0,
                })
              )}
            </div>
          ))}
        </div>

        {gallery.length > 1 && (
          <div className="mt-3 flex justify-center gap-2">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-current={current === i}
                onClick={() => goTo(i)}
                className="tap-pad grid h-8 w-8 place-items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    current === i ? "w-5 bg-espresso" : "w-1.5 bg-taupe"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* lg+: editorial stack beside the pinned buy panel */}
      <div className="hidden flex-col gap-5 lg:flex">
        <div className="grid grid-cols-2 items-start gap-5">
          {first && (
            shot({ src: first, index: 0, frame: "aspect-square", pad: "p-6", sizes: "32vw", priority: true })
          )}
          {second && (
            shot({ src: second, index: 1, frame: "aspect-square", pad: "p-6", sizes: "32vw" })
          )}
        </div>

        {rest.map((src, i) => (
          <div key={src}>
            {shot({ src, index: i + 2, frame: "aspect-[4/3]", pad: "p-12", sizes: "64vw" })}
          </div>
        ))}
      </div>
    </>
  );
}
