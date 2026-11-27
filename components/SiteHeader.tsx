"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { LEARN_LINKS, NAV_LINKS } from "@/lib/data";
import { useCart } from "@/components/cart/CartContext";
import BrandLogo from "@/components/ui/BrandLogo";
import AccountButton from "@/components/auth/AccountButton";
import AnnouncementBar from "@/components/AnnouncementBar";
import ShopMegaMenu, { SHOP_MENU_IMAGES } from "@/components/ShopMegaMenu";
import LearnMenu, { LEARN_MENU_IMAGES } from "@/components/LearnMenu";
import MenuImagePreload from "@/components/MenuImagePreload";

const MENU_IMAGES = [...SHOP_MENU_IMAGES, ...LEARN_MENU_IMAGES];
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One header for the whole site.
 *
 * `overlay` sits transparently on top of a full-bleed hero and flips to the
 * cream treatment once the hero scrolls away. `solid` is the cream bar used
 * on every inner page. Both share the same geometry so the wordmark never
 * shifts between routes.
 */
export default function SiteHeader({
  variant = "solid",
}: {
  variant?: "overlay" | "solid";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, ready } = useCart();

  // Hover panels (Shop, Learn): open on hover/focus, close after a short
  // grace period so the pointer can travel from the nav item into the panel.
  const [menu, setMenu] = useState<"shop" | "learn" | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const shopOpen = menu !== null;

  const openMenu = (m: "shop" | "learn") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(m);
  };
  const closeMenu = (delay = 140) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), delay);
  };
  const keepMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => setMenu(null), [pathname]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  // Slide the bar away while scrolling down, bring it back on scroll up.
  // The announcement strip above it stays put.
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > last + 6 && y > 160) setHidden(true);
      else if (y < last - 6 || y <= 160) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (variant !== "overlay") return;
    const onScroll = () => setScrolled(window.scrollY > 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // `inverted` means cream content on a transparent/photographic ground.
  const inverted = variant === "overlay" && !scrolled && !shopOpen;
  const barHidden = hidden && !menu && !open;

  return (
    <>
      <div
        className={cn(
          "z-50 w-full",
          variant === "overlay" ? "fixed inset-x-0 top-0" : "sticky top-0",
        )}
      >
        <AnnouncementBar />

        <header
          onMouseLeave={() => closeMenu()}
          className={cn(
            "relative w-full transition-[transform,background-color,color] duration-500 ease-smooth",
            barHidden && "-translate-y-full",
            inverted
              ? "bg-transparent text-cream"
              : "border-b border-sand/80 bg-cream/95 text-espresso backdrop-blur-xl",
          )}
        >
          <div className="container-x relative flex h-[58px] items-center justify-between gap-4">
            {/* Mobile menu trigger */}
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="-ml-1 grid h-10 w-10 place-items-center lg:hidden"
            >
              <HiBars3 size={24} />
            </button>

            {/* Wordmark — centred on mobile, flush left from lg */}
            <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:left-auto lg:translate-x-0">
              <BrandLogo dark={inverted} />
            </div>

            {/* Centred primary nav */}
            <nav className="hidden flex-1 justify-center lg:flex">
              <ul className="flex items-center gap-10">
                {NAV_LINKS.map((link) => {
                  const panel = link.menu;
                  const active = !!panel && menu === panel;
                  return (
                    <li
                      key={link.label}
                      onMouseEnter={
                        panel ? () => openMenu(panel) : () => closeMenu(0)
                      }
                      onFocus={panel ? () => openMenu(panel) : undefined}
                    >
                      <Link
                        href={link.href}
                        aria-expanded={panel ? active : undefined}
                        aria-haspopup={panel ? "true" : undefined}
                        className={cn(
                          "group relative text-[13px] font-semibold uppercase leading-none tracking-[0.06em] transition-opacity duration-300",
                          inverted ? "text-cream" : "text-espresso",
                        )}
                      >
                        {link.label}
                        <span
                          className={cn(
                            "absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-500 ease-smooth group-hover:w-full",
                            inverted ? "bg-cream" : "bg-espresso",
                            active && "w-full",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Utility icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/products"
                aria-label="Search products"
                className="hidden h-10 w-10 place-items-center transition-opacity hover:opacity-65 sm:grid"
              >
                <FiSearch size={19} />
              </Link>

              <div className="hidden sm:block">
                <AccountButton dark={inverted} />
              </div>

              <Link
                href="/cart"
                aria-label={`Cart${
                  ready && count > 0
                    ? `, ${count} item${count === 1 ? "" : "s"}`
                    : ""
                }`}
                className="relative grid h-10 w-10 place-items-center transition-opacity hover:opacity-65"
              >
                <FiShoppingBag size={19} />
                {ready && count > 0 && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute right-0 top-0 grid h-[17px] min-w-[17px] place-items-center rounded-full px-1 text-[10px] font-semibold leading-none",
                      inverted
                        ? "bg-cream text-espresso"
                        : "bg-espresso text-cream",
                    )}
                  >
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop hover panels (Shop, Learn) */}
          <div
            className="hidden lg:block"
            onMouseEnter={keepMenu}
            onMouseLeave={() => closeMenu()}
          >
            <AnimatePresence mode="wait">
              {menu === "shop" && (
                <ShopMegaMenu key="shop" onNavigate={() => setMenu(null)} />
              )}
              {menu === "learn" && (
                <LearnMenu key="learn" onNavigate={() => setMenu(null)} />
              )}
            </AnimatePresence>
            <MenuImagePreload images={MENU_IMAGES} />
          </div>
        </header>

        {/* Dim the page behind the open menu */}
        <AnimatePresence>
          {shopOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => closeMenu(0)}
              className="fixed inset-0 -z-10 hidden bg-espresso/25 lg:block"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-espresso/45 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.55, ease: EASE }}
              className="fixed inset-y-0 left-0 z-[80] flex w-[min(400px,88vw)] flex-col bg-cream lg:hidden"
            >
              <div className="flex h-[58px] flex-none items-center justify-between border-b border-sand px-6">
                <BrandLogo />
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="-mr-2 grid h-10 w-10 place-items-center text-espresso"
                >
                  <HiXMark size={24} />
                </button>
              </div>

              <nav
                data-lenis-prevent
                className="flex-1 overflow-y-auto overscroll-contain px-6 pt-8"
                style={{
                  paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
                }}
              >
                <ul className="flex flex-col">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.12 + i * 0.05,
                        duration: 0.5,
                        ease: EASE,
                      }}
                      className="border-b border-sand"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-5 font-serif text-[30px] leading-none tracking-display text-espresso"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <p className="mt-8 text-[12px] font-medium uppercase tracking-[0.08em] text-clay">
                  Learn
                </p>
                <ul className="mt-3 flex flex-col gap-3">
                  {/* Track and wholesale already sit below the list */}
                  {LEARN_LINKS.filter(
                    (l) => l.href !== "/track" && l.href !== "/wholesale"
                  ).map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="text-[16px] text-espresso/85"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col gap-3">
                  <Link
                    href="/products"
                    onClick={() => setOpen(false)}
                    className="btn-solid w-full"
                  >
                    Shop all
                  </Link>
                  <Link
                    href="/track"
                    onClick={() => setOpen(false)}
                    className="btn-outline w-full"
                  >
                    Track an order
                  </Link>
                </div>

                <ul className="mt-10 flex flex-col gap-3 text-[14px] text-clay">
                  <li>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link href="/wholesale" onClick={() => setOpen(false)}>
                      Wholesale enquiries
                    </Link>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
