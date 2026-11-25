"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BLOG, STEPS, TEAM } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE },
};

/**
 * One wide still life per team role. Product scenes rather than people, so
 * no photo implies who a team member is — swap in real portraits later.
 */
const TEAM_IMAGES = [
  "/new-images/tirzepatide/Tirzepatide carton and pen gym still life-3.png",
  "/new-images/reta/ALLUVI packaging and pen on ivory tray-1.png",
  "/new-images/nad/ALLUVI NAD+ in golden sunlight-1.png",
];

/** What each role owns, taken from the process steps they lead. */
const TEAM_REMITS = [
  "Owns synthesis and sourcing — every API is made to specification and logged for traceability from day one.",
  "Runs analytical HPLC on every fill, confirming purity and verified content before a batch can move on.",
  "Signs off each release only once identity, purity and the Janoshik certificate all line up.",
];

const STEP_IMAGES = [
  "/new-images/cjc/ALLUVI CJC-1295 Carton and Pen-2.png",
  "/new-images/tessa/Carton and pen on sculptural ivory plinth-3.png",
  "/new-images/nad/ALLUVI NAD+ carton and pen hero-2.png",
  "/new-images/bpc/Luxury cream carton and capped pen-3 (1).png",
];

/**
 * About page: banner, manifesto, the team, how a batch comes together,
 * and journal highlights.
 */
export default function AboutContent() {
  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container-x py-3">
        <ol className="flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] text-clay">
          <li>
            <Link href="/" className="hover:text-espresso">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-taupe">
            /
          </li>
          <li className="text-espresso">About us</li>
        </ol>
      </nav>

      {/* Banner */}
      <section className="relative overflow-hidden">
        {/* about-banner@2x is the saved banner with its letterbox bars cut
            off and doubled to 3200px. The strip is 5.35:1, so on anything
            narrower than a desktop `cover` scales it to the band's height and
            needs far more than 100vw of pixels — hence the sizes hints. */}
        <Image
          src="/new-images/about-banner@2x.webp"
          alt=""
          fill
          priority
          quality={95}
          sizes="(max-width:640px) 280vw, (max-width:1024px) 170vw, (max-width:1280px) 130vw, 100vw"
          className="object-cover object-center"
        />
        <span className="absolute inset-0 bg-espresso/50" />
        <div className="container-x relative flex min-h-[200px] items-center justify-center py-12 sm:min-h-[240px]">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-center font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-display text-cream"
          >
            This Is Where
            <br />
            Research Meets Rigor.
          </motion.h1>
        </div>
      </section>

      {/* Manifesto */}
      <section className="container-x grid items-center gap-8 py-[clamp(48px,6vw,88px)] lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <motion.div
          {...fadeUp}
          className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-beige lg:aspect-[5/3]"
        >
          <Image
            src="/new-images/ourstory.png"
            alt="Training beside the Vora Labs BPC-157 & TB-500 kit"
            fill
            quality={90}
            sizes="(max-width:1024px) 100vw, 58vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div {...fadeUp}>
          <h2 className="font-serif text-[clamp(2.25rem,4vw,3.5rem)] leading-none tracking-display text-espresso">
            Our Manifesto
          </h2>
          <div className="mt-6 flex flex-col gap-5 text-[16px] font-light leading-relaxed text-espresso/85">
            <p>
              Research should rest on material you can account for. We supply
              research-grade peptide compounds for controlled laboratory R&amp;D,
              with documented quality, independent testing and traceable
              sourcing behind every unit.
            </p>
            <p>
              Researchers deserve more than a product label. So every batch is
              filled to precise concentration, HPLC analysed in house, then
              independently verified by Janoshik — with the certificate
              published, not promised.
            </p>
            <p>
              We keep it consistent, accountable and clear, from sourcing and
              formulation to testing and release.
            </p>
          </div>
          <p className="serif-italic mt-8 font-serif text-[28px] leading-none text-espresso">
            — The Vora Labs Team
          </p>
        </motion.div>
      </section>

      {/* Meet the team — tall banner, then one full-width card per person
          with the copy alternating sides. Every card is sticky, so while
          scrolling each one stays pinned and the next slides up over it. */}
      <section className="container-x flex flex-col gap-4">
        <motion.div
          {...fadeUp}
          className="sticky top-[40px] grid aspect-[4/5] place-items-center overflow-hidden rounded-[12px] bg-espresso sm:aspect-[16/10] lg:aspect-[15/8]"
        >
          <Image
            src="/new-images/bpc/Woman Holding Alluvi Carton and Pen.png"
            alt=""
            fill
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-espresso/25" />
          <h2 className="relative text-center font-serif text-[clamp(3.25rem,8vw,7rem)] leading-[0.9] tracking-display text-cream [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
            Meet the
            <br />
            <span className="serif-italic">Team</span>
          </h2>
        </motion.div>

        {TEAM.map((m, i) => {
          const right = i % 2 === 1;
          return (
            <motion.article
              key={m.name}
              {...fadeUp}
              className="sticky top-[40px] overflow-hidden rounded-[12px] bg-beige shadow-[0_-24px_48px_-32px_rgba(33,24,14,0.45)] lg:aspect-[15/8]"
            >
              {/* Photo fills the far ~62% and melts into the beige ground,
                  leaving a clean field for the copy. */}
              <div
                className={`relative aspect-[4/3] lg:absolute lg:inset-y-0 lg:aspect-auto lg:w-[62%] ${
                  right ? "lg:left-0" : "lg:right-0"
                }`}
              >
                <Image
                  src={TEAM_IMAGES[i % TEAM_IMAGES.length]}
                  alt=""
                  fill
                  quality={90}
                  sizes="100vw"
                  className="object-cover"
                />
                <span
                  className={`absolute inset-y-0 hidden w-[35%] lg:block ${
                    right
                      ? "right-0 bg-gradient-to-l from-beige to-transparent"
                      : "left-0 bg-gradient-to-r from-beige to-transparent"
                  }`}
                />
              </div>

              <div
                className={`relative p-6 sm:p-8 lg:absolute lg:top-0 lg:w-[40%] lg:p-0 lg:pt-[clamp(32px,4vw,64px)] ${
                  right ? "lg:right-[clamp(32px,4vw,64px)]" : "lg:left-[clamp(24px,2.5vw,40px)]"
                }`}
              >
                <h3 className="font-serif text-[clamp(2.5rem,5.5vw,5.25rem)] leading-[0.95] tracking-display text-espresso">
                  {m.name}
                </h3>
                <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-clay">
                  {m.role}
                </p>
                <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-espresso/85 lg:text-[17px]">
                  {TEAM_REMITS[i]}
                </p>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* How a batch comes together */}
      <section className="container-x py-[clamp(56px,7vw,104px)]">
        <motion.h2
          {...fadeUp}
          className="text-center font-serif text-[clamp(2rem,3.6vw,3rem)] leading-none tracking-display text-espresso"
        >
          How Every Batch Comes Together
        </motion.h2>

        <div className="snap-rail no-scrollbar -mx-[max(20px,3.2vw)] mt-10 flex gap-4 overflow-x-auto px-[max(20px,3.2vw)] pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {STEPS.map((step, i) => (
            <motion.article
              key={step.id}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="flex w-[78vw] flex-none flex-col rounded-[14px] bg-beige p-4 xs:w-[60vw] sm:w-[44vw] lg:w-auto"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[13px] font-medium uppercase tracking-[0.06em] text-espresso">
                  {step.id}
                </span>
                <span className="serif-italic text-right font-serif text-[18px] leading-tight text-espresso">
                  {step.title}
                </span>
              </div>
              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[8px] bg-sand">
                <Image
                  src={STEP_IMAGES[i % STEP_IMAGES.length]}
                  alt=""
                  fill
                  sizes="(max-width:1024px) 78vw, 24vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 px-1 pb-2 text-[14px] font-light leading-relaxed text-espresso/85">
                {step.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Journal highlights */}
      <section className="container-x pb-[clamp(56px,7vw,104px)]">
        <motion.div {...fadeUp}>
          <h2 className="font-serif text-[clamp(2.25rem,4vw,3.5rem)] leading-none tracking-display text-espresso">
            Highlights &amp; Insights
          </h2>
          <p className="mt-4 max-w-[46ch] text-[16px] font-light leading-relaxed text-espresso/85">
            Read the thinking behind our process in the Vora Labs Journal.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {BLOG.map((post, i) => (
            <motion.div
              key={post.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
            >
              <Link href="/press-release" className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-beige">
                  <Image
                    src={post.img}
                    alt=""
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-4 font-serif text-[24px] leading-[1.15] tracking-display text-espresso">
                  {post.title}
                </h3>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-[12px] uppercase leading-snug tracking-[0.04em] text-clay">
                    {post.author}
                    <br />
                    <span className="normal-case tracking-normal">{post.date}</span>
                  </p>
                  <span className="rounded-[6px] bg-beige px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.06em] text-espresso">
                    {post.category}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
