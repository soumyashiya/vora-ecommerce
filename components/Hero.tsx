"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IMG } from "@/lib/data";
import { OnDarkButton } from "./ui/Bits";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Full-bleed editorial hero: one photograph running edge to edge and under
 * the header, with a left-aligned eyebrow / display heading / lead / pill
 * stack sitting in the lower third. No cards, no badges — the image carries
 * the page and the type sits quietly on top of it.
 */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
        delay: 0.2,
      });

      tl.from(".hero-rise", {
        y: prefersReduced ? 0 : 26,
        opacity: 0,
        stagger: 0.1,
      });

      if (imgRef.current && !prefersReduced) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.08 },
          { scale: 1, duration: 1.8, ease: "power3.out" }
        );
        // Slow parallax drift as the hero leaves the viewport.
        gsap.to(imgRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: root }
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative h-[min(100svh,860px)] min-h-[560px] w-full overflow-hidden"
    >
      {/* The shot is 2:1 with the pack on the right, so a tall hero crops the
          sides hard. Anchor right of centre as the viewport narrows: the pack
          stays whole and the empty left third keeps holding the type. */}
      <div ref={imgRef} className="absolute inset-0">
        <Image
          src={IMG.hero}
          alt="Retatrutide 40mg carton and pre-filled pen in warm studio light"
          fill
          priority
          quality={95}
          // The hero is far taller than the 2:1 source, so `cover` scales the
          // image to the container HEIGHT — it needs well over 100vw of pixels.
          // These hints stop Next serving a soft, upscaled 640px file.
          sizes="(max-width: 480px) 400vw, (max-width: 900px) 230vw, (max-width: 1280px) 140vw, 120vw"
          className="object-cover object-[64%_center] md:object-[80%_center] xl:object-[88%_center]"
        />
      </div>

      {/* Scrim: just enough to hold the type, weighted to the left column.
          On phones the crop puts the white carton behind the headline, so the
          bottom half of the scrim carries more weight below sm. */}
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 via-espresso/25 to-transparent" />
      <div className="absolute inset-0 bg-espresso/30 sm:hidden" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/30 to-espresso/25 sm:from-espresso/40 sm:via-transparent sm:to-espresso/20" />

      <div className="container-x relative flex h-full flex-col justify-end pb-[clamp(56px,9vh,110px)]">
        <div className="max-w-[min(640px,92%)]">
          <p className="hero-rise eyebrow text-cream">Now Supplying</p>

          <h1 className="hero-rise display-1 mt-5 font-serif text-cream">
            Research Peptides,
            <br />
            Independently Verified
          </h1>

          <p className="hero-rise mt-6 max-w-[46ch] text-[17px] font-light leading-relaxed text-cream/85">
            Every batch HPLC analysed, Janoshik certified and released with a
            certificate of analysis you can check yourself.
          </p>

          <div className="hero-rise mt-9">
            <OnDarkButton href="/products">Shop now</OnDarkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
