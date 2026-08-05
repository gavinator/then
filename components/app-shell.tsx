"use client";

import { useState } from "react";
import { SplashScreen } from "./splash-screen";
import { HomeScreen } from "./home/home-screen";
import { TravelTransition } from "./travel-transition";
import { ReturningTransition } from "./returning-transition";
import { NewspaperStack } from "./newspaper/newspaper-stack";
import { DEFAULT_YEAR, getAccentColorForYear } from "@/lib/time-periods";
import { defaultTone, type Tone } from "@/lib/tones";
import { getNewspaperFixture } from "@/lib/newspaper-data";
import { CONTINUE_CROSSFADE_MS, RETURN_CROSSFADE_MS } from "@/lib/transition-timing";

type Screen = "splash" | "home" | "newspaper";

const SPLASH_FADE_MS = 400;

export function AppShell() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashFading, setSplashFading] = useState(false);

  // Lifted out of HomeScreen so a round trip to the newspaper and back leaves the picker
  // where the user left it, instead of resetting on remount.
  const [year, setYear] = useState(DEFAULT_YEAR);
  const [destination, setDestination] = useState("");
  const [tone, setTone] = useState<Tone>(defaultTone);

  // The year-picker's 1984→2026 intro tick only plays once, the very first time Home appears
  // (right as the splash cross-fade begins) — not on any later Home mount, e.g. after
  // returning from the newspaper.
  const [yearIntroDone, setYearIntroDone] = useState(false);

  const [travelYear, setTravelYear] = useState<number | null>(null);
  const [travelDestination, setTravelDestination] = useState("");

  // HomeScreen stays mounted underneath the travel-transition overlay (rather than
  // unmounting) so its year/destination/tone selections aren't the only thing preserved —
  // but that means its own local disintegrate-animation state also survives. Bumping this
  // key forces a fresh HomeScreen instance (clean animation state) on an early cancel, the
  // one path that returns to Home without ever switching `screen` away from "home".
  const [homeInstanceKey, setHomeInstanceKey] = useState(0);

  // Both transition overlays follow the same pattern as splash/home above: the screen
  // underneath switches immediately, while the overlay stays mounted and fades its own
  // opacity out, so the transition reads as a cross-fade rather than an instant cut.
  const [travelTransitionVisible, setTravelTransitionVisible] = useState(false);
  const [travelTransitionFading, setTravelTransitionFading] = useState(false);

  const [returningVisible, setReturningVisible] = useState(false);
  const [returningFading, setReturningFading] = useState(false);

  function handleSplashComplete() {
    setScreen("home");
    setSplashFading(true);
    setTimeout(() => setSplashVisible(false), SPLASH_FADE_MS);
  }

  function handleTravel(travelToYear: number, travelToDestination: string) {
    setTravelYear(travelToYear);
    setTravelDestination(travelToDestination);
    setTravelTransitionVisible(true);
    setTravelTransitionFading(false);
  }

  function handleTravelReturn() {
    // Tapped before the signal resolves — cancel back to Home, no crossfade.
    setScreen("home");
    setTravelTransitionVisible(false);
    setTravelTransitionFading(false);
    setHomeInstanceKey((key) => key + 1);
  }

  function handleTravelContinue() {
    if (travelTransitionFading || travelYear === null) return;
    const fixture = getNewspaperFixture(travelDestination, travelYear);
    setScreen(fixture ? "newspaper" : "home");
    setTravelTransitionFading(true);
    setTimeout(() => setTravelTransitionVisible(false), CONTINUE_CROSSFADE_MS);
    if (!fixture) {
      // No fixture for this year/destination — Home was already the current `screen` the
      // whole time (it never actually unmounted for the outbound trip), so its own
      // disintegrate-animation state is still sitting at "faded to black" and needs a fresh
      // instance to reset, same as the early-cancel path in handleTravelReturn.
      setHomeInstanceKey((key) => key + 1);
    }
  }

  function handleBackToHome() {
    setScreen("home");
    setReturningVisible(true);
    setReturningFading(false);
  }

  function handleReturningHoldComplete() {
    setReturningFading(true);
    setTimeout(() => setReturningVisible(false), RETURN_CROSSFADE_MS);
  }

  const newspaperFixture = travelYear !== null ? getNewspaperFixture(travelDestination, travelYear) : null;

  return (
    <div className="relative min-h-dvh bg-black">
      {screen === "home" && (
        <HomeScreen
          key={homeInstanceKey}
          year={year}
          onYearChange={setYear}
          destination={destination}
          onDestinationChange={setDestination}
          tone={tone}
          onToneChange={setTone}
          onTravel={handleTravel}
          animateYearIntro={!yearIntroDone}
          onYearIntroComplete={() => setYearIntroDone(true)}
        />
      )}

      {screen === "newspaper" && newspaperFixture && (
        <NewspaperStack fixture={newspaperFixture} onBackToHome={handleBackToHome} />
      )}

      {travelTransitionVisible && travelYear !== null && (
        <TravelTransition
          year={travelYear}
          destination={travelDestination}
          accentColor={getAccentColorForYear(travelYear)}
          onReturn={handleTravelReturn}
          onContinue={handleTravelContinue}
          fading={travelTransitionFading}
        />
      )}

      {returningVisible && (
        <ReturningTransition
          accentColor={getAccentColorForYear(travelYear ?? year)}
          fading={returningFading}
          onHoldComplete={handleReturningHoldComplete}
        />
      )}

      {splashVisible && (
        <div
          className={`fixed inset-0 z-50 transition-opacity ease-out ${splashFading ? "opacity-0" : "opacity-100"}`}
          style={{ transitionDuration: `${SPLASH_FADE_MS}ms` }}
        >
          <SplashScreen onComplete={handleSplashComplete} />
        </div>
      )}
    </div>
  );
}
