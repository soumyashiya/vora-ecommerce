"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiShield,
  FiFileText,
  FiTruck,
  FiThermometer,
  FiPackage,
} from "react-icons/fi";
import { IMG } from "@/lib/data";
import { OnDarkButton } from "./ui/Bits";

const EASE = [0.22, 1, 0.36, 1] as const;

const PERKS = [
  { label: "Janoshik tested", Icon: FiShield },
  { label: "Certificate of analysis", Icon: FiFileText },
  { label: "56-day stability", Icon: FiThermometer },
  { label: "Tracked dispatch", Icon: FiTruck },
  { label: "Wholesale supply", Icon: FiPackage },
];

/**
 * Full-bleed commitment band: one photograph, a lower-left type stack, then
 * a hairline and a tracked row of assurances — all sitting on the image.
 */
export default function CTA() {
  return (
    // From lg up the band takes the still's own 1600:704 ratio, so the whole
    // photograph shows with nothing cropped away. Narrower than that the type
    // needs more height than the ratio gives, so the content sets the height
    // and the image falls back to a centred cover crop.
    <section className="relative isolate overflow-hidden lg:aspect-[1600/704]">
      {/* The still is 2.3:1, so on narrow viewports `cover` scales it to the
          band's height and needs well over 100vw of pixels — the sizes hints
          keep Next from serving an upscaled file. */}
      <div className="absolute inset-0">
        <Image
          src={IMG.cta}
          alt=""
          fill
          quality={95}
          sizes="(max-width: 480px) 330vw, (max-width: 900px) 200vw, (max-width: 1280px) 150vw, 100vw"
          className="object-cover object-[42%_center] md:object-center"
        />
      </div>
      {/* The cartons are bright and sit where the type lands, so the scrim
          carries more weight bottom-left than the old warm still needed. */}
      <div className="absolute inset-0 bg-gradient-to-tr from-espresso/90 via-espresso/55 to-espresso/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/65 via-transparent to-transparent" />
      {/* Phones: the copy covers most of the photo, so even it out */}
      <div className="absolute inset-0 bg-espresso/45 md:hidden" />

      <div className="container-x relative flex min-h-[clamp(480px,66vh,720px)] flex-col justify-end pb-10 pt-[clamp(80px,14vh,160px)] lg:h-full lg:min-h-[420px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-[min(760px,94%)]"
        >
          <h2 className="display-2 font-serif text-cream">
            Verified Supply for Your{" "}
            <i className="serif-italic">Research Programme</i>
          </h2>
          <p className="mt-5 max-w-[48ch] text-[17px] font-light leading-relaxed text-cream/80">
            Because reproducible work starts with material you can account for.
          </p>
          <div className="mt-8">
            <OnDarkButton href="/wholesale">Request wholesale rates</OnDarkButton>
          </div>
        </motion.div>

        <div className="mt-12 border-t border-cream/25 pt-7">
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {PERKS.map(({ label, Icon }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                className="flex items-center gap-2.5 text-cream"
              >
                <Icon size={18} className="flex-none opacity-80" />
                <span className="label-xs whitespace-nowrap text-[12px] sm:text-[13px]">
                  {label}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
