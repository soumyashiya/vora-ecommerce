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
  { label: "Same-day dispatch", Icon: FiTruck },
  { label: "Volume pricing", Icon: FiPackage },
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
    <section className="relative isolate overflow-hidden bg-espresso lg:aspect-[1600/704]">
      {/* The still is 2.3:1, so on narrow viewports `cover` scales it to the
          band's height and needs well over 100vw of pixels — the sizes hints
          keep Next from serving an upscaled file. */}
      {/* Below lg the photo gets its own block above the copy (cropped to
          the cartons and pens); from lg it runs full-bleed behind the type. */}
      <div className="relative aspect-[3/2] md:aspect-[2/1] lg:absolute lg:inset-0 lg:aspect-auto">
        <Image
          src={IMG.cta}
          alt=""
          fill
          quality={90}
          sizes="(max-width: 767px) 160vw, (max-width: 1023px) 115vw, 100vw"
          className="object-cover object-[91%_center] md:object-center"
        />
        <div className="absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-espresso to-transparent lg:hidden" />
      </div>
      {/* The cartons are bright and sit where the type lands, so the scrim
          carries more weight bottom-left than the old warm still needed. */}
      <div className="absolute inset-0 hidden bg-gradient-to-tr from-espresso/90 via-espresso/55 to-espresso/15 lg:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-espresso/65 via-transparent to-transparent lg:block" />
      {/* Below lg the crop lands the bright cartons directly under the type,
          so the band carries an extra flat wash until the ratio layout takes
          over and the copy moves clear of them. */}

      <div className="container-x relative flex flex-col justify-end pb-10 pt-6 lg:h-full lg:min-h-[420px] lg:pt-[clamp(80px,14vh,160px)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-[min(760px,94%)]"
        >
          <h2 className="display-2 font-serif text-cream">
            Buying in Bulk?{" "}
            <i className="serif-italic">Get Vora Labs Wholesale Pricing</i>
          </h2>
          {/* 17px sits below the large-text threshold, and the cartons behind
              it only clear the type from lg — so it runs brighter until then. */}
          <p className="mt-5 max-w-[48ch] text-[17px] font-light leading-relaxed text-cream/90 lg:text-cream/80">
            Volume rates and scheduled supply for labs and research groups, with the same batch-level COA on every unit.
          </p>
          <div className="mt-8">
            <OnDarkButton href="/wholesale">Get a wholesale quote</OnDarkButton>
          </div>
        </motion.div>

        <div className="mt-12 border-t border-cream/25 pt-7">
          {/* Phones read these as a tidy pair of columns; from sm the row has
              the width to wrap on its own. */}
          <ul className="grid grid-cols-1 gap-x-6 gap-y-4 xs:grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-5">
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
                <span className="label-xs text-[12px] sm:whitespace-nowrap sm:text-[13px]">
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
