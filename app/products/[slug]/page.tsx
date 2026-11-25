import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiCheck } from "react-icons/fi";
import { getProduct, relatedProducts, PRODUCTS } from "@/lib/products";
import { pageMetadata, PRODUCT_SEO } from "@/lib/seo";
import ShopHeader from "@/components/cart/ShopHeader";
import ProductGallery from "@/components/cart/ProductGallery";
import AddToCart from "@/components/cart/AddToCart";
import LabResultsModal from "@/components/cart/LabResultsModal";
import ProductInfoTabs from "@/components/cart/ProductInfoTabs";
import JanoshikReportModal from "@/components/cart/JanoshikReportModal";
import { StarRow } from "@/components/ui/Bits";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return { title: "Product — Vora Labs" };
  }

  const seo = PRODUCT_SEO[slug];
  return pageMetadata({
    path: `/products/${slug}`,
    title: seo?.title ?? `${product.name} — Vora Labs`,
    description: seo?.description ?? product.description,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(slug);

  return (
    <main className="min-h-screen bg-cream">
      <ShopHeader />

      <div className="container-x pb-20 pt-8 lg:pt-10">
        <nav className="mb-7 flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] text-taupe">
          <Link href="/" className="tap-pad transition-colors hover:text-espresso">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link
            href="/products"
            className="tap-pad transition-colors hover:text-espresso"
          >
            Shop
          </Link>
          <span aria-hidden>/</span>
          <span className="text-clay">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(360px,420px)] lg:items-start lg:gap-14">
          {/* ---------------- Gallery ---------------- */}
          <ProductGallery
            images={product.gallery}
            alt={product.name}
            fit={product.galleryFit}
          />

          {/* ---------------- Buy panel ---------------- */}
          <div className="flex flex-col lg:sticky lg:top-[82px]">
            {product.purity && (
              <StarRow count={product.purity} label="HPLC verified" />
            )}

            <h1 className="mt-4 font-sans text-[clamp(1.375rem,2.2vw,1.75rem)] font-bold uppercase leading-[1.15] tracking-[0.01em] text-espresso">
              {product.name}
            </h1>

            <p className="mt-2 text-[20px] font-medium text-espresso">
              {product.priceLabel}
            </p>

            <p className="mt-3 text-[16px] font-medium leading-relaxed text-espresso">
              {product.tagline}
            </p>

            {/* Specification bullets */}
            <ul className="mt-5 flex flex-col gap-2">
              {product.specs.map((s) => (
                <li
                  key={s.label}
                  className="flex gap-2 text-[15px] font-light leading-relaxed text-clay"
                >
                  <span aria-hidden className="text-taupe">
                    ·
                  </span>
                  <span>
                    <span className="text-espresso">{s.label}:</span> {s.value}
                  </span>
                </li>
              ))}
            </ul>

            {/* Purchase block */}
            <h2 className="mt-9 border-b border-sand pb-3 font-serif text-[22px] tracking-display text-espresso">
              Start your order
            </h2>

            <div className="mt-5 overflow-hidden rounded-[10px] border border-espresso">
              <p className="label-xs bg-espresso py-2.5 text-center text-cream">
                {product.purity
                  ? "Verified batch · COA included"
                  : "Pre-filled research format"}
              </p>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[17px] font-semibold text-espresso">
                    Single unit
                  </span>
                  <span className="text-[17px] text-espresso">
                    {product.priceLabel}
                  </span>
                </div>
                {product.batchNumber && (
                  <p className="mt-1 text-[14px] font-light text-clay">
                    {product.fillVolume} fill · batch {product.batchNumber}
                  </p>
                )}

                <ul className="mt-4 flex flex-col gap-2 border-t border-sand pt-4">
                  {product.tags.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-[14px] font-light text-clay"
                    >
                      <FiCheck size={14} className="flex-none text-espresso" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5">
              <AddToCart product={product} />
            </div>

            <p className="label-xs mt-4 text-[11px] leading-relaxed text-taupe">
              For research use only — not for human or veterinary use
            </p>

            {product.janoshikUrl ? (
              <div className="mt-6">
                <JanoshikReportModal
                  reportUrl={product.janoshikUrl}
                  productName={product.name}
                  batchNumber={product.batchNumber}
                  sampleImages={product.janoshikSamples}
                />
              </div>
            ) : (
              <p className="mt-6 text-[14px] font-light text-taupe">
                Janoshik analytical report — coming soon
              </p>
            )}
          </div>
        </div>

        {/* ---------------- Detail band ---------------- */}
        <section className="mt-14 grid grid-cols-1 gap-10 sm:mt-20 lg:mt-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="display-3 font-serif text-espresso">
              About This Vora Labs Compound
            </h2>
            <p className="mt-5 text-[16px] font-light leading-relaxed text-clay">
              {product.description}
            </p>
            <p className="mt-6 rounded-[10px] bg-beige px-5 py-4 text-[14px] font-light leading-relaxed text-clay">
              <span className="font-medium text-espresso">
                Research use disclaimer:
              </span>{" "}
              For research purposes only. Not intended for human or veterinary
              use. Not intended to diagnose, treat, cure or prevent any disease.
              Supplied strictly for laboratory and analytical research conducted
              by qualified professionals.
            </p>
          </div>

          <div>
            <ProductInfoTabs
              tabs={[
                {
                  key: "package",
                  label: "Package contents",
                  body: (
                    <ul className="flex flex-col gap-3">
                      {product.packageContents.map((c) => (
                        <li key={c} className="flex items-start gap-2.5">
                          <FiCheck
                            size={14}
                            className="mt-1 flex-none text-espresso"
                          />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  ),
                },
                {
                  key: "storage",
                  label: "Storage",
                  body: <p>{product.storageLogic}</p>,
                },
                {
                  key: "supply",
                  label: "Supply chain",
                  body: <p>{product.supplyChain}</p>,
                },
              ]}
            />
          </div>
        </section>

        {/* ---------------- Lab analysis ---------------- */}
        {product.analytes.length > 0 && (
        <section className="mt-14 rounded-[14px] bg-beige px-4 py-10 sm:mt-20 sm:px-10 sm:py-12 lg:mt-24">
          <div className="mx-auto max-w-[42ch] text-center">
            <h2 className="display-3 font-serif text-espresso">
              Vora Labs Third-Party Janoshik Results
            </h2>
            <p className="mt-3 text-[15px] font-light text-clay">
              Independently tested and verified by Janoshik Analytical.
            </p>
          </div>

          <dl className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-[10px] bg-sand sm:mt-10 sm:grid-cols-3">
            <Stat label="Batch number" value={product.batchNumber} wide />
            <Stat label="Fill volume" value={product.fillVolume} />
            <Stat label="Purity" value={product.purity} />
          </dl>

          {/* The assay table needs 460px of width; below that it scrolls, so
              a fade on the trailing edge says the third column is there. */}
          <div className="relative mx-auto mt-5 max-w-3xl">
            <div className="overflow-x-auto rounded-[10px] bg-cream">
              <table className="w-full min-w-[460px] text-left text-[15px]">
                <thead>
                  <tr className="border-b border-sand">
                    <th className="label-xs px-5 py-4 text-clay">Compound</th>
                    <th className="label-xs px-5 py-4 text-clay">
                      Concentration
                    </th>
                    <th className="label-xs px-5 py-4 text-clay">
                      Verified content
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand text-espresso">
                  {product.analytes.map((a) => (
                    <tr key={a.compound}>
                      <td className="px-5 py-4 font-medium">{a.compound}</td>
                      <td className="px-5 py-4 font-light">
                        {a.concentration}
                      </td>
                      <td className="px-5 py-4 font-light">
                        {a.verifiedContent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-[10px] bg-gradient-to-l from-cream to-transparent sm:hidden"
            />
          </div>

          <p className="mx-auto mt-4 max-w-3xl text-[13px] font-light text-taupe">
            Concentration is measured per mL; verified content reflects the
            total assayed mass across the stated fill volume.
          </p>
        </section>
        )}

        {/* ---------------- Related ---------------- */}
        <section className="mt-14 sm:mt-20 lg:mt-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display-3 font-serif text-espresso">
              More From Vora Labs
            </h2>
            <Link
              href="/products"
              className="label-xs border-b border-espresso pb-1 text-espresso"
            >
              View all
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-10 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
            {related.map((p, i) => (
              // Two columns below lg, so the third card would sit alone.
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className={`group ${i === 2 ? "hidden lg:block" : ""}`}
              >
                <div className="relative aspect-square overflow-hidden rounded-[6px] bg-beige">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width:1024px) 48vw, 31vw"
                    className="object-cover transition-transform duration-[1.4s] ease-smooth group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-3 font-sans text-[13px] font-semibold uppercase leading-snug tracking-[0.02em] text-espresso sm:mt-4 sm:text-[15px]">
                  {p.name}
                </h3>
                <div className="mt-1 flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <p className="line-clamp-1 text-[13px] font-light text-clay sm:text-[15px]">
                    {p.category}
                  </p>
                  <span className="text-[14px] font-medium text-espresso sm:text-[15px] sm:font-normal">
                    {p.priceLabel}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
      <LabResultsModal product={product} />
    </main>
  );
}

function Stat({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`bg-cream px-4 py-4 sm:px-5 sm:py-5 ${wide ? "col-span-2 sm:col-span-1" : ""}`}>
      <dt className="label-xs text-taupe">{label}</dt>
      <dd className="mt-2 break-words font-serif text-[20px] tracking-display text-espresso sm:text-[22px]">
        {value}
      </dd>
    </div>
  );
}
