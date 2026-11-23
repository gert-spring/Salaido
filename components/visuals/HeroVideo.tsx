"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed background loop for the hero (the iris). Muted, inline, decorative.
 * Fades in once it can play, so there is no flash of an empty frame.
 * Under prefers-reduced-motion it does not autoplay and holds the first frame.
 */
export function HeroVideo({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // The video may finish loading before hydration attaches onLoadedData.
    if (v.readyState >= 2) setReady(true);
    if (reduce) {
      v.pause();
      return;
    }
    // Some browsers ignore the autoplay attribute after hydration; nudge it.
    v.play().catch(() => {});
  }, [reduce]);

  return (
    <video
      ref={ref}
      className={`transition-opacity duration-[1200ms] ease-out ${ready ? "opacity-100" : "opacity-0"} ${className}`}
      src={src}
      muted
      loop
      playsInline
      autoPlay={!reduce}
      preload={reduce ? "metadata" : "auto"}
      aria-hidden
      tabIndex={-1}
      disablePictureInPicture
      onLoadedData={() => setReady(true)}
    />
  );
}
