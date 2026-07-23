"use client";

import { useState } from "react";
import { SplashScreen } from "./splash-screen";
import { HomeScreen } from "./home/home-screen";
import { TravelTransition } from "./travel-transition";
import { getAccentColorForYear } from "@/lib/time-periods";

type Screen = "splash" | "home" | "travel-transition";

const SPLASH_FADE_MS = 400;

export function AppShell() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [travelYear, setTravelYear] = useState<number | null>(null);
  const [travelDestination, setTravelDestination] = useState("");

  function handleSplashComplete() {
    setScreen("home");
    setSplashFading(true);
    setTimeout(() => setSplashVisible(false), SPLASH_FADE_MS);
  }

  return (
    <div className="relative min-h-dvh bg-black">
      {screen === "home" && (
        <HomeScreen
          onTravel={(year, destination) => {
            setTravelYear(year);
            setTravelDestination(destination);
            setScreen("travel-transition");
          }}
        />
      )}

      {screen === "travel-transition" && travelYear !== null && (
        <TravelTransition
          year={travelYear}
          destination={travelDestination}
          accentColor={getAccentColorForYear(travelYear)}
          onReturn={() => setScreen("home")}
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
