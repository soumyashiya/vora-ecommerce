"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BLOG } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Editorial index. Heading and lead sit flush left above three tall image
 * cards; each card carries a tracked category label, a serif headline and a
 * byline rule.
 */
export default function Blog() {
  return (
    <section id="journal" className="section-pad">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <h2 className="display-2 font-serif text-espresso">
            The Vora Journal
          </h2>
          <p className="lead mt-4 max-w-[46ch]">
            Buying guides, storage tips and how to read the certificate that
            comes with your order.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {BLOG.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="group flex flex-col"
            >
              <Link href="/press-release" className="flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[6px] bg-beige">
                  <Image
                    src={post.img}
                    alt=""
                    fill
                    sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw"
                    className="object-cover transition-transform duration-[1.4s] ease-smooth group-hover:scale-[1.04]"
                  />
                  <span className="badge-float absolute left-4 top-4">
                    {post.category}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-[clamp(1.25rem,1.8vw,1.625rem)] leading-[1.15] tracking-display text-espresso">
                  {post.title}
                </h3>

                <div className="mt-4 flex items-center justify-between border-t border-sand pt-3.5">
                  <span className="label-xs text-clay">{post.author}</span>
                  <span className="label-xs text-taupe">{post.read} read</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
