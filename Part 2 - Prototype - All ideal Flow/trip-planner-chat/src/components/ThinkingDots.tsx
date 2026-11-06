"use client";

import { useEffect, useRef } from "react";
import { BELO_PATH } from "./AirbnbLogo";

/**
 * Thinking animation, one 3.2s loop:
 *   stretch → squash → wave → dots gather and morph into the Bélo → repeat.
 * Built on the Web Animations API so each dot gets its own offsets
 * (and so tests can seek it with document.getAnimations()).
 */
const CYCLE = 3200;
const GAP = 14; // px between dot centres

export function ThinkingDots() {
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const logoRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const anims: Animation[] = [];

    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      if (reduce) {
        anims.push(
          dot.animate([{ opacity: 0.35 }, { opacity: 1 }, { opacity: 0.35 }], {
            duration: 1200,
            delay: i * 150,
            iterations: Infinity,
          }),
        );
        return;
      }
      const s = i * 0.025; // stagger
      const toCentre = (1.5 - i) * GAP;
      anims.push(
        dot.animate(
          [
            { offset: 0, transform: "translate(0,0) scale(1,1)", opacity: 1 },
            { offset: 0.1 + s, transform: "translate(0,-2px) scale(0.7,1.7)", opacity: 1 }, // stretch
            { offset: 0.2 + s, transform: "translate(0,3px) scale(1.5,0.55)", opacity: 1 }, // squash
            { offset: 0.3 + s, transform: "translate(0,0) scale(1,1)", opacity: 1 },
            { offset: 0.38 + i * 0.05, transform: "translate(0,-8px) scale(1,1)", opacity: 1 }, // wave
            { offset: 0.46 + i * 0.05, transform: "translate(0,0) scale(1,1)", opacity: 1 },
            { offset: 0.68, transform: "translate(0,0) scale(1,1)", opacity: 1 },
            { offset: 0.78, transform: `translate(${toCentre}px,0) scale(0.4,0.4)`, opacity: 0 }, // gather
            { offset: 0.93, transform: `translate(${toCentre}px,0) scale(0.4,0.4)`, opacity: 0 },
            { offset: 1, transform: "translate(0,0) scale(1,1)", opacity: 1 },
          ],
          { duration: CYCLE, iterations: Infinity, easing: "ease-in-out" },
        ),
      );
    });

    if (logoRef.current && !reduce) {
      anims.push(
        logoRef.current.animate(
          [
            { offset: 0, opacity: 0, transform: "scale(0.4)" },
            { offset: 0.72, opacity: 0, transform: "scale(0.4)" },
            { offset: 0.8, opacity: 1, transform: "scale(1.08)" },
            { offset: 0.84, opacity: 1, transform: "scale(1)" },
            { offset: 0.92, opacity: 1, transform: "scale(1)" },
            { offset: 0.98, opacity: 0, transform: "scale(0.6)" },
            { offset: 1, opacity: 0, transform: "scale(0.4)" },
          ],
          { duration: CYCLE, iterations: Infinity, easing: "ease-out" },
        ),
      );
    }
    return () => anims.forEach((a) => a.cancel());
  }, []);

  return (
    <span
      role="status"
      aria-label="Trip-planner is thinking"
      className="relative inline-flex h-7 w-[64px] items-center justify-center"
      data-testid="thinking"
    >
      <span className="flex items-center gap-[6px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
            className="thinking-dot block size-2 rounded-full bg-rausch"
          />
        ))}
      </span>
      <svg
        ref={logoRef}
        viewBox="0 0 32 32"
        className="thinking-logo pointer-events-none absolute inset-0 m-auto size-7 text-rausch opacity-0"
        aria-hidden
        fill="none"
      >
        <path d={BELO_PATH} stroke="currentColor" strokeWidth={2.8} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </span>
  );
}
