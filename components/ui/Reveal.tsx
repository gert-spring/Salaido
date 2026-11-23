"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fade and lift on scroll into view. Uses a full transform string (not the `y` shorthand) so the
 * motion stays on the compositor while the page is busy decoding video.
 * Under prefers-reduced-motion, MotionConfig (reducedMotion="user") drops the transform and keeps
 * only the opacity fade.
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
      initial={{ opacity: 0, transform: "translateY(14px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay }}
    >
      {children}
    </Comp>
  );
}
