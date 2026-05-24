"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { applyCta, mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-baseline gap-0.5", className)}>
      <span className="font-display text-lg font-semibold tracking-tight text-[#0A0A0A] transition-colors group-hover:text-sv-red sm:text-xl">
        Stream
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-sv-red sm:text-xl">
        Vault
      </span>
    </Link>
  );
}

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "label-mono relative py-1 text-[#0A0A0A]/70 transition-colors hover:text-[#0A0A0A]",
        isActive && "text-sv-red"
      )}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="nav-active"
          className="absolute -bottom-0.5 left-0 h-px w-full bg-sv-red"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (isAdmin) return null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
          scrolled
            ? "border-b border-black/[0.06] bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md"
            : "border-b border-transparent bg-white/0"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {mainNav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={applyCta.href}
              className="inline-flex h-9 items-center justify-center rounded-md bg-sv-red px-4 text-sm font-semibold text-white transition-colors hover:bg-sv-red-hover"
            >
              {applyCta.label}
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-black/[0.08] text-[#0A0A0A] md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <div className="h-[72px]" aria-hidden />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="flex h-full flex-col justify-between px-6 pb-10 pt-28"
              aria-label="Mobile"
            >
              <ul className="flex flex-col gap-6">
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      className="font-display text-4xl font-semibold tracking-tight text-[#0A0A0A]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-4">
                <p className="label-mono text-sv-gray">Join the roster</p>
                <Link
                  href={applyCta.href}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-12 w-full items-center justify-center rounded-md bg-sv-red text-base font-semibold text-white transition-colors hover:bg-sv-red-hover"
                >
                  {applyCta.label}
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
