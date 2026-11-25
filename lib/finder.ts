/**
 * Compound finder decision tree for the home page. Each question either
 * leads to another question (`next`) or resolves to one exact product
 * (`product`, a product slug). Wording describes research focus only.
 */
export type FinderOption = {
  label: string;
  hint?: string;
  next?: string;
  product?: string;
};

export type FinderQuestion = {
  id: string;
  title: string;
  /** Sentence-case wording for the standalone quiz page. */
  prompt: string;
  options: FinderOption[];
};

export const FINDER_START = "goal";

export const FINDER: Record<string, FinderQuestion> = {
  goal: {
    id: "goal",
    title: "My Primary Research Goal Is To:",
    prompt: "What's your primary research goal?",
    options: [
      { label: "Build lean muscle & performance", next: "growth" },
      { label: "Support recovery & repair", next: "recovery" },
      { label: "Manage weight & metabolism", next: "metabolic" },
      { label: "Boost energy & endurance", next: "endurance" },
      { label: "Cellular energy & longevity", next: "longevity" },
      { label: "Improve skin & hair research", next: "dermal" },
    ],
  },

  // Weight & metabolism
  metabolic: {
    id: "metabolic",
    title: "Which Receptor Pathway Are You Studying?",
    prompt: "Which receptor pathway are you studying?",
    options: [
      {
        label: "Dual agonist",
        hint: "GLP-1 + GIP",
        product: "tirzepatide-40mg",
      },
      {
        label: "Triple agonist",
        hint: "GLP-1 + GIP + Glucagon",
        next: "metabolic-qty",
      },
    ],
  },
  "metabolic-qty": {
    id: "metabolic-qty",
    title: "How Much Material Does Your Study Need?",
    prompt: "How much material does your study need?",
    options: [
      {
        label: "Entry quantity",
        hint: "20 mg · 4 × 5 mg",
        product: "retatrutide-20mg",
      },
      {
        label: "Extended quantity",
        hint: "40 mg · 4 × 10 mg",
        product: "retatrutide-40mg",
      },
    ],
  },

  // Recovery
  recovery: {
    id: "recovery",
    title: "Which Blend Suits Your Study?",
    prompt: "Which blend suits your study?",
    options: [
      {
        label: "Structural tissue focus",
        hint: "BPC-157 + TB-500",
        product: "bpc-157-tb-500-40mg",
      },
      {
        label: "Add dermal & connective tissue",
        hint: "BPC-157 + TB-500 + GHK-Cu",
        product: "glow-70mg",
      },
    ],
  },

  // Skin & hair
  dermal: {
    id: "dermal",
    title: "What Should the Blend Include?",
    prompt: "What should the blend include?",
    options: [
      {
        label: "GHK-Cu multi-peptide blend",
        hint: "Dermal & connective tissue",
        product: "glow-70mg",
      },
      {
        label: "Structural peptides only",
        hint: "No GHK-Cu",
        product: "bpc-157-tb-500-40mg",
      },
    ],
  },

  // Energy & endurance
  endurance: {
    id: "endurance",
    title: "Which Mechanism Are You Studying?",
    prompt: "Which mechanism are you studying?",
    options: [
      {
        label: "Mitochondrial-derived peptide",
        hint: "Metabolic & endurance",
        product: "mots-c-40mg",
      },
      {
        label: "NAD+ cellular metabolism",
        hint: "High-dose NAD+",
        product: "nad-1000mg",
      },
    ],
  },

  // Longevity
  longevity: {
    id: "longevity",
    title: "Which Mechanism Are You Studying?",
    prompt: "Which mechanism are you studying?",
    options: [
      {
        label: "NAD+ cellular metabolism",
        hint: "High-dose NAD+",
        product: "nad-1000mg",
      },
      {
        label: "Mitochondrial-derived peptide",
        hint: "MOTS-C",
        product: "mots-c-40mg",
      },
    ],
  },

  // Growth & performance
  growth: {
    id: "growth",
    title: "What Is Your Research Focus?",
    prompt: "What is your research focus?",
    options: [
      {
        label: "GH release & lean mass",
        hint: "CJC-1295 without DAC",
        product: "cjc-1295-10mg",
      },
      {
        label: "Body composition",
        hint: "Tesamorelin GHRH analogue",
        product: "tesamorelin-20mg",
      },
    ],
  },
};
