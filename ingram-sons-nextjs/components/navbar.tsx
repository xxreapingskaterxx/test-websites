"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(1,44,106,0.08)]"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="#top" className="flex flex-col leading-none shrink-0">
          <span
            className={cn(
              "font-display text-2xl font-bold uppercase tracking-tight transition-colors",
              scrolled ? "text-navy" : "text-white"
            )}
          >
            Ingram &amp; Son&apos;s
          </span>
          <span
            className={cn(
              "font-display text-xs uppercase tracking-[0.35em] transition-colors",
              scrolled ? "text-ember-700" : "text-ember"
            )}
          >
            Automotive
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold tracking-wide transition-colors",
                scrolled ? "text-ink hover:text-ember-700" : "text-white hover:text-ember"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+19722258472"
            className={cn(
              "flex items-center gap-2 text-sm font-bold tracking-wide transition-colors",
              scrolled ? "text-ink" : "text-white"
            )}
          >
            <Phone className="h-4 w-4 text-ember" strokeWidth={2.5} />
            (972) 225-8472
          </a>
          <Button href="#pricing" variant={scrolled ? "primary" : "light"} size="sm">
            Schedule Appointment
          </Button>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "lg:hidden p-2 -mr-2 transition-colors",
            scrolled ? "text-navy" : "text-white"
          )}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white shadow-lg"
          >
            <Container className="flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-semibold text-ink border-b border-steel-200 last:border-none"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+19722258472"
                className="flex items-center gap-2 py-4 text-base font-bold text-navy"
              >
                <Phone className="h-4 w-4 text-ember" strokeWidth={2.5} />
                (972) 225-8472
              </a>
              <Button href="#pricing" className="w-full mt-1">
                Schedule Appointment
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
