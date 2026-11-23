"use client";

import { useRef, useState } from "react";

/**
 * The 60-second brand intro. Loads only metadata until the visitor presses play (the file is large),
 * then hands over to the native controls. Sound is on: it plays only on a deliberate click.
 */
export function BrandVideo({ src, label, playLabel }: { src: string; label: string; playLabel: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => setStarted(false));
  };

  return (
    <div className="relative bg-black">
      <video
        ref={ref}
        className="block aspect-video w-full"
        src={`${src}#t=0.5`}
        preload="metadata"
        playsInline
        controls={started}
        aria-label={label}
        onPlay={() => setStarted(true)}
      />
      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={playLabel}
          className="group absolute inset-0 flex items-center justify-center bg-navy/30 transition-colors duration-200 hover:bg-navy/10"
        >
          <span className="press flex h-20 w-20 items-center justify-center rounded-full border border-cream/80 bg-navy/60 backdrop-blur-sm transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95 sm:h-24 sm:w-24">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-cream" aria-hidden>
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
