"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent, WheelEvent } from "react";
import { MAX_YEAR, MIN_YEAR, formatYear, formatYearRange, type SubEra } from "@/lib/time-periods";

// First pass at the "quick across centuries, precise on a single year" scrub interaction
// from docs/features/home/overview.md — hand-rolled drag + momentum, not a library. See the
// open architecture question in docs/architecture.md if this doesn't feel right and needs
// a proper physics/gesture library instead.
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
  const [displayYear, setDisplayYear] = useState(year);
  const [dragging, setDragging] = useState(false);

  const dragState = useRef({
    pointerId: -1,
    startX: 0,
    startYear: year,
    lastX: 0,
    lastTime: 0,
    velocity: 0, // px/ms
  });
  const momentumFrame = useRef<number | null>(null);
  const displayYearRef = useRef(year);

  useEffect(() => {
    if (!dragging && momentumFrame.current === null) {
      setDisplayYear(year);
      displayYearRef.current = year;
    }
  }, [year, dragging]);

  const commit = useCallback(
    (raw: number) => {
      const clamped = clampYear(raw);
      displayYearRef.current = clamped;
      setDisplayYear(clamped);
      onChange(Math.round(clamped));
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
      const deltaYears = (-state.velocity * dt) / PIXELS_PER_YEAR;
      const clamped = clampYear(displayYearRef.current + deltaYears);
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
      startYear: displayYearRef.current,
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
    state.lastX = event.clientX;
    state.lastTime = now;

    const deltaYears = -(event.clientX - state.startX) / PIXELS_PER_YEAR;
    commit(state.startYear + deltaYears);
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
      commit(displayYearRef.current + (event.clientX < center ? -1 : 1));
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
    commit(displayYearRef.current + delta / PIXELS_PER_YEAR);
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
    const jumps: Record<string, number> = {
      ArrowRight: 1,
      ArrowUp: 1,
      ArrowLeft: -1,
      ArrowDown: -1,
      PageUp: 25,
      PageDown: -25,
    };
    const jump = jumps[event.key];
    if (jump !== undefined) {
      stopMomentum();
      commit(displayYearRef.current + jump);
      event.preventDefault();
    }
  }

  useEffect(() => stopMomentum, [stopMomentum]);

  const rounded = Math.round(displayYear);
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
          className={`pointer-events-none relative z-10 px-16 text-center font-serif font-bold tabular-nums text-zinc-50 ${
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
