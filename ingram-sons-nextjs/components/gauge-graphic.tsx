"use client";

import { motion } from "framer-motion";

const TICKS = Array.from({ length: 13 }, (_, i) => i);
const LABELS = [0, 20, 40, 60, 80, 100, 120];

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function GaugeGraphic() {
  const cx = 200;
  const cy = 200;
  const startDeg = -120;
  const endDeg = 120;
  const needleDeg = 58;

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Automotive diagnostic gauge illustration">
        <circle cx={cx} cy={cy} r={178} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <circle cx={cx} cy={cy} r={150} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />

        {TICKS.map((i) => {
          const deg = startDeg + (i / (TICKS.length - 1)) * (endDeg - startDeg);
          const outer = polar(cx, cy, 150, deg);
          const inner = polar(cx, cy, i % 3 === 0 ? 128 : 138, deg);
          return (
            <line
              key={i}
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke={i % 3 === 0 ? "#EE6C40" : "rgba(255,255,255,0.35)"}
              strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
              strokeLinecap="round"
            />
          );
        })}

        {LABELS.map((label, i) => {
          const deg = startDeg + (i / (LABELS.length - 1)) * (endDeg - startDeg);
          const pos = polar(cx, cy, 108, deg);
          return (
            <text
              key={label}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white/70 font-mono"
              fontSize={13}
            >
              {label}
            </text>
          );
        })}

        <motion.g
          initial={{ rotate: startDeg }}
          animate={{ rotate: needleDeg }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{ originX: "200px", originY: "200px", transformBox: "view-box" }}
        >
          <line x1={cx} y1={cy} x2={cx} y2={cy - 118} stroke="#EE6C40" strokeWidth={3} strokeLinecap="round" />
          <circle cx={cx} cy={cy} r={10} fill="#EE6C40" />
        </motion.g>
        <circle cx={cx} cy={cy} r={4} fill="#0B1D42" />

        <text x={cx} y={cy + 58} textAnchor="middle" className="fill-white font-mono" fontSize={12} letterSpacing={2}>
          DIAGNOSTIC READY
        </text>
      </svg>
    </div>
  );
}
