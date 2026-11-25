"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiArrowRight, FiStar } from "react-icons/fi";
import SplitReveal from "./SplitReveal";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Micro-label                                                         */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn("eyebrow text-clay", className)}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  accent,
  lead,
  align = "center",
  light = false,
  size = "lg",
  className,
}: {
  eyebrow?: string;
  title: string;
  /** Italic serif tail rendered after the title. */
  accent?: string;
  lead?: string;
  align?: "center" | "left";
  light?: boolean;
  size?: "lg" | "md";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <Eyebrow className={cn("mb-5", light && "text-cream/70")}>
          {eyebrow}
        </Eyebrow>
      ) : null}

      <SplitReveal
        text={title}
        accent={accent}
        as="h2"
        className={cn(
          size === "lg" ? "display-2" : "display-2-sm",
          "font-serif",
          light ? "text-cream" : "text-espresso",
          align === "center" && "mx-auto max-w-[22ch]"
        )}
      />

      {lead ? (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className={cn(
            "lead mt-5 max-w-[56ch]",
            light && "text-cream/70",
            align === "center" && "mx-auto"
          )}
        >
          {lead}
        </motion.p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  size?: "md" | "sm";
};

/** Solid espresso pill — the primary action. */
export function SolidButton({ children, href = "#", className, size }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn("btn-solid", size === "sm" && "btn-sm", className)}
    >
      {children}
    </Link>
  );
}

/** Outlined cream pill — the default action across the site. */
export function GhostButton({ children, href = "#", className, size }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn("btn-outline", size === "sm" && "btn-sm", className)}
    >
      {children}
    </Link>
  );
}

/** Outlined pill for use over photography. */
export function OnDarkButton({ children, href = "#", className, size }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn("btn-on-dark", size === "sm" && "btn-sm", className)}
    >
      {children}
    </Link>
  );
}

/**
 * Kept under its original name so existing call sites stay valid; it now
 * renders the system's primary solid pill rather than the old lime button.
 */
export function LimeButton({ children, href = "#", className, size }: ButtonProps) {
  return (
    <SolidButton href={href} className={className} size={size}>
      {children}
    </SolidButton>
  );
}

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

/** Five-star row with a review count, as used on product cards. */
export function StarRow({
  count,
  label = "Reviews",
  className,
}: {
  count?: number | string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="flex items-center gap-[2px] text-espresso" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar key={i} size={11} className="fill-espresso stroke-espresso" />
        ))}
      </span>
      {count !== undefined ? (
        <span className="text-[13px] font-light text-clay">
          {count} {label}
        </span>
      ) : null}
    </div>
  );
}

/** Circular arrow control used on carousels. */
export function ArrowControl({
  direction = "right",
  onClick,
  disabled,
  label,
  className,
}: {
  direction?: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "icon-btn disabled:cursor-not-allowed disabled:opacity-35",
        className
      )}
    >
      <FiArrowRight
        size={16}
        className={direction === "left" ? "rotate-180" : undefined}
      />
    </button>
  );
}

export { FiArrowUpRight, FiArrowRight };
