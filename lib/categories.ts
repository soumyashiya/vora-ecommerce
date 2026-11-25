/**
 * Shopper-facing catalogue collections, shared by the home rail, the
 * catalogue page and the home category tiles so all three stay in step.
 * Each one matches against a product's `category` string.
 */
export type ShopCategory = {
  slug: string;
  label: string;
  match: (category: string) => boolean;
  /** Collection banner copy. */
  eyebrow: string;
  headline: string;
  blurb: string;
};

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    slug: "weight-management",
    label: "Weight Management",
    match: (c) => c.includes("GLP-1"),
    eyebrow: "Collection",
    headline: "Weight Management",
    blurb: "GLP-1, GIP and glucagon receptor compounds, pre-filled and batch verified.",
  },
  {
    slug: "recovery-repair",
    label: "Recovery & Repair",
    match: (c) => c.includes("Structural"),
    eyebrow: "Collection",
    headline: "Recovery & Repair",
    blurb: "Structural and tissue research compounds with a published COA on every batch.",
  },
  {
    slug: "skin-hair-care",
    label: "Skin & Hair Care",
    match: (c) => c.includes("GHK-Cu"),
    eyebrow: "Collection",
    headline: "Skin & Hair Care",
    blurb: "GHK-Cu blends for dermal and connective tissue research.",
  },
  {
    slug: "energy-longevity",
    label: "Energy & Longevity",
    match: (c) => c.includes("Cellular"),
    eyebrow: "Collection",
    headline: "Energy & Longevity",
    blurb: "Cellular research compounds, HPLC analysed and independently verified.",
  },
  {
    slug: "fitness-endurance",
    label: "Fitness & Endurance",
    match: (c) => c.includes("Mitochondrial"),
    eyebrow: "Collection",
    headline: "Fitness & Endurance",
    blurb: "Mitochondrial-derived peptides for metabolic and endurance research.",
  },
  {
    slug: "growth-performance",
    label: "Growth & Performance",
    match: (c) => c.includes("Growth Hormone"),
    eyebrow: "Collection",
    headline: "Growth & Performance",
    blurb: "GHRH analogues for GH-release, lean-mass and body-composition research.",
  },
];

/** The "everything" collection shown before a category is picked. */
export const ALL_CATEGORY: ShopCategory = {
  slug: "all",
  label: "All Products",
  match: () => true,
  eyebrow: "Full catalogue",
  headline: "Research Peptides, Verified",
  blurb:
    "Every compound is filled to precise concentration, HPLC analysed in house, then independently verified by Janoshik before release.",
};
