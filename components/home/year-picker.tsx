"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent, WheelEvent } from "react";
import { MAX_YEAR, MIN_YEAR, formatYear, formatYearRange, getYearStep, quantizeYear, type SubEra } from "@/lib/time-periods";

// First pass at the "quick across centuries, precise on a single year" scrub interaction
// from docs/features/home/overview.md — hand-rolled drag + momentum, not a library. See the
// open architecture question in docs/architecture.md if this doesn't feel right and needs
// a proper physics/gesture library instead.
//
// Beyond the "fine" range (see lib/time-periods.ts), the picker steps by 10 years instead of
// 1 — there's less "signal" the farther out you go, so pretending at year-by-year precision
// doesn't make sense. `rawYearRef` tracks a continuous, unquantized value so slow drags in the
// coarse zone still accumulate correctly frame-to-frame; only the emitted/displayed value is
// quantized to the current step.
const PIXELS_PER_YEAR = 6;
const TICK_EVERY_YEARS = 5;
const TICK_SPACING_PX = PIXELS_PER_YEAR * TICK_EVERY_YEARS;
const FLANK_OFFSET_YEARS = 27;
const FRICTION_PER_MS = 0.995;
const MOMENTUM_STOP_VELOCITY = 0.02; // px/ms
const TAP_MOVE_THRESHOLD_PX = 4;

function clampYear(year: number) {
  return Math.min(MAX_YEAR, Math.max(MIN_YEAR, year));
}

export function YearPicker({
  year,
  subEra,
  accentColor,
  onChange,
}: {
  year: number;
  subEra: SubEra;
  accentColor: string;
  onChange: (year: number) => void;
}) {
  const [displayYear, setDisplayYear] = useState(quantizeYear(year));
  const [dragging, setDragging] = useState(false);

  const dragState = useRef({
    pointerId: -1,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0, // px/ms
  });
  const momentumFrame = useRef<number | null>(null);
  const rawYearRef = useRef(year);
  const displayYearRef = useRef(quantizeYear(year));

  useEffect(() => {
    if (!dragging && momentumFrame.current === null) {
      rawYearRef.current = year;
      const quantized = quantizeYear(year);
      displayYearRef.current = quantized;
      setDisplayYear(quantized);
    }
  }, [year, dragging]);

  // `explicitStep`, when given, is the step size the caller used to compute `raw` (e.g. a
  // keyboard or tap nudge). Quantizing against that step — rather than re-deriving it from
  // the landed value — avoids a dead keypress right at a fine/coarse boundary: e.g. at 1650
  // (step 1) pressing left lands on 1649, which is itself in the coarse zone (step 10) and
  // would round back up to 1650 if we quantized against its own zone.
  const commit = useCallback(
    (raw: number, explicitStep?: number) => {
      const clamped = clampYear(raw);
      rawYearRef.current = clamped;
      const step = explicitStep ?? getYearStep(clamped);
      const quantized = Math.round(clamped / step) * step;
      displayYearRef.current = quantized;
      setDisplayYear(quantized);
      onChange(quantized);
    },
    [onChange],
  );

  const stopMomentum = useCallback(() => {
    if (momentumFrame.current !== null) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  }, []);

  const runMomentum = useCallback(() => {
    let lastTime = performance.now();
    const step = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      const state = dragState.current;
      state.velocity *= Math.pow(FRICTION_PER_MS, dt);
      const yearStep = getYearStep(rawYearRef.current);
      const deltaYears = ((-state.velocity * dt) / PIXELS_PER_YEAR) * yearStep;
      const clamped = clampYear(rawYearRef.current + deltaYears);
      commit(clamped);
      if (Math.abs(state.velocity) > MOMENTUM_STOP_VELOCITY && clamped > MIN_YEAR && clamped < MAX_YEAR) {
        momentumFrame.current = requestAnimationFrame(step);
      } else {
        momentumFrame.current = null;
      }
    };
    momentumFrame.current = requestAnimationFrame(step);
  }, [commit]);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    stopMomentum();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignore — some input sources report a pointerId the browser won't let us capture.
    }
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
    setDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = dragState.current;
    if (state.pointerId !== event.pointerId) return;

    const now = performance.now();
    const dt = Math.max(1, now - state.lastTime);
    state.velocity = (event.clientX - state.lastX) / dt;

    const deltaX = event.clientX - state.lastX;
    const yearStep = getYearStep(rawYearRef.current);
    const deltaYears = (-deltaX / PIXELS_PER_YEAR) * yearStep;

    state.lastX = event.clientX;
    state.lastTime = now;

    commit(rawYearRef.current + deltaYears);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const state = dragState.current;
    if (state.pointerId !== event.pointerId) return;
    setDragging(false);
    state.pointerId = -1;

    const totalMove = Math.abs(event.clientX - state.startX);
    if (totalMove < TAP_MOVE_THRESHOLD_PX) {
      const rect = event.currentTarget.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const yearStep = getYearStep(rawYearRef.current);
      commit(rawYearRef.current + (event.clientX < center ? -yearStep : yearStep), yearStep);
      return;
    }

    if (Math.abs(state.velocity) > MOMENTUM_STOP_VELOCITY) {
      runMomentum();
    }
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    stopMomentum();
    const delta = event.deltaX !== 0 ? event.deltaX : event.deltaY;
    const yearStep = getYearStep(rawYearRef.current);
    commit(rawYearRef.current + (delta / PIXELS_PER_YEAR) * yearStep);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Home") {
      stopMomentum();
      commit(MIN_YEAR);
      event.preventDefault();
      return;
    }
    if (event.key === "End") {
      stopMomentum();
      commit(MAX_YEAR);
      event.preventDefault();
      return;
    }
    const yearStep = getYearStep(rawYearRef.current);
    const jumps: Record<string, { delta: number; step?: number }> = {
      ArrowRight: { delta: yearStep, step: yearStep },
      ArrowUp: { delta: yearStep, step: yearStep },
      ArrowLeft: { delta: -yearStep, step: yearStep },
      ArrowDown: { delta: -yearStep, step: yearStep },
      PageUp: { delta: 25 },
      PageDown: { delta: -25 },
    };
    const jump = jumps[event.key];
    if (jump !== undefined) {
      stopMomentum();
      commit(rawYearRef.current + jump.delta, jump.step);
      event.preventDefault();
    }
  }

  useEffect(() => stopMomentum, [stopMomentum]);

  const rounded = displayYear;
  const tickOffset = -((displayYear * PIXELS_PER_YEAR) % TICK_SPACING_PX);
  const centerLabel = formatYear(rounded);

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label="Year"
      aria-valuemin={MIN_YEAR}
      aria-valuemax={MAX_YEAR}
      aria-valuenow={rounded}
      aria-valuetext={formatYear(rounded)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      className={`-mt-8 flex select-none flex-col gap-4 rounded-lg border-b border-white/10 pb-6 pt-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ touchAction: "none" }}
    >
      <div className="relative flex h-20 items-center justify-center text-zinc-500">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, currentColor 0, currentColor 1px, transparent 1px, transparent ${TICK_SPACING_PX}px)`,
            backgroundPositionX: `${tickOffset}px`,
          }}
        />

        <span aria-hidden className="pointer-events-none absolute left-0 font-serif text-2xl text-zinc-600">
          {formatYear(rounded - FLANK_OFFSET_YEARS)}
        </span>
        <span
          aria-hidden
          className={`pointer-events-none relative z-10 whitespace-nowrap px-16 text-center font-serif font-bold tabular-nums text-zinc-50 ${
            centerLabel.length > 5 ? "text-[3.6rem]" : "text-[5.4rem]"
          }`}
          style={{ textShadow: `0 0 28px ${accentColor}` }}
        >
          {centerLabel}
        </span>
        <span aria-hidden className="pointer-events-none absolute right-0 font-serif text-2xl text-zinc-600">
          {formatYear(rounded + FLANK_OFFSET_YEARS)}
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="invisible text-xs tracking-[0.25em] text-zinc-500">SLIDE TO SET THE YEAR</span>
        <span className="text-sm font-medium tracking-wide text-zinc-100">{subEra.name.toUpperCase()}</span>
        <span className="text-xs text-zinc-500">{formatYearRange(subEra)}</span>
      </div>
    </div>
  );
}
