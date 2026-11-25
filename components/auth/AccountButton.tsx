"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiUser, FiLogOut, FiPackage, FiGrid } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

export default function AccountButton({ dark = false }: { dark?: boolean }) {
  const { user, isAuthenticated, logout } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close the dropdown on outside click.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const btnCls = cn(
    "grid h-10 w-10 place-items-center transition-opacity hover:opacity-65",
    dark ? "text-cream" : "text-espresso"
  );

  if (!isAuthenticated || !user) {
    return (
      <div className="relative" ref={ref}>
        <button
          aria-label="Account menu"
          onClick={() => setOpen((o) => !o)}
          className={btnCls}
        >
          <FiUser size={19} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-[calc(100%+12px)] z-50 w-64 overflow-hidden rounded-xl border border-sand bg-cream p-2 shadow-lift"
            >
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[14px] text-espresso transition-colors hover:bg-beige"
              >
                <FiGrid size={16} /> Sign in for my orders
              </Link>
              <Link
                href="/track"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[14px] text-espresso transition-colors hover:bg-beige"
              >
                <FiPackage size={16} /> Track an order
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const initial = (user.name || user.email || "?").trim().charAt(0).toUpperCase();

  const doLogout = () => {
    logout();
    setOpen(false);
    toast.success("Signed out.");
    router.push("/");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Account menu"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full text-[14px] font-semibold transition-colors",
          dark
            ? "bg-cream text-espresso"
            : "bg-espresso text-cream hover:bg-espresso-soft"
        )}
      >
        {initial}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+12px)] z-50 w-64 overflow-hidden rounded-xl border border-sand bg-cream p-2 shadow-lift"
          >
            <div className="px-3 py-2.5">
              <p className="label-xs text-taupe">Signed in as</p>
              <p className="mt-1.5 truncate text-[15px] font-medium text-espresso">
                {user.name || "Account"}
              </p>
              <p className="truncate text-[13px] font-light text-clay">
                {user.email}
              </p>
            </div>
            <div className="my-1 h-px bg-sand" />
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[14px] text-espresso transition-colors hover:bg-beige"
            >
              <FiGrid size={16} /> My account
            </Link>
            <Link
              href="/track"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[14px] text-espresso transition-colors hover:bg-beige"
            >
              <FiPackage size={16} /> Track an order
            </Link>
            <div className="my-1 h-px bg-sand" />
            <button
              onClick={doLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[14px] text-espresso transition-colors hover:bg-beige"
            >
              <FiLogOut size={16} /> Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
