"use client";

import { motion } from "motion/react";

/**
 * The split line, drawn from the top once it scrolls into view (0.9s, strong ease-out).
 * Animates `scaleY`, a named transform key, so MotionConfig reducedMotion="user" shows it
 * instantly for people who prefer reduced motion.
 */
export function SplitLine({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`origin-top ${className}`}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
    />
  );
}
