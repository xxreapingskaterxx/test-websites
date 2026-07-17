"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GaugeGraphic } from "@/components/gauge-graphic";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy-gradient pt-20">
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:48px_48px]" />

      <Container className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block font-mono text-xs tracking-[0.3em] uppercase text-ember mb-5">
            Dallas, TX &middot; Family-Owned Since 1987
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] text-white text-balance">
            Honest repairs.
            <br />
            No guesswork.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-white/90 leading-relaxed">
            ASE-certified technicians, transparent diagnostics, and a
            12-month/12,000-mile warranty on every repair. We show you
            what&apos;s wrong before we touch a wrench.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="#pricing" variant="light">
              Schedule Appointment
            </Button>
            <Button href="tel:+19722258472" variant="ghost">
              Call (972) 225-8472
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-ember text-ember" />
              ))}
            </div>
            <p className="font-mono text-sm text-white/60">
              4.9 rating &middot; 357 verified reviews
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <GaugeGraphic />
        </motion.div>
      </Container>

      <div className="h-10 bg-steel diagonal-seam-r translate-y-px" />
    </section>
  );
}
