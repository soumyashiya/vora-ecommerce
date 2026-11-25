---
name: design-system
description: VORA design tokens and section order — warm editorial system modelled on arrae.com
metadata:
  type: project
---

VORA's UI was rebuilt on 2026-11-19 to follow the visual language of
https://www.arrae.com (warm editorial supplement brand). It previously cloned
plenara.webflow.io (navy/lime/Playfair) — that system is gone. Stack is
unchanged: Next.js 15 + TS + Tailwind + Framer Motion + GSAP/ScrollTrigger +
Lenis + SplitType.

**Colors** (defined as CSS vars in `app/globals.css`, mirrored in `tailwind.config.ts`):
- `cream` page bg `#FFFDF5`, `cream.deep` `#FBF6EA`
- `beige` panel `#F2E9DB`, `sand` hairline border `#E8DCC9`
- `espresso` ink + dark sections `#21180E`, `espresso.soft` `#3E2F1E`
- `clay` secondary text `#6B5B49`, `taupe` muted `#B6B1AA`
- `chartreuse` accent `#D0E067` — announcement bar and small accents only

Legacy Tailwind names (`ivory`, `navy`, `lime`, `ink`, `body`) are kept as
aliases pointing at the new values, so older markup inherits the palette
without being rewritten. Prefer the new names in new code.

**Fonts:** display = Instrument Serif 400 + italic (`--font-instrument`), body
= Figtree 300–700 (`--font-figtree`). These are free Google Fonts standing in
for the reference's licensed Cardinal Fruit and Proxima Nova. `h1`–`h4` inherit
the serif from the base layer — add `font-sans` explicitly on any heading that
should be the uppercase bold sans style (product names, PDP title).

**Type scale** (`.display-1` 80px → `.display-4` 32px), all at `letter-spacing:
-0.03em`. Tracked uppercase micro-labels use `.eyebrow` / `.label-xs`
(`0.07em`). Buttons are pills: `.btn-solid` (espresso), `.btn-outline` (cream),
`.btn-on-dark` (over photography), `.btn-accent`, `+ .btn-sm`.

**Radii are small** — 6px on image cards, 8–14px on panels. Nothing uses the
old 24–32px pill-cards.

**Photography is uniformly warm.** Every lifestyle/background image in
`public/images/update-img/*-warm.png` was generated for this palette; cool
clinical stock reads as broken here. `.warm-grade` / `.warm-grade-soft` in
globals.css exist for any image that still needs correcting. Product packshots
are `object-contain` on a `bg-beige` square — they are landscape and crop badly.

**Header:** one `components/SiteHeader.tsx` for the whole site.
`variant="overlay"` (home, via `Navbar.tsx`) is transparent over the hero and
flips to cream past 90px; `variant="solid"` (everything else, via
`cart/ShopHeader.tsx`) is the cream bar. ShopHeader still accepts its old
`backHref`/`backLabel` props but ignores them.

**Home section order:** AnnouncementBar+Nav → Hero → ClientsBar (trust strip) →
Programs (tabbed product rail) → Benefits (4 photo tiles) → CTA (commitment
band + perks) → Facilities (guided finder) → About (process band + 3 cards) →
Testimonials (4 portraits) → Marquee → Team (story split) → Blog (journal) →
Footer.

`components/Pricing.tsx`, `FAQ.tsx`, `AppDownload.tsx` and `HowWeWork.tsx` are
dead — not imported by any route — and were left on the old styling.
