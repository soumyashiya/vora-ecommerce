// Single source of truth for Vora Labs research products.
// FOR LABORATORY RESEARCH & DEVELOPMENT USE ONLY — NOT FOR HUMAN OR VETERINARY CONSUMPTION.

export type LabAnalyte = {
  compound: string;
  concentration: string; // e.g. "16.83 mg/mL"
  verifiedContent: string; // e.g. "40.39 mg"
};

export type Product = {
  slug: string;
  id: string; // display label e.g. "RP 01"
  name: string;
  price: number; // USD
  priceLabel: string; // "$129.00"
  image: string;
  gallery: string[];
  /**
   * "natural" shows lifestyle shots uncropped at their own proportions;
   * default "contain" pads packshots inside fixed frames.
   */
  galleryFit?: "contain" | "natural";
  category: string;
  /** Flags a recent addition — the catalogue card carries a "New" pill. */
  isNew?: boolean;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  tags: string[];
  // Janoshik third-party lab analysis panel
  batchNumber: string;
  fillVolume: string; // "2.4 mL"
  purity: string; // "99.24%"
  analytes: LabAnalyte[];
  janoshikUrl?: string;
  janoshikSamples?: string[];
  // Info tabs
  packageContents: string[];
  storageLogic: string;
  supplyChain: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "tirzepatide-40mg",
    id: "RP 01",
    name: "Tirzepatide 40mg",
    price: 129,
    priceLabel: "$129.00",
    image: "/new-images/ALLUVI-Tirzepatide-40mg.png",
    gallery: [
      "/new-images/tirzepatide/Tirzepatide cartons with orange-accented pen-1.png",
      "/new-images/tirzepatide/Fitness portrait with tirzepatide carton and pen-2.png",
      "/new-images/tirzepatide/Tirzepatide carton and pen gym still life-3.png",
    ],
    galleryFit: "natural",
    category: "GLP-1 / GIP",
    tagline: "Dual agonist of GLP-1 & GIP receptors, pre-filled for research.",
    description:
      "Vora Labs Tirzepatide 40mg is supplied in a pre-filled precision format at exact concentration, HPLC analysed and independently verified through Janoshik before release. Produced exclusively for controlled laboratory research and in-vitro study.",
    specs: [
      { label: "Form", value: "Pre-filled research pen (2.4 mL)" },
      { label: "Concentration", value: "40 mg total · 4 x 10 mg increments" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
    ],
    tags: ["99%+ Purity", "Janoshik Tested", "HPLC Verified", "R&D Only"],
    batchNumber: "VRA-TRZ-40-2601",
    fillVolume: "2.4 mL",
    purity: "99.24%",
    analytes: [
      { compound: "Tirzepatide", concentration: "16.83 mg/mL", verifiedContent: "40.39 mg" },
    ],
    janoshikUrl: "/certificates/tirzepatide-40mg/report.png",
    janoshikSamples: [
      "/certificates/tirzepatide-40mg/sample-1.jpg",
      "/certificates/tirzepatide-40mg/sample-2.jpg",
      "/certificates/tirzepatide-40mg/sample-3.jpg",
    ],
    packageContents: [
      "Pre-filled research pen (40 mg Tirzepatide, 2.4 mL fill)",
      "Batch-referenced Janoshik certificate reference card",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C for long-term stability. The formulation is validated to hold verified purity and pH for 56 days at controlled room temperature during active research use. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification, filled in a controlled environment, HPLC analysed in-house, then independently verified by Janoshik before release. Every unit is batch-referenced end-to-end and released only after passing identity, purity and appearance criteria.",
  },
  {
    slug: "retatrutide-20mg",
    id: "RP 02",
    name: "Retatrutide 20mg",
    price: 129,
    priceLabel: "$129.00",
    image: "/new-images/ALLUVI-Retatrutide-20mg (1).png",
    gallery: [
      "/new-images/reta20/Alluvi Retatrutide Carton and Pen-2.png",
      "/new-images/reta20/Auburn beauty with Alluvi products-3.png",
      "/new-images/reta20/Alluvi Retatrutide on Sunlit Sand-1.png",
    ],
    galleryFit: "natural",
    category: "GLP-1 / GIP / Glucagon",
    tagline: "Triple agonist research compound in an entry research quantity.",
    description:
      "Vora Labs Retatrutide 20mg is filled to precise concentration in a pre-filled research format, then HPLC analysed and independently certified. Every batch is released with a verifiable certificate of analysis for controlled R&D programmes.",
    specs: [
      { label: "Form", value: "Pre-filled research pen (2.4 mL)" },
      { label: "Concentration", value: "20 mg total · 4 x 5 mg increments" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
    ],
    tags: ["99%+ Purity", "HPLC Verified", "Pre-Filled Format", "R&D Only"],
    batchNumber: "VRA-RTA-20-2602",
    fillVolume: "2.4 mL",
    purity: "99.18%",
    analytes: [
      { compound: "Retatrutide", concentration: "8.42 mg/mL", verifiedContent: "20.21 mg" },
    ],
    janoshikUrl: "/certificates/retatrutide-20mg/report.png",
    janoshikSamples: [
      "/certificates/retatrutide-20mg/sample-1.jpg",
      "/certificates/retatrutide-20mg/sample-2.jpg",
    ],
    packageContents: [
      "Pre-filled research pen (20 mg Retatrutide, 2.4 mL fill)",
      "Batch-referenced Janoshik certificate reference card",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C for long-term stability. The formulation is validated to hold verified purity and pH for 56 days at controlled room temperature during active research use. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification, filled in a controlled environment, HPLC analysed in-house, then independently verified by Janoshik before release. Every unit is batch-referenced end-to-end and released only after passing identity, purity and appearance criteria.",
  },
  {
    slug: "retatrutide-40mg",
    id: "RP 03",
    name: "Retatrutide 40mg",
    price: 229,
    priceLabel: "$229.00",
    image: "/new-images/ALLUVI-Retatrutide-40mg (1).png",
    gallery: [
      "/new-images/reta/Alluvi 40mg carton and pen-3.png",
      "/new-images/reta/Alluvi carton and pen on a café table-2.png",
      "/new-images/reta/ALLUVI packaging and pen on ivory tray-1.png",
    ],
    galleryFit: "natural",
    category: "GLP-1 / GIP / Glucagon",
    tagline: "Extended research quantity at the highest fill concentration.",
    description:
      "Vora Labs Retatrutide 40mg is our highest-concentration triple-agonist research format — validated for 56-day room-temperature stability and independently verified through Janoshik with full batch traceability.",
    specs: [
      { label: "Form", value: "Pre-filled research pen (2.4 mL)" },
      { label: "Concentration", value: "40 mg total · 4 x 10 mg increments" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
    ],
    tags: ["High Concentration", "56-Day Stability", "Janoshik Tested", "R&D Only"],
    batchNumber: "VRA-RTA-40-2603",
    fillVolume: "2.4 mL",
    purity: "99.31%",
    analytes: [
      { compound: "Retatrutide", concentration: "16.87 mg/mL", verifiedContent: "40.49 mg" },
    ],
    janoshikUrl: "/certificates/retatrutide-40mg/report.png",
    janoshikSamples: [
      "/certificates/retatrutide-40mg/sample-1.jpg",
      "/certificates/retatrutide-40mg/sample-2.jpg",
    ],
    packageContents: [
      "Pre-filled research pen (40 mg Retatrutide, 2.4 mL fill)",
      "Batch-referenced Janoshik certificate reference card",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C for long-term stability. The formulation is validated to hold verified purity and pH for 56 days at controlled room temperature during active research use. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification, filled in a controlled environment, HPLC analysed in-house, then independently verified by Janoshik before release. Every unit is batch-referenced end-to-end and released only after passing identity, purity and appearance criteria.",
  },
  {
    slug: "bpc-157-tb-500-40mg",
    id: "RP 04",
    name: "BPC-157 & TB-500 40mg",
    price: 169,
    priceLabel: "$169.00",
    image: "/new-images/ALLUVI-BPC-157-TB-500-40mg.png",
    gallery: [
      // Portraits first (shown side by side), landscapes after (full width).
      "/new-images/bpc/Luxury cream carton and capped pen-3 (1).png",
      "/new-images/bpc/Woman with carton and upright pen.png",
      "/new-images/bpc/ALLUVI pen, carton, and lemons-2.png",
      "/new-images/bpc/Woman Holding Alluvi Carton and Pen.png",
    ],
    galleryFit: "natural",
    category: "Structural & Tissue Research",
    tagline: "Dual-compound structural and tissue-biology research blend.",
    description:
      "Vora Labs BPC-157 & TB-500 40mg combines two research peptides in a single pre-filled research format, formulated in a controlled environment and independently certified. Supplied strictly for laboratory research and in-vitro study.",
    specs: [
      { label: "Form", value: "Pre-filled research pen (2.4 mL)" },
      { label: "Blend", value: "BPC-157 & TB-500 · 40 mg total" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
    ],
    tags: ["Dual Compound", "Structural Research Blend", "COA Provided", "R&D Only"],
    batchNumber: "VRA-BPC-40-2604",
    fillVolume: "2.4 mL",
    purity: "99.12%",
    analytes: [
      { compound: "BPC-157", concentration: "8.34 mg/mL", verifiedContent: "20.02 mg" },
      { compound: "TB-500", concentration: "8.36 mg/mL", verifiedContent: "20.06 mg" },
    ],
    janoshikUrl: "/certificates/bpc-157-tb-500-40mg/report.png",
    janoshikSamples: [
      "/certificates/bpc-157-tb-500-40mg/sample-1.jpg",
      "/certificates/bpc-157-tb-500-40mg/sample-2.jpg",
    ],
    packageContents: [
      "Pre-filled research pen (BPC-157 20 mg + TB-500 20 mg, 2.4 mL fill)",
      "Batch-referenced Janoshik certificate reference card",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C for long-term stability. The formulation is validated to hold verified purity and pH for 56 days at controlled room temperature during active research use. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification, filled in a controlled environment, HPLC analysed in-house, then independently verified by Janoshik before release. Every unit is batch-referenced end-to-end and released only after passing identity, purity and appearance criteria.",
  },
  {
    slug: "glow-70mg",
    id: "RP 05",
    name: "Glow 70mg",
    price: 129,
    priceLabel: "$129.00",
    image: "/new-images/ALLUVI-Glow-70mg.png",
    gallery: [
      "/new-images/glow/Alluvi Glow GHK-CU Carton and Pen-3.png",
      "/new-images/glow/Alluvi Glow carton in ivory catchall-2.png",
      "/new-images/glow/Woman holding Alluvi Glow carton and pen-1.png",
    ],
    galleryFit: "natural",
    category: "GHK-Cu Blend",
    tagline: "Multi-peptide GHK-Cu research blend for dermal and connective-tissue study.",
    description:
      "Vora Labs Glow 70mg is a multi-peptide GHK-Cu research blend (BPC-157 / TB-500 / GHK-Cu) supplied in a pre-filled research format with full batch traceability and an independent certificate of analysis.",
    specs: [
      { label: "Form", value: "Pre-filled research pen (2.4 mL)" },
      { label: "Blend", value: "BPC-157 10 mg / TB-500 10 mg / GHK-Cu 50 mg" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
    ],
    tags: ["Multi-Peptide", "Batch Traceable", "HPLC Verified", "R&D Only"],
    batchNumber: "VRA-GLW-70-2605",
    fillVolume: "2.4 mL",
    purity: "99.08%",
    analytes: [
      { compound: "BPC-157", concentration: "4.18 mg/mL", verifiedContent: "10.03 mg" },
      { compound: "TB-500", concentration: "4.19 mg/mL", verifiedContent: "10.06 mg" },
      { compound: "GHK-Cu", concentration: "20.91 mg/mL", verifiedContent: "50.18 mg" },
    ],
    janoshikUrl: "/certificates/glow-70mg/report.png",
    janoshikSamples: [
      "/certificates/glow-70mg/sample-1.jpg",
      "/certificates/glow-70mg/sample-2.jpg",
    ],
    packageContents: [
      "Pre-filled research pen (BPC-157 10 mg / TB-500 10 mg / GHK-Cu 50 mg, 2.4 mL fill)",
      "Batch-referenced Janoshik certificate reference card",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C for long-term stability. The formulation is validated to hold verified purity and pH for 56 days at controlled room temperature during active research use. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification, filled in a controlled environment, HPLC analysed in-house, then independently verified by Janoshik before release. Every unit is batch-referenced end-to-end and released only after passing identity, purity and appearance criteria.",
  },
  {
    slug: "nad-1000mg",
    id: "RP 06",
    name: "NAD+ 1,000mg",
    price: 179,
    priceLabel: "$179.00",
    image: "/new-images/ALLUVI-NAD-Plus-1000mg.png",
    gallery: [
      "/new-images/nad/ALLUVI NAD+ carton and pen hero-2.png",
      "/new-images/nad/Freckled portrait holding ALLUVI NAD+ carton-3.png",
      "/new-images/nad/ALLUVI NAD+ in golden sunlight-1.png",
    ],
    galleryFit: "natural",
    category: "Cellular Research",
    tagline: "High-dose NAD+ research compound for cellular metabolism study.",
    description:
      "Vora Labs NAD+ 1,000mg is a high-dose research compound supplied in a pre-filled research format, HPLC verified and independently certified for controlled cellular research and in-vitro study.",
    specs: [
      { label: "Form", value: "Pre-filled research pen (2.4 mL)" },
      { label: "Concentration", value: "1,000 mg total · 100 mg increments" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
    ],
    tags: ["High Dose", "Cellular Research", "HPLC Verified", "R&D Only"],
    batchNumber: "VRA-NAD-1K-2606",
    fillVolume: "2.4 mL",
    purity: "99.02%",
    analytes: [
      { compound: "NAD+", concentration: "418.75 mg/mL", verifiedContent: "1,005.0 mg" },
    ],
    janoshikUrl: "",
    packageContents: [
      "Pre-filled research pen (1,000 mg NAD+, 2.4 mL fill)",
      "Batch-referenced Janoshik certificate reference card",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C for long-term stability. The formulation is validated to hold verified purity and pH for 56 days at controlled room temperature during active research use. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification, filled in a controlled environment, HPLC analysed in-house, then independently verified by Janoshik before release. Every unit is batch-referenced end-to-end and released only after passing identity, purity and appearance criteria.",
  },

  // New releases. Lab fields (batch, purity, analytes, COA) stay empty until
  // the Janoshik results are in — the product page hides those panels.
  // TODO: confirm prices before launch.
  {
    slug: "mots-c-40mg",
    id: "RP 07",
    name: "MOTS-C 40mg",
    price: 149,
    priceLabel: "$149.00",
    image: "/new-images/ALLUVI-MOTS-C-40mg.png",
    gallery: [
      "/new-images/motc/Warm beige hero shot_ pen and carton-3.png",
      "/new-images/motc/Capped 10 mg pen on steel plinth-2.png",
      "/new-images/motc/Gym tote with branded purple carton-1.png",
    ],
    galleryFit: "natural",
    category: "Mitochondrial Research",
    isNew: true,
    tagline: "Mitochondrial-derived peptide for metabolic and endurance research.",
    description:
      "Vora Labs MOTS-C 40mg is a mitochondrial-derived research peptide supplied in a pre-filled research format at exact concentration. Produced exclusively for controlled laboratory research and in-vitro study.",
    specs: [
      { label: "Form", value: "Pre-filled research pen" },
      { label: "Concentration", value: "40 mg total · 4 x 10 mg increments" },
      { label: "Storage", value: "2–8°C, protect from light" },
    ],
    tags: ["Pre-Filled Format", "Batch Traceable", "R&D Only"],
    batchNumber: "",
    fillVolume: "",
    purity: "",
    analytes: [],
    janoshikUrl: "",
    packageContents: [
      "Pre-filled research pen (40 mg MOTS-C)",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification and filled in a controlled environment. Every unit is batch-referenced end-to-end and released only after passing identity and appearance criteria.",
  },
  {
    slug: "tesamorelin-20mg",
    id: "RP 08",
    name: "Tesamorelin 20mg",
    price: 149,
    priceLabel: "$149.00",
    image: "/new-images/ALLUVI-Tesamorelin-20mg.png",
    gallery: [
      "/new-images/tessa/Champagne-lit 20mg carton and 2mg pen-1.png",
      "/new-images/tessa/Carton and pen on sculptural ivory plinth-3.png",
      "/new-images/tessa/Soft-focus vanity product portrait-2.png",
    ],
    galleryFit: "natural",
    category: "Growth Hormone Research",
    isNew: true,
    tagline: "GHRH analogue for body-composition and lean-mass research.",
    description:
      "Vora Labs Tesamorelin 20mg is a growth hormone–releasing hormone analogue supplied in a pre-filled research format at exact concentration. Produced exclusively for controlled laboratory research and in-vitro study.",
    specs: [
      { label: "Form", value: "Pre-filled research pen" },
      { label: "Concentration", value: "20 mg total · 10 x 2 mg increments" },
      { label: "Storage", value: "2–8°C, protect from light" },
    ],
    tags: ["Pre-Filled Format", "Batch Traceable", "R&D Only"],
    batchNumber: "",
    fillVolume: "",
    purity: "",
    analytes: [],
    janoshikUrl: "",
    packageContents: [
      "Pre-filled research pen (20 mg Tesamorelin)",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification and filled in a controlled environment. Every unit is batch-referenced end-to-end and released only after passing identity and appearance criteria.",
  },
  {
    slug: "cjc-1295-10mg",
    id: "RP 09",
    name: "CJC-1295 10mg",
    price: 119,
    priceLabel: "$119.00",
    image: "/new-images/ALLUVI-CJC-1295-10mg.png",
    gallery: [
      // Portraits first (shown side by side), landscape after (full width).
      "/new-images/cjc/ALLUVI CJC-1295 Carton and Pen-2.png",
      "/new-images/cjc/ALLUVI CJC-1295 in Coral Light-3.png",
      "/new-images/cjc/ALLUVI CJC-1295 in a sunlit red coupe-1.png",
    ],
    galleryFit: "natural",
    category: "Growth Hormone Research",
    isNew: true,
    tagline: "CJC-1295 without DAC for GH-release and lean-mass research.",
    description:
      "Vora Labs CJC-1295 (without DAC) 10mg is a GHRH analogue research peptide supplied in a pre-filled research format at exact concentration. Produced exclusively for controlled laboratory research and in-vitro study.",
    specs: [
      { label: "Form", value: "Pre-filled research pen" },
      { label: "Concentration", value: "10 mg total · 25 x 400 mcg increments" },
      { label: "Storage", value: "2–8°C, protect from light" },
    ],
    tags: ["Without DAC", "Pre-Filled Format", "R&D Only"],
    batchNumber: "",
    fillVolume: "",
    purity: "",
    analytes: [],
    janoshikUrl: "",
    packageContents: [
      "Pre-filled research pen (10 mg CJC-1295 without DAC)",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification and filled in a controlled environment. Every unit is batch-referenced end-to-end and released only after passing identity and appearance criteria.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, count = 3): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug).slice(0, count);
}
