"use client";

import { motion, type Variants } from "framer-motion";
import { FileSearch, BadgeCheck, ShieldCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: FileSearch,
    title: "Diagnostics You Can Read",
    body: "A plain-language report with photos lands in your inbox before we touch a wrench. No jargon, no guessing games.",
  },
  {
    icon: BadgeCheck,
    title: "ASE-Certified, Every Bay",
    body: "Every technician on the floor holds a current ASE certification — not just the shop's name on the door.",
  },
  {
    icon: ShieldCheck,
    title: "12mo / 12,000-mi Warranty",
    body: "Parts and labor backed nationwide, so a repair done here holds up wherever the road takes you next.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Features() {
  return (
    <section id="services" className="bg-steel section-py">
      <Container>
        <div className="max-w-xl mb-14">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-ember-700">
            The Ingram &amp; Son&apos;s Standard
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold uppercase text-navy leading-[0.95]">
            Three promises we don&apos;t break
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="rounded-card bg-white p-8 shadow-card hover:shadow-card-hover"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-gradient">
                <Icon className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-navy uppercase tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-ink-muted leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
