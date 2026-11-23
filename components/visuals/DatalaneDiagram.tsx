"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { en } from "@/content/en";
import { Logo } from "@/components/ui/Logo";
import { Rich, plain } from "@/components/ui/Rich";
import { Pill } from "@/components/ui/Pill";

/**
 * DatalaneDiagram (BUILD_PLAN section 5).
 * Salaido at the top, one cyan line that runs down and branches: first to Datalane (solid card),
 * then to outline "Next company" cards. Lines are measured from the real card positions, so the
 * same component draws a tree on desktop and a stacked spine on mobile.
 *
 * Sequence on scroll into view: line draws (900 ms, ease-out), Datalane card fades and lifts in as
 * the line reaches it, outline branches and cards appear last at lower opacity.
 * Under prefers-reduced-motion everything renders in its final state.
 */

const EASE = [0.23, 1, 0.32, 1] as const;
const DRAW_MS = 0.9;

type Branch = { d: string; end: [number, number] };
type Geometry = { width: number; height: number; start: [number, number]; branches: Branch[] };

function layoutBox(el: HTMLElement, root: HTMLElement) {
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  return { left, top, width, height, right: left + width, bottom: top + height };
}

const useIsoLayoutEffect =typeof window === "undefined" ? useEffect : useLayoutEffect;

export function DatalaneDiagram() {
  const t = en.datalane.diagram;
  const showNext = t.showNextCompanies;
  const reduce = useReducedMotion();

  const frameRef = useRef<HTMLDivElement>(null);
  const salaidoRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const inView = useInView(frameRef, { once: true, margin: "0px 0px -30% 0px" });
  const [geo, setGeo] = useState<Geometry | null>(null);

  const measure = useCallback(() => {
    const frame = frameRef.current;
    const top = salaidoRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!frame || !top || cards.length === 0) return;

    // Layout boxes (offset based) ignore the entrance transforms, so lines land on final positions.
    const f = { left: 0, top: 0, width: frame.offsetWidth, height: frame.offsetHeight };
    const s = layoutBox(top, frame);
    const rects = cards.map((c) => layoutBox(c, frame));
    // Row layout when the cards sit side by side; stacked spine otherwise.
    const row = rects.length > 1 ? Math.abs(rects[0].top - rects[1].top) < 4 : f.width >= 768;
    const r = 0; // Salaido is angular: right-angle turns, no rounding.

    let start: [number, number];
    let branches: Branch[];

    if (row) {
      const sx = s.left + s.width / 2 - f.left;
      const sy = s.bottom - f.top;
      start = [sx, sy];
      branches = rects.map((c) => {
        const cx = c.left + c.width / 2 - f.left;
        const cy = c.top - f.top;
        const bus = sy + (cy - sy) / 2;
        const dx = cx - sx;
        if (Math.abs(dx) < 1) return { d: `M ${sx} ${sy} V ${cy}`, end: [cx, cy] };
        const dir = Math.sign(dx);
        const rr = Math.min(r, Math.abs(dx) / 2, (cy - sy) / 2);
        return {
          d: `M ${sx} ${sy} V ${bus - rr} Q ${sx} ${bus} ${sx + dir * rr} ${bus} H ${cx - dir * rr} Q ${cx} ${bus} ${cx} ${bus + rr} V ${cy}`,
          end: [cx, cy],
        };
      });
    } else {
      const sx = s.left + 28 - f.left;
      const sy = s.bottom - f.top;
      start = [sx, sy];
      branches = rects.map((c) => {
        const tx = c.left - f.left;
        const ty = c.top + 34 - f.top;
        return {
          d: `M ${sx} ${sy} V ${ty - r} Q ${sx} ${ty} ${sx + r} ${ty} H ${tx}`,
          end: [tx, ty],
        };
      });
    }

    setGeo({ width: f.width, height: f.height, start, branches });
  }, []);

  useIsoLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (frameRef.current) ro.observe(frameRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const play = inView || !!reduce;
  const anim = (to: Record<string, number>, from: Record<string, number>, delay: number, duration = 0.5) =>
    reduce
      ? { initial: false as const, animate: to }
      : {
          initial: from,
          animate: play ? to : from,
          transition: { duration, ease: EASE, delay },
        };

  const nextCards = showNext ? [0, 1] : [];

  return (
    <figure aria-label={plain(t.label)} className="relative">
      <div
        ref={frameRef}
        className="relative overflow-hidden bg-navy px-5 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16"
      >
        {/* Subtle grid: the systems a process runs across. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#F5F3ED_1px,transparent_1px),linear-gradient(to_bottom,#F5F3ED_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        />

        {geo && (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${geo.width} ${geo.height}`}
            fill="none"
          >
            {geo.branches.slice(1).map((b, i) => (
              <motion.path
                key={`next-${i}`}
                d={b.d}
                stroke="#FFC629"
                strokeWidth={1.25}
                strokeDasharray="4 6"
                strokeLinecap="round"
                {...anim({ opacity: 0.45 }, { opacity: 0 }, DRAW_MS + 0.35 + i * 0.12, 0.6)}
              />
            ))}
            {geo.branches[0] && (
              <motion.path
                d={geo.branches[0].d}
                stroke="#FFC629"
                strokeWidth={2.25}
                strokeLinecap="round"
                strokeLinejoin="miter"
                {...anim({ pathLength: 1, opacity: 1 }, { pathLength: 0, opacity: 0 }, 0.1, DRAW_MS)}
              />
            )}
            <circle cx={geo.start[0]} cy={geo.start[1]} r={4} fill="#FFC629" />
            {geo.branches[0] && (
              <motion.circle
                cx={geo.branches[0].end[0]}
                cy={geo.branches[0].end[1]}
                r={4}
                fill="#FFC629"
                {...anim({ opacity: 1 }, { opacity: 0 }, DRAW_MS, 0.2)}
              />
            )}
          </svg>
        )}

        {/* Salaido: the navy block at the top. */}
        <div className="relative flex md:justify-center">
          <div
            ref={salaidoRef}
            className="flex flex-col items-start gap-3 border border-cream/12 bg-navy-2 px-6 py-5 md:items-center md:px-8 md:text-center"
          >
            <Logo brand="salaido" on="dark" />
            <p className="max-w-[16rem] text-sm leading-snug text-mist">
              <Rich text={t.salaidoLabel} />
            </p>
          </div>
        </div>

        <div
          className={`relative mt-14 grid gap-4 pl-12 sm:mt-16 md:mt-20 md:gap-5 md:pl-0 ${
            showNext ? "md:grid-cols-[1.4fr_1fr_1fr]" : "md:mx-auto md:max-w-md md:grid-cols-1"
          }`}
        >
          {/* Datalane: the first, solid branch. */}
          <motion.div
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
            className="border-t-4 border-yellow bg-white p-6 text-navy sm:p-7"
            {...anim({ opacity: 1, y: 0 }, { opacity: 0, y: 14 }, DRAW_MS * 0.85, 0.55)}
          >
            <h3 className="sr-only">Datalane</h3>
            <Logo brand="datalane" on="light" />
            <p className="mt-3 text-sm text-graphite">
              <Rich text={t.datalaneLocation} />
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {t.badges.map((b) => (
                <li key={b}>
                  <Pill variant="outline">
                    <Rich text={b} />
                  </Pill>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Outline cards: room for more companies, without naming any. */}
          {nextCards.map((i) => (
            <motion.div
              key={i}
              ref={(el) => {
                cardRefs.current[i + 1] = el;
              }}
              className="flex min-h-[7.5rem] items-center justify-center border border-dashed border-cream/25 p-6 text-sm text-slate md:min-h-0"
              {...anim({ opacity: 0.75 }, { opacity: 0 }, DRAW_MS + 0.45 + i * 0.12, 0.6)}
            >
              <Rich text={t.nextCompany} />
            </motion.div>
          ))}
        </div>
      </div>
    </figure>
  );
}
