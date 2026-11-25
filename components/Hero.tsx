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

      // Phones stack the photo above the copy, so the drift would push the
      // image into the text block — keep the parallax to the overlay layout.
      const overlay = window.matchMedia("(min-width: 768px)").matches;

      if (imgRef.current && !prefersReduced) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.08 },
          { scale: 1, duration: 1.8, ease: "power3.out" }
        );
        // Slow parallax drift as the hero leaves the viewport.
        if (overlay) gsap.to(imgRef.current, {
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
      className="relative w-full overflow-hidden bg-espresso md:h-[min(100svh,860px)] md:min-h-[560px]"
    >
      {/* The shot is 2:1 with the pack on the right, so a tall hero crops the
          sides hard. Anchor right of centre as the viewport narrows: the pack
          stays whole and the empty left third keeps holding the type. */}
      {/* Phones: the 2:1 shot can't fill a tall screen without blowing the
          pack up past the edges, so it gets its own block on top — square,
          anchored right, which frames exactly the pack and pen — and the copy
          sits below it. From md the photo runs full-bleed behind the type. */}
      <div ref={imgRef} className="relative aspect-square w-full sm:aspect-[4/3] md:absolute md:inset-0 md:aspect-auto">
        <Image
          src={IMG.hero}
          alt="Retatrutide 40mg carton and pre-filled pen in warm studio light"
          fill
          priority
          // 95 cost 428KB on a phone for an SSIM of 0.979 against 90 — no
          // visible difference on a photograph, nearly half the bytes.
          quality={90}
          // The hero is far taller than the 2:1 source, so `cover` scales the
          // image to the container HEIGHT — it needs well over 100vw of pixels.
          // These hints stop Next serving a soft, upscaled 640px file.
          sizes="(max-width: 639px) 200vw, (max-width: 767px) 150vw, (max-width: 1280px) 140vw, 120vw"
          className="object-cover object-right md:object-[80%_center] xl:object-[88%_center]"
        />
        {/* Phones: darken under the header and melt the bottom edge into the
            copy block below. */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-espresso/60 to-transparent md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-espresso to-transparent md:hidden" />
      </div>

      {/* Scrim: just enough to hold the type, weighted to the left column.
          Only from lg does the crop leave the left third clear — below that
          the white carton sits behind the headline and lead, so the bottom
          half of the scrim carries the extra weight. */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-espresso/70 via-espresso/25 to-transparent md:block" />
      <div className="absolute inset-0 hidden bg-espresso/22 md:block lg:hidden" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-espresso/85 via-espresso/30 to-espresso/25 lg:from-espresso/40 lg:via-transparent lg:to-espresso/20" />

      <div className="container-x relative flex flex-col justify-end pb-12 pt-4 md:h-full md:pb-[clamp(56px,9vh,110px)] md:pt-0">
        <div className="max-w-[min(640px,92%)]">
          <p className="hero-rise eyebrow text-cream">Lab tested · Same-day dispatch</p>

          <h1 className="hero-rise display-1 mt-5 font-serif text-cream">
            Vora Labs Peptides,
            <br />
            Verified Every Batch
          </h1>

          <p className="hero-rise mt-6 max-w-[46ch] text-[17px] font-light leading-relaxed text-cream/85">
            99%+ HPLC purity, independent Janoshik testing and a certificate of
            analysis with every order. Ready-to-use pens, shipped tracked.
          </p>

          <div className="hero-rise mt-9">
            <OnDarkButton href="/products">Shop all products</OnDarkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
