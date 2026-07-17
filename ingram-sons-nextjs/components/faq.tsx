"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Do you work on all makes and models?",
    a: "Yes — domestic, import, and EV hybrid drivetrains. Our techs carry current certifications across the major manufacturer platforms, not just one brand.",
  },
  {
    q: "Is financing available?",
    a: "Yes. We partner with a third-party financing provider so larger repairs can be split into monthly payments — ask your service advisor when you check in.",
  },
  {
    q: "How long does a diagnostic take?",
    a: "Most diagnostics are complete within 2 hours, and you'll get a written report with photos before we recommend any work.",
  },
  {
    q: "Do I need an appointment?",
    a: "Walk-ins are welcome for oil changes and inspections. For diagnostics or larger repairs, book ahead so we can hold a bay and the right parts.",
  },
  {
    q: "What's covered under your warranty?",
    a: "Every repair is backed by a 12-month / 12,000-mile parts-and-labor warranty, honored nationwide through our NAPA AutoCare network.",
  },
  {
    q: "Do you offer a shuttle while my car is in the shop?",
    a: "Yes, we run a local shuttle within Dallas city limits, and a loaner car is available for multi-day repairs — just ask when you schedule.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white section-py">
      <Container className="max-w-3xl">
        <div className="mb-14">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-ember-700">
            Common Questions
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold uppercase text-navy leading-[0.95]">
            Before you call
          </h2>
        </div>

        <div className="divide-y divide-steel-200 border-t border-b border-steel-200">
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg sm:text-xl font-semibold uppercase tracking-tight text-navy">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      open ? "bg-navy-gradient" : "bg-steel-100"
                    )}
                  >
                    <Plus
                      className={cn("h-4 w-4", open ? "text-white" : "text-navy")}
                      strokeWidth={2.5}
                    />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-14 text-ink-muted leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
