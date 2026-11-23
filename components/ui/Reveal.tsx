"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fade and lift on scroll into view. Under prefers-reduced-motion, MotionConfig (reducedMotion="user")
 * drops the transform and keeps only the opacity fade.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay }}
    >
      {children}
    </Comp>
  );
}
