"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type MenuImage = { src: string; sizes: string };

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/**
 * The header menus only mount when opened, so their photos used to start
 * downloading on first hover and pop in late. Once the page has finished
 * loading (so the hero is never slowed down), this renders the same images
 * off-screen with the same `sizes`: the browser fetches the exact files the
 * menus will ask for, and they open with every photo already in cache.
 */
export default function MenuImagePreload({ images }: { images: MenuImage[] }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Desktop only: the hover menus don't exist below lg.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const w = window as IdleWindow;
    let idle: number | undefined;
    const start = () => {
      // The timeout stops constant animations from starving the idle callback.
      idle = w.requestIdleCallback
        ? w.requestIdleCallback(() => setReady(true), { timeout: 1500 })
        : window.setTimeout(() => setReady(true), 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (idle === undefined) return;
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, []);

  if (!ready) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0"
    >
      {images.map((img) => (
        <div key={img.src} className="relative h-px w-px">
          <Image src={img.src} alt="" fill sizes={img.sizes} loading="eager" />
        </div>
      ))}
    </div>
  );
}
