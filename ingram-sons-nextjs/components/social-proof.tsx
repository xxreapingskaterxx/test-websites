"use client";

import { motion, type Variants } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";

const STATS = [
  { value: "4.9", label: "Average Rating" },
  { value: "357", label: "Verified Reviews" },
  { value: "39", label: "Years in Business" },
  { value: "40+", label: "Makes Serviced" },
];

const TESTIMONIALS = [
  {
    quote:
      "They laid out clear options up front, stayed within my budget, and kept me updated the whole way through — the repair was finished in just a few days.",
    name: "Melba M.",
    detail: "2019 Chevrolet · Jul 2026",
  },
  {
    quote:
      "Excellent customer service from start to finish. I wouldn't take my car anywhere else in Dallas.",
    name: "Bobby B.",
    detail: "2011 Chrysler · Jul 2026",
  },
  {
    quote:
      "Genuinely knowledgeable team, and they explained everything about the repair in plain terms I could actually follow.",
    name: "George Jr D.",
    detail: "2018 Ford · Jul 2026",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function SocialProof() {
  return (
    <section id="reviews" className="bg-white section-py">
      <Container>
        <div className="max-w-xl mb-14">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-ember-700">
            Word on the Street
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold uppercase text-navy leading-[0.95]">
            Dallas drivers do the talking
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 rounded-card bg-steel-50 p-8 md:p-10"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="font-mono text-3xl sm:text-4xl font-medium text-navy">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="rounded-card border border-steel-200 p-8 hover:shadow-card"
            >
              <div className="flex gap-0.5 mb-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-ember text-ember" />
                ))}
              </div>
              <p className="text-ink leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-2">
                <p className="font-semibold text-navy text-sm">{t.name}</p>
                <BadgeCheck className="h-4 w-4 text-ember" strokeWidth={2.5} />
              </div>
              <p className="text-xs text-ink-muted font-mono mt-0.5">{t.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
