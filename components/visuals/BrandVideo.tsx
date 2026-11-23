"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type BrandVideoLabels = {
  label: string;
  play: string;
  pause: string;
  mute: string;
  unmute: string;
  seek: string;
};

/**
 * The 60-second brand intro with minimal custom controls: play/pause, a seek bar and sound on/off.
 *
 * - Loads only metadata until the visitor presses play (the file is large).
 * - Controls show while the pointer is over the video (or keyboard focus is inside it) and fade
 *   out otherwise. On touch, a tap reveals them for a few seconds.
 * - No native controls, so there is no browser download menu; right-click is disabled on the video.
 *   This deters casual saving only: a file served to a browser can always be captured.
 */
export function BrandVideo({ src, labels, stillAt = 0 }: { src: string; labels: BrandVideoLabels; stillAt?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | undefined>(undefined);
  const startedRef = useRef(false);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [touchShown, setTouchShown] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1, for the range input's value / a11y

  // Smooth progress fill: transform on the GPU every frame while playing.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && v.duration && fillRef.current) {
        fillRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  // Metadata can load before hydration attaches onLoadedMetadata: park on the still here too.
  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 1 && !startedRef.current && stillAt > 0) v.currentTime = stillAt;
  }, [stillAt]);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    // The still shows a frame from mid-film; the first play always starts from the beginning.
    if (!startedRef.current) {
      startedRef.current = true;
      v.currentTime = 0;
    }
    setStarted(true);
    v.play().catch(() => {});
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (value: number) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = value * v.duration;
    setProgress(value);
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${value})`;
  };

  const revealForTouch = () => {
    setTouchShown(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setTouchShown(false), 2500);
  };

  const controlsVisible = started && (hovering || focusWithin || touchShown);

  return (
    <div
      className="relative select-none bg-black"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
      onPointerDown={(e) => e.pointerType !== "mouse" && revealForTouch()}
      // Only keyboard focus keeps the controls up; a mouse click must not pin them open.
      onFocus={(e) => setFocusWithin((e.target as HTMLElement).matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusWithin(false);
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <video
        ref={videoRef}
        className="block aspect-video w-full"
        src={src}
        preload="metadata"
        // Before the first play, park on the chosen still frame (no darkening overlay).
        onLoadedMetadata={(e) => {
          if (!startedRef.current && stillAt > 0) e.currentTarget.currentTime = stillAt;
        }}
        playsInline
        aria-label={labels.label}
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        onClick={() => started && toggle()}
        onPlay={(e) => {
          // Playback started some other way (e.g. media keys): still start from the beginning.
          if (!startedRef.current) {
            startedRef.current = true;
            e.currentTarget.currentTime = 0;
          }
          setStarted(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress(v.currentTime / v.duration);
        }}
      />

      {/* Before the first play: one large, calm play button. */}
      {!started && (
        <button
          type="button"
          onClick={play}
          aria-label={labels.play}
          className="group absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-cream/80 bg-navy/60 backdrop-blur-sm transition-transform duration-150 ease-out group-hover:scale-105 group-active:scale-[0.97] sm:h-24 sm:w-24">
            <PlayIcon className="ml-1 h-7 w-7" />
          </span>
        </button>
      )}

      {/* Control bar: play/pause, seek bar, sound. */}
      {started && (
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 via-navy/40 to-transparent px-4 pb-4 pt-12 transition-opacity duration-200 ease-out sm:px-6 sm:pb-5 ${
            controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 text-cream">
            <ControlButton label={playing ? labels.pause : labels.play} onClick={toggle}>
              {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="ml-0.5 h-4 w-4" />}
            </ControlButton>

            <div className="group/seek relative flex h-6 flex-1 items-center">
              <div className="h-[2px] w-full overflow-hidden bg-cream/25 transition-[height] duration-150 group-hover/seek:h-1">
                <div ref={fillRef} className="h-full w-full origin-left bg-yellow" style={{ transform: `scaleX(${progress})` }} />
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.001}
                value={progress}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label={labels.seek}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>

            <ControlButton label={muted ? labels.unmute : labels.mute} onClick={toggleMute}>
              {muted ? <MutedIcon className="h-4 w-4" /> : <SoundIcon className="h-4 w-4" />}
            </ControlButton>
          </div>
        </div>
      )}
    </div>
  );
}

function ControlButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/40 bg-navy/40 backdrop-blur-sm transition-[transform,border-color] duration-150 ease-out hover:border-cream active:scale-[0.97]"
    >
      {children}
    </button>
  );
}

const PlayIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-cream ${className}`} aria-hidden>
    <path d="M7 4.5v15l13-7.5z" />
  </svg>
);

const PauseIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-cream ${className}`} aria-hidden>
    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
  </svg>
);

const SoundIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-none stroke-cream ${className}`} strokeWidth={1.75} aria-hidden>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" className="fill-cream" />
    <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" strokeLinecap="round" />
  </svg>
);

const MutedIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-none stroke-cream ${className}`} strokeWidth={1.75} aria-hidden>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" className="fill-cream" />
    <path d="M16 9.5l5 5M21 9.5l-5 5" strokeLinecap="round" />
  </svg>
);
