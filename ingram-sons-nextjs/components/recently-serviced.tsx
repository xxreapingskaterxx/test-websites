"use client";

import { motion, type Variants } from "framer-motion";
import { Car } from "lucide-react";
import { Container } from "@/components/ui/container";

const VEHICLES = [
  {
    vehicle: "2019 Chevrolet Equinox",
    mileage: "146,825 mi",
    date: "Jul 2, 2026",
    service: "Air bypass solenoid replacement & diagnostics",
  },
  {
    vehicle: "2020 Jaguar XE",
    mileage: "44,996 mi",
    date: "Jul 3, 2026",
    service: "Oil and filter change",
  },
  {
    vehicle: "2011 Chrysler 200",
    mileage: "191,000 mi",
    date: "Jul 2, 2026",
    service: "Battery replacement & test",
  },
  {
    vehicle: "2018 Ford Mustang",
    mileage: "74,993 mi",
    date: "Jul 1, 2026",
    service: "Full multi-point check-out",
  },
  {
    vehicle: "2021 Jeep Wrangler",
    mileage: "70,099 mi",
    date: "May 26, 2026",
    service: "Transmission filter replacement & coolant system flush",
  },
  {
    vehicle: "2010 Lexus ES 350",
    mileage: "186,688 mi",
    date: "Apr 24, 2026",
    service: "Door mirror replacement",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function RecentlyServiced() {
  return (
    <section id="serviced-vehicles" className="bg-white section-py">
      <Container>
        <div className="max-w-xl mb-14">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-ember-700">
            Straight From The Shop Floor
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold uppercase text-navy leading-[0.95]">
            Recently serviced vehicles
          </h2>
        </div>

        <div className="rounded-card border-2 border-navy p-8 md:p-10">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {VEHICLES.map((v) => (
              <motion.div key={v.vehicle} variants={item}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-gradient">
                  <Car className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-navy uppercase tracking-tight">
                  {v.vehicle}
                </h3>
                <p className="mt-1 font-mono text-xs text-ember-700">
                  {v.mileage} &middot; Serviced {v.date}
                </p>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {v.service}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
