"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Secondary motif: scattered process steps (nodes) organising into one flow.
 * Draws once on scroll into view; static under prefers-reduced-motion.
 */
const STARTS: Array<[number, number]> = [
  [28, 46],
  [96, 104],
  [44, 168],
  [120, 214],
  [20, 262],
  [88, 318],
];
const JOIN: [number, number] = [404, 180];
const FLOW_NODES = [470, 530, 590];
const EASE = [0.23, 1, 0.32, 1] as const;

export function ProcessLines({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const draw = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "0px 0px -15% 0px" },
          transition: { duration: 0.9, ease: EASE, delay },
        };
  const appear = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, margin: "0px 0px -15% 0px" },
          transition: { duration: 0.4, ease: EASE, delay },
        };

  return (
    <svg viewBox="0 0 620 360" className={className} role="presentation" aria-hidden fill="none">
      {/* Faint grid suggests the many systems a process crosses. */}
      <g stroke="#F5F3ED" strokeOpacity="0.06">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" x2="620" y1={30 + i * 50} y2={30 + i * 50} />
        ))}
      </g>

      {STARTS.map(([x, y], i) => (
        <motion.path
          key={i}
          d={`M ${x} ${y} C ${x + 150} ${y}, ${JOIN[0] - 150} ${JOIN[1]}, ${JOIN[0]} ${JOIN[1]}`}
          stroke="#FFC629"
          strokeOpacity={0.55}
          strokeWidth={1.25}
          strokeLinecap="round"
          {...draw(i * 0.06)}
        />
      ))}
      <motion.path
        d={`M ${JOIN[0]} ${JOIN[1]} L 606 ${JOIN[1]}`}
        stroke="#FFC629"
        strokeWidth={2.5}
        strokeLinecap="round"
        {...draw(0.7)}
      />

      {STARTS.map(([x, y], i) => (
        <motion.circle key={`n${i}`} cx={x} cy={y} r={4.5} fill="#101E35" stroke="#F5F3ED" strokeOpacity={0.6} {...appear(i * 0.05)} />
      ))}
      <motion.circle cx={JOIN[0]} cy={JOIN[1]} r={6} fill="#FFC629" {...appear(0.75)} />
      {FLOW_NODES.map((x, i) => (
        <motion.circle key={`f${x}`} cx={x} cy={JOIN[1]} r={4.5} fill="#101E35" stroke="#FFC629" strokeWidth={2} {...appear(0.95 + i * 0.08)} />
      ))}
    </svg>
  );
}
