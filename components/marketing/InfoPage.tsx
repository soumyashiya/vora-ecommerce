import Image from "next/image";
import type { InfoContent } from "@/lib/pages";
import ShopHeader from "@/components/cart/ShopHeader";
import Footer from "@/components/Footer";
import { SolidButton, GhostButton } from "@/components/ui/Bits";

export default function InfoPage({ content }: { content: InfoContent }) {
  // Pick the column count that divides evenly — 6 features sit as 3×2, 4 sit as
  // a single row of 4. A count that doesn't divide strands an orphan card.
  const n = content.features.length;
  const featureCols =
    n % 3 === 0 ? "lg:grid-cols-3" : n % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-2";

  const [firstClosing, ...restClosing] = content.closingParagraphs ?? [];

  return (
    <main className="min-h-screen bg-cream">
      <ShopHeader />

      {/* Intro — display heading left, body column right */}
      <section className="pb-[clamp(40px,5vw,72px)] pt-[clamp(40px,5vw,72px)]">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow text-clay">{content.eyebrow}</p>
              <h1 className="display-2 mt-5 max-w-[16ch] font-serif text-espresso">
                {content.title}
              </h1>
            </div>

            <div>
              <p className="text-[17px] font-light leading-relaxed text-clay">
                {content.lead}
              </p>
              {content.paragraphs.map((p) => (
                <p
                  key={p}
                  className="mt-4 text-[16px] font-light leading-relaxed text-clay"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {content.image && (
            <div
              className={`relative mt-12 w-full overflow-hidden rounded-[10px] bg-beige lg:mt-16 ${
                content.image.wide ? "aspect-[4/3] sm:aspect-[16/7]" : "aspect-[16/9]"
              }`}
            >
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                priority
                quality={90}
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-cover object-center"
              />
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-beige py-[clamp(48px,6vw,88px)]">
        <div className="container-x">
          <div className="max-w-[44ch]">
            <h2 className="display-3 font-serif text-espresso">
              {content.featuresTitle}
            </h2>
            {content.featuresIntro && (
              <p className="mt-4 text-[16px] font-light leading-relaxed text-clay">
                {content.featuresIntro}
              </p>
            )}
          </div>

          <div className={`mt-10 grid gap-5 sm:grid-cols-2 ${featureCols}`}>
            {content.features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-[10px] bg-cream p-7 transition-shadow duration-500 hover:shadow-card"
                >
                  <span className="mb-6 grid h-11 w-11 place-items-center rounded-full bg-chartreuse text-espresso">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-serif text-[24px] leading-tight tracking-display text-espresso">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[15px] font-light leading-relaxed text-clay">
                    {f.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing */}
      {firstClosing && (
        <section className="py-[clamp(48px,6vw,88px)]">
          <div className="container-x">
            <div className="lg:flex lg:items-end lg:justify-between lg:gap-14">
              <div className="max-w-[60ch]">
                {content.closingTitle ? (
                  <>
                    <h2 className="display-3 font-serif text-espresso">
                      {content.closingTitle}
                    </h2>
                    <p className="mt-5 text-[16px] font-light leading-relaxed text-clay">
                      {firstClosing}
                    </p>
                  </>
                ) : (
                  <p className="display-3 font-serif text-espresso">
                    {firstClosing}
                  </p>
                )}
                {restClosing.map((p) => (
                  <p
                    key={p}
                    className="mt-4 text-[16px] font-light leading-relaxed text-clay"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-0 lg:flex-none">
                <SolidButton href="/products">Browse compounds</SolidButton>
                <GhostButton href="/wholesale">Wholesale</GhostButton>
              </div>
            </div>

            <p className="label-xs mt-12 border-t border-sand pt-6 text-[11px] text-taupe">
              {content.kicker}
            </p>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
