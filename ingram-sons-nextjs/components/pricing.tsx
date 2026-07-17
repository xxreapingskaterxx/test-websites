"use client";

import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    name: "Oil Change",
    price: "$59",
    cadence: "per visit",
    description: "The maintenance basics, done right, on a schedule you can trust.",
    features: [
      "Full synthetic oil & filter change",
      "27-point multi-inspection",
      "Fluid top-off (5 fluids)",
      "Tire rotation & pressure check",
    ],
    cta: "Book Oil Change",
    badge: "Most Booked",
  },
  {
    name: "Brake Service",
    price: "$189",
    cadence: "starting price",
    description: "Pads, rotors, and fluid checked and replaced by the axle.",
    features: [
      "Pad & rotor inspection",
      "OEM-grade or ceramic pad options",
      "Brake fluid flush available",
      "Free brake inspection with any visit",
    ],
    cta: "Book Brake Service",
    badge: null,
  },
  {
    name: "Transmission Service",
    price: "$149",
    cadence: "starting price",
    description: "Fluid and filter service to keep shifts smooth and catch trouble early.",
    features: [
      "Fluid & filter replacement",
      "Full system flush available",
      "Free transmission diagnostic scan",
      "Written estimate before any rebuild work",
    ],
    cta: "Book Transmission Service",
    badge: null,
  },
  {
    name: "Coolant Flush",
    price: "$99",
    cadence: "starting price",
    description: "A full system flush to protect against overheating and corrosion.",
    features: [
      "Full system flush & refill",
      "Pressure test for leaks",
      "Thermostat inspection",
      "OEM-spec coolant",
    ],
    cta: "Book Coolant Flush",
    badge: null,
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

export function Pricing() {
  return (
    <section id="pricing" className="bg-steel section-py">
      <Container>
        <div className="max-w-xl mb-14">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-ember-700">
            Pricing
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold uppercase text-navy leading-[0.95]">
            Straightforward pricing, no upsell script
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.name}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex flex-col rounded-card bg-white p-8 text-ink shadow-card hover:shadow-card-hover"
            >
              {service.badge && (
                <span className="self-start rounded-full bg-ember px-3 py-1 text-xs font-bold uppercase tracking-wide text-white mb-4">
                  {service.badge}
                </span>
              )}
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-navy">
                {service.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-mono text-3xl sm:text-4xl font-medium">
                  {service.price}
                </span>
                <span className="text-sm text-ink-muted">{service.cadence}</span>
              </div>
              <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                {service.description}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className="h-4 w-4 mt-0.5 shrink-0 text-ember"
                      strokeWidth={2.5}
                    />
                    <span className="text-ink">{f}</span>
                  </li>
                ))}
              </ul>

              <Button href="tel:+19722258472" variant="primary" className="mt-8 w-full">
                {service.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-sm text-ink-muted max-w-2xl">
          Starting prices reflect typical parts and labor — final cost depends on your
          vehicle&apos;s make, model, and what we find. We&apos;ll always confirm the
          exact price in writing before we start any work.
        </p>
      </Container>
    </section>
  );
}
