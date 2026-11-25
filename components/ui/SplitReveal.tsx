"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Line-by-line mask reveal for display headings.
 *
 * Each line sits in an overflow-hidden wrapper and slides up from beneath it,
 * which reads as an editorial typesetting effect rather than an animation.
 * Supports an optional italic tail (`accent`) for the split headings this
 * system uses — "Trusted by *Millions of Researchers*".
 */
export default function SplitReveal({
  text,
  accent,
  as: Tag = "h2",
  className,
  accentClassName,
  trigger = true,
  delay = 0,
}: {
  text: string;
  accent?: string;
  as?: ElementType;
  className?: string;
  accentClassName?: string;
  trigger?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const split = new SplitType(ref.current, {
        types: "lines",
        tagName: "span",
        lineClass: "split-line-inner",
      });

      if (prefersReduced || !split.lines) {
        gsap.set(ref.current, { opacity: 1 });
        return;
      }

      // Wrap each line so it can be masked by its own clipping parent.
      split.lines.forEach((line) => {
        const wrap = document.createElement("span");
        wrap.className = "split-line";
        wrap.style.display = "block";
        wrap.style.overflow = "hidden";
        line.parentNode?.insertBefore(wrap, line);
        wrap.appendChild(line);
        (line as HTMLElement).style.display = "block";
      });

      gsap.set(split.lines, { yPercent: 105 });

      gsap.to(split.lines, {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.09,
        delay,
        scrollTrigger: trigger
          ? {
              trigger: ref.current,
              start: "top 88%",
            }
          : undefined,
      });

      return () => {
        split.revert();
      };
    },
    { scope: ref, dependencies: [text, accent] }
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {text}
      {accent ? (
        <>
          {" "}
          <i className={cn("serif-italic", accentClassName)}>{accent}</i>
        </>
      ) : null}
    </Tag>
  );
}
