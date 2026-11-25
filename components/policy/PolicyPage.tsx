import Link from "next/link";
import type { PolicyContent } from "@/lib/policies";
import ShopHeader from "@/components/cart/ShopHeader";
import Footer from "@/components/Footer";

const OTHER_POLICIES = [
  { label: "Press Release", href: "/press-release" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export default function PolicyPage({ content }: { content: PolicyContent }) {
  return (
    <main className="min-h-screen bg-cream">
      <ShopHeader />

      <section className="pb-20 pt-[clamp(40px,5vw,72px)]">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_260px] lg:gap-20">
            {/* Document */}
            <article className="min-w-0 max-w-[70ch]">
              <p className="eyebrow text-clay">{content.eyebrow}</p>
              <h1 className="display-2 mt-5 font-serif text-espresso">
                {content.title}
              </h1>
              <p className="label-xs mt-4 text-taupe">
                Last updated {content.updated}
              </p>

              {content.intro && (
                <p className="mt-8 text-[17px] font-light leading-relaxed text-clay">
                  {content.intro}
                </p>
              )}

              <div className="mt-10 flex flex-col">
                {content.sections.map((s) => (
                  <section
                    key={s.heading}
                    className="border-t border-sand py-8 first:pt-8"
                  >
                    <h2 className="font-serif text-[26px] leading-tight tracking-display text-espresso">
                      {s.heading}
                    </h2>
                    {s.body && (
                      <p className="mt-3 text-[16px] font-light leading-relaxed text-clay">
                        {s.body}
                      </p>
                    )}
                    {s.list && (
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {s.list.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[16px] font-light leading-relaxed text-clay"
                          >
                            <span aria-hidden className="text-taupe">
                              —
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.note && (
                      <p className="mt-5 rounded-[8px] bg-beige px-5 py-4 text-[14px] font-light leading-relaxed text-clay">
                        {s.note}
                      </p>
                    )}
                  </section>
                ))}
              </div>

              <p className="label-xs mt-6 border-t border-sand pt-6 text-[11px] leading-relaxed text-taupe">
                For laboratory R&amp;D use only. Not for human or veterinary
                consumption.
              </p>
            </article>

            {/* Rail */}
            <aside className="lg:sticky lg:top-[82px] lg:self-start">
              <p className="label-xs text-taupe">Legal &amp; policies</p>
              <ul className="mt-5 flex flex-col gap-1 border-t border-sand pt-4">
                {OTHER_POLICIES.map((p) => {
                  const isCurrent = p.href === `/${content.slug}`;
                  return (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`block py-2 text-[15px] transition-colors ${
                          isCurrent
                            ? "font-medium text-espresso"
                            : "font-light text-clay hover:text-espresso"
                        }`}
                      >
                        {p.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 rounded-[10px] bg-beige p-6">
                <p className="font-serif text-[22px] tracking-display text-espresso">
                  Need help?
                </p>
                <p className="mt-2 text-[14px] font-light leading-relaxed text-clay">
                  Reach our research support team any time.
                </p>
                <a
                  href="mailto:support@voralabs.com"
                  className="mt-4 inline-block text-[15px] text-espresso underline underline-offset-4"
                >
                  support@voralabs.com
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
