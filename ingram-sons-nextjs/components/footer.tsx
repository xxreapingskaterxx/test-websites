"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Award, BadgeCheck, ArrowUpRight, Phone, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const BADGES = [
  { icon: BadgeCheck, label: "ASE Certified Technicians" },
  { icon: ShieldCheck, label: "BBB Accredited Business" },
  { icon: Award, label: "NAPA AutoCare Center" },
];

const SERVICES = [
  "Oil Changes & Maintenance",
  "Brake Repair",
  "Engine Diagnostics",
  "Alignment & Suspension",
  "Fleet Service",
];

const SOCIALS = ["Facebook", "Instagram", "Google Reviews"];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div
        className="border-b border-white/10 py-8"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 10px)",
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          >
            {BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm font-semibold tracking-wide">
                <Icon className="h-5 w-5 text-ember" strokeWidth={2} />
                {label}
              </div>
            ))}
          </motion.div>
        </Container>
      </div>

      <Container className="py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold uppercase text-white">
            Ingram &amp; Son&apos;s
          </p>
          <p className="font-display text-xs uppercase tracking-[0.35em] text-ember">
            Automotive
          </p>
          <p className="mt-4 text-sm text-white/90 leading-relaxed max-w-xs">
            Family-owned auto repair serving Dallas, TX since 1987.
          </p>
          <a href="tel:+19722258472" className="mt-5 flex items-center gap-2 text-sm font-semibold text-white">
            <Phone className="h-4 w-4 text-ember" strokeWidth={2.5} />
            (972) 225-8472
          </a>
          <div className="mt-2 flex items-center gap-2 text-sm text-white/90">
            <Clock className="h-4 w-4 text-ember" strokeWidth={2.5} />
            Mon&ndash;Fri, 8am&ndash;5pm
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/60 mb-5">
            Services
          </p>
          <ul className="space-y-3">
            {SERVICES.map((s) => (
              <li key={s}>
                <Link href="#services" className="text-sm text-white/90 hover:text-ember transition-colors">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/60 mb-5">
            Location
          </p>
          <a
            href="https://www.google.com/maps/place/6161+Bonnie+View+Rd+Dallas,+TX+75241-5149"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/90 leading-relaxed hover:text-ember transition-colors"
          >
            6161 Bonnie View Rd
            <br />
            Dallas, TX 75241-5149
          </a>
          <p className="mt-3 text-sm text-white/90">Mon&ndash;Fri: 8am&ndash;5pm</p>
          <p className="text-sm text-white/90">Sat&ndash;Sun: Closed</p>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/60 mb-5">
            Connect
          </p>
          <ul className="space-y-3 mb-8">
            {SOCIALS.map((s) => (
              <li key={s}>
                <a href="#" className="inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-ember transition-colors">
                  {s}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </a>
              </li>
            ))}
          </ul>
          <Button href="#pricing" variant="light" className="w-full">
            Schedule Appointment
          </Button>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>&copy; {new Date().getFullYear()} Ingram &amp; Son&apos;s Automotive. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ember transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ember transition-colors">Terms of Service</a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
