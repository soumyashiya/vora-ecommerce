import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Serif lowercase wordmark. The mark is purely typographic — no icon — so it
 * sits quietly against photography in the header and reads as a masthead in
 * the footer.
 */
export default function BrandLogo({
  dark = false,
  href = "/",
  size = "md",
  className,
}: {
  /** `true` when placed on a dark ground (footer, mobile overlay, hero). */
  dark?: boolean;
  href?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Vora Labs — home"
      className={cn("group inline-flex items-baseline gap-1.5", className)}
    >
      <span
        className={cn(
          "relative font-serif lowercase leading-none tracking-[-0.02em]",
          size === "lg"
            ? "text-[clamp(52px,7vw,88px)]"
            : "text-[34px] lg:text-[40px]",
          dark ? "text-cream" : "text-espresso"
        )}
      >
        vora
        {/* Chartreuse full stop — the one colour note in the mark */}
        <span
          aria-hidden
          className={cn(
            "inline-block rounded-full bg-chartreuse align-baseline",
            size === "lg" ? "ml-1 h-[0.14em] w-[0.14em]" : "ml-[3px] h-[6px] w-[6px] lg:h-[7px] lg:w-[7px]"
          )}
        />
      </span>
      <span
        className={cn(
          "font-sans font-semibold uppercase leading-none transition-opacity duration-500",
          size === "lg" ? "text-[13px] tracking-[0.34em]" : "text-[10px] tracking-[0.3em]",
          dark ? "text-cream/60" : "text-clay"
        )}
      >
        labs
      </span>
    </Link>
  );
}
