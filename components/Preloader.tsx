"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Preloader() {
  const [done, setDone] = useState(false); // curtains start opening
  const [gone, setGone] = useState(false); // fully unmounted
  const [pct, setPct] = useState(0);

  // progress counter — the intro plays once per visit; later page loads in
  // the same session skip straight to the content.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("vora-intro") === "1";
      sessionStorage.setItem("vora-intro", "1");
    } catch {}
    if (seen) {
      setDone(true);
      setGone(true);
      return;
    }

    let n = 0;
    const iv = setInterval(() => {
      n = Math.min(100, n + Math.floor(Math.random() * 8) + 14);
      setPct(n);
      if (n >= 100) {
        clearInterval(iv);
        setTimeout(() => setDone(true), 150);
      }
    }, 45);
    const safety = setTimeout(() => setDone(true), 1500);
    return () => {
      clearInterval(iv);
      clearTimeout(safety);
    };
  }, []);

  // unmount after the curtain finishes opening
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setGone(true), 800);
    return () => clearTimeout(t);
  }, [done]);

  // lock scroll while loading
  useEffect(() => {
    document.documentElement.style.overflow = done ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [done]);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] ${done ? "pointer-events-none" : ""}`}
    >
      {/* LEFT curtain panel */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: done ? "-101%" : 0 }}
        transition={{ duration: 0.75, ease: EASE }}
        className="absolute inset-y-0 left-0 w-[51%] bg-espresso"
      />
      {/* RIGHT curtain panel */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: done ? "101%" : 0 }}
        transition={{ duration: 0.75, ease: EASE }}
        className="absolute inset-y-0 right-0 w-[51%] bg-espresso"
      />

      {/* centre content — fades out as the curtains part */}
      <motion.div
        animate={{ opacity: done ? 0 : 1, scale: done ? 0.96 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-baseline gap-2.5"
        >
          <span className="font-serif text-[clamp(44px,8vw,76px)] lowercase leading-none tracking-[0.01em] text-cream">
            vora
          </span>
          <span className="label-xs text-[12px] tracking-[0.3em] text-cream/55">
            labs
          </span>
        </motion.div>

        <div className="relative mt-12 h-px w-56 overflow-hidden bg-cream/20">
          <div
            className="h-full bg-chartreuse transition-[width] duration-100 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="relative mt-5 flex w-56 items-center justify-between">
          <span className="label-xs text-[11px] text-cream/60">Loading</span>
          <span className="font-serif text-[18px] tabular-nums text-cream">
            {pct}%
          </span>
        </div>
      </motion.div>
    </div>
  );
}
