"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiSliders, FiX } from "react-icons/fi";
import { PRODUCTS, type Product } from "@/lib/products";
import { ALL_CATEGORY, SHOP_CATEGORIES } from "@/lib/categories";
import ProductCard from "./ProductCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const COLLECTIONS = [ALL_CATEGORY, ...SHOP_CATEGORIES];

/** One banner image for every collection. */
const SHOP_BANNER = "/new-images/shop-banner.webp";

const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "purity", label: "Highest purity" },
] as const;
type SortKey = (typeof SORTS)[number]["key"];

const purityOf = (p: Product) => parseFloat(String(p.purity)) || 0;

const sortProducts = (items: Product[], sort: SortKey) => {
  const list = [...items];
  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
  if (sort === "purity") list.sort((a, b) => purityOf(b) - purityOf(a));
  return list;
};

const countIn = (slug: string) => {
  const c = COLLECTIONS.find((x) => x.slug === slug) ?? ALL_CATEGORY;
  return PRODUCTS.filter((p) => c.match(p.category)).length;
};

/** Resolve ?category=slug, or the legacy ?focus=<category text> deep link. */
const resolveCollection = (category: string | null, focus: string | null) => {
  const bySlug = COLLECTIONS.find((c) => c.slug === category);
  if (bySlug) return bySlug;
  if (focus) return SHOP_CATEGORIES.find((c) => c.match(focus)) ?? ALL_CATEGORY;
  return ALL_CATEGORY;
};

/**
 * Collection page: photographic banner, collection tabs with a
 * Filter & Sort drawer, product grid with an editorial promo tile, and a
 * dark assurance strip underneath (rendered by the page).
 */
export default function ShopGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const collection = resolveCollection(params.get("category"), params.get("focus"));
  const [sort, setSort] = useState<SortKey>("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectCollection = (slug: string) => {
    const query = slug === ALL_CATEGORY.slug ? "" : `?category=${slug}`;
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  const items = useMemo(
    () =>
      sortProducts(
        PRODUCTS.filter((p) => collection.match(p.category)),
        sort
      ),
    [collection, sort]
  );

  // Close the drawer on Escape and lock page scroll while it is open.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  // The promo tile sits after the fourth product when there is room for it.
  const promoAfter = items.length > 4 ? 3 : -1;

  return (
    <div>
      <CollectionBanner collection={collection} />

      {/* Collection tabs + Filter & Sort */}
      <div className="container-x mt-8 lg:mt-10">
        <div className="flex items-center gap-4 border-b border-sand">
          {/* Phones: the tabs get the full row and scroll; a fade on the
              trailing edge says there are more. Filter moves to the count row. */}
          <div className="relative min-w-0 flex-1">
          <div
            role="tablist"
            aria-label="Collections"
            className="no-scrollbar flex items-center gap-6 overflow-x-auto pb-3 pr-8 pt-1 lg:gap-10"
          >
            {COLLECTIONS.map((c) => (
              <button
                key={c.slug}
                type="button"
                role="tab"
                aria-selected={collection.slug === c.slug}
                data-active={collection.slug === c.slug}
                onClick={() => selectCollection(c.slug)}
                className="tab-link flex-none whitespace-nowrap uppercase tracking-[0.06em]"
              >
                {c.label}
              </button>
            ))}
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent"
          />
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            // Below xs the label is hidden and only the icon remains, which
            // would otherwise leave the control unnamed.
            aria-label="Filter and sort"
            className="mb-2 hidden flex-none items-center gap-2 rounded-full bg-beige px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.06em] text-espresso transition-colors hover:bg-sand sm:flex"
          >
            <span>Filter &amp; Sort</span>
            <FiSliders size={14} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
          <p className="text-[13px] font-light text-clay">
            {items.length} {items.length === 1 ? "product" : "products"}
            {sort !== "featured" && (
              <> · sorted by {SORTS.find((s) => s.key === sort)?.label.toLowerCase()}</>
            )}
          </p>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Filter and sort"
            className="flex flex-none items-center gap-2 rounded-full border border-sand px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.06em] text-espresso sm:hidden"
          >
            <span>Filter &amp; Sort</span>
            <FiSliders size={14} />
          </button>
        </div>

        {/* Grid */}
        {/* Two up on phones, three from tablet — at 768–1023 a two-column
            grid left the cards nearly 350px wide with only four on screen. */}
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
          {items.map((p, i) => (
            <Fragment key={p.slug}>
              <ProductCard product={p} index={i} />
              {i === promoAfter && <PromoTile />}
            </Fragment>
          ))}
        </div>

        {items.length === 0 && (
          <div className="mt-10 rounded-[10px] bg-beige px-6 py-14 text-center">
            <p className="font-serif text-[28px] text-espresso">Nothing here yet</p>
            <p className="mt-2 text-[15px] font-light text-clay">
              New compounds in this collection are on the way.
            </p>
            <button
              type="button"
              onClick={() => selectCollection(ALL_CATEGORY.slug)}
              className="btn-solid mt-6"
            >
              View all products
            </button>
          </div>
        )}
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeSlug={collection.slug}
        onCollection={selectCollection}
        sort={sort}
        onSort={setSort}
        resultCount={items.length}
      />
    </div>
  );
}

/**
 * Shop banner. The same full shop artwork stays in place for every
 * collection; only the copy over it changes. Desktop: the artwork at its
 * own 1600×535 shape with the copy over its empty left side. Below that:
 * the full artwork on top, then the copy on the dark ground beneath it.
 *
 * The overlay only holds together once the banner is wide enough for the
 * copy well to clear the packshots. At the 1600/535 shape a 900px viewport
 * is a 300px-tall banner whose clear left third is ~300px wide — the blurb
 * cannot shrink to fit that and still be readable, so it ran across the
 * boxes. Stacking through to lg avoids the collision entirely.
 */
function CollectionBanner({ collection }: { collection: (typeof COLLECTIONS)[number] }) {
  return (
    <section className="relative flex flex-col bg-[#2B150C] lg:block lg:aspect-[1600/535]">
      <div className="relative aspect-[1600/535] lg:absolute lg:inset-0 lg:aspect-auto">
        <Image
          src={SHOP_BANNER}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <span className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-[#2B150C]/70 to-transparent lg:block" />
      </div>

      <div className="container-x relative flex h-full items-center py-10 lg:absolute lg:inset-0 lg:py-0">
        <motion.div
          key={collection.slug}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[30rem] lg:max-w-[34%]"
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-chartreuse">
            {collection.eyebrow}
          </p>
          {/* While the banner is stacked the headline gets its own scale —
              4.4vw bottoms out at 36px, which is far too heavy on a phone. */}
          <h1 className="mt-4 font-serif text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.02] tracking-display text-cream lg:text-[clamp(2.25rem,4.4vw,4rem)]">
            {collection.headline}
          </h1>
          <p className="mt-4 max-w-[40ch] text-[15px] font-light leading-relaxed text-cream/80 lg:text-[16px]">
            {collection.blurb}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/** Editorial tile that spans two grid columns between product rows. */
function PromoTile() {
  return (
    <Link
      href="/why-us"
      className="group relative col-span-2 block min-h-[300px] overflow-hidden rounded-[6px] bg-[#2B150C] sm:min-h-[340px]"
    >
      <Image
        src="/new-images/every-batch.webp"
        alt=""
        fill
        // The tile is taller than the still, so `cover` scales to its height
        // and needs more than the column's own width.
        sizes="(max-width:1024px) 130vw, 78vw"
        className="object-cover object-right transition-transform duration-[1.4s] ease-smooth group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-gradient-to-r from-[#2B150C]/90 via-[#2B150C]/40 to-transparent" />
      <span className="absolute inset-0 bg-gradient-to-t from-[#2B150C]/70 via-[#2B150C]/50 to-[#2B150C]/30 sm:hidden" />

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div>
          <p className="font-sans text-[clamp(1.6rem,3vw,2.4rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em] text-cream">
            Every batch,
            <br />
            independently verified.
          </p>
          <p className="mt-3 max-w-[32ch] text-[15px] font-light text-cream/90 sm:text-cream/80">
            Janoshik tested, 99%+ HPLC purity and a published certificate of
            analysis.
          </p>
        </div>

        <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-chartreuse px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-espresso">
          How we verify
          <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function FilterDrawer({
  open,
  onClose,
  activeSlug,
  onCollection,
  sort,
  onSort,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  activeSlug: string;
  onCollection: (slug: string) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  resultCount: number;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-espresso/40"
          />
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Filter and sort"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
            data-lenis-prevent
            className="fixed inset-y-0 right-0 z-[81] flex w-full max-w-[400px] flex-col bg-cream shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-sand px-6 py-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-espresso">
                Filter &amp; Sort
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="grid h-9 w-9 place-items-center rounded-full text-espresso hover:bg-beige"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
              <DrawerGroup title="Sort by">
                {SORTS.map((s) => (
                  <OptionRow
                    key={s.key}
                    label={s.label}
                    active={sort === s.key}
                    onClick={() => onSort(s.key)}
                  />
                ))}
              </DrawerGroup>

              <DrawerGroup title="Collection">
                {COLLECTIONS.map((c) => (
                  <OptionRow
                    key={c.slug}
                    label={c.label}
                    meta={countIn(c.slug)}
                    active={activeSlug === c.slug}
                    onClick={() => onCollection(c.slug)}
                  />
                ))}
              </DrawerGroup>
            </div>

            <div
              className="flex gap-3 border-t border-sand px-6 pt-5"
              style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
            >
              <button
                type="button"
                onClick={() => {
                  onSort("featured");
                  onCollection(ALL_CATEGORY.slug);
                }}
                className="btn-outline flex-1"
              >
                Clear
              </button>
              <button type="button" onClick={onClose} className="btn-solid flex-1">
                Show {resultCount}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function DrawerGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="mb-8 last:mb-0">
      <legend className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-clay">
        {title}
      </legend>
      <div className="flex flex-col">{children}</div>
    </fieldset>
  );
}

function OptionRow({
  label,
  meta,
  active,
  onClick,
}: {
  label: string;
  meta?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="flex items-center justify-between border-b border-sand/70 py-3.5 text-left text-[15px] text-espresso"
    >
      <span className={active ? "font-medium" : "font-light"}>
        {label}
        {meta !== undefined && <span className="ml-1.5 text-taupe">({meta})</span>}
      </span>
      <span
        className={`grid h-5 w-5 place-items-center rounded-full border transition-colors ${
          active ? "border-espresso bg-espresso text-cream" : "border-taupe"
        }`}
      >
        {active && <FiCheck size={12} />}
      </span>
    </button>
  );
}
