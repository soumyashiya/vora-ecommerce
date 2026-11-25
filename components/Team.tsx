"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TEAM } from "@/lib/data";
import { GhostButton } from "./ui/Bits";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Origin-story split: a wide photograph with the location set large over its
 * lower edge, and a narrow column of display type, body copy and the team
 * credit line beside it.
 */
export default function Team() {
  return (
    <section id="story" className="section-pad-sm">
      <div className="container-x">
        <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-beige sm:aspect-[16/11]"
          >
            <Image
              src="/new-images/ourstory.png"
              alt="Athlete training beside the BPC-157 & TB-500 kit"
              fill
              sizes="(max-width:1024px) 100vw, 58vw"
              className="object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-espresso/65 to-transparent" />
            <span className="absolute bottom-5 left-6 right-6 font-serif text-[clamp(1.75rem,4.4vw,3.75rem)] leading-none tracking-display text-cream">
              United States
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <h2 className="display-2-sm font-serif text-espresso">
              Raising the Standard for Research Supply
            </h2>

            <p className="mt-6 text-[16px] font-light leading-relaxed text-clay">
              Vora Labs was built on a simple position: research material should
              be as accountable as the work it supports. Every compound is
              synthesised to specification, filled in a controlled environment,
              HPLC analysed in house and then independently verified before it
              is released — with the certificate published, not promised.
            </p>

            <ul className="mt-8 flex flex-col gap-3 border-t border-sand pt-6">
              {TEAM.map((member) => (
                <li
                  key={member.name}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                >
                  <span className="text-[15px] text-espresso">
                    {member.name}
                  </span>
                  <span className="label-xs text-taupe">{member.role}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <GhostButton href="/about">Our story</GhostButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
