"use client";

import { useState } from "react";
import type { NewspaperFixture, Story } from "@/lib/newspaper-data";
import { NewspaperScreen } from "./newspaper-screen";
import { NewspaperArticleScreen } from "./newspaper-article-screen";

const SLIDE_MS = 320;

export function NewspaperStack({ fixture, onBackToHome }: { fixture: NewspaperFixture; onBackToHome: () => void }) {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [renderedStory, setRenderedStory] = useState<Story | null>(null);

  const articleOpen = activeStory !== null;

  function openStory(story: Story) {
    setRenderedStory(story);
    // Mount off-screen first, then transition in on the next frame.
    requestAnimationFrame(() => setActiveStory(story));
  }

  function closeStory() {
    setActiveStory(null);
    setTimeout(() => setRenderedStory(null), SLIDE_MS);
  }

  return (
    <div className="fixed inset-0 h-dvh w-full overflow-hidden">
      <div
        className="absolute inset-0 h-full w-full ease-out"
        style={{
          transform: articleOpen ? "translateX(-100%)" : "translateX(0)",
          transitionProperty: "transform",
          transitionDuration: `${SLIDE_MS}ms`,
        }}
      >
        <NewspaperScreen fixture={fixture} onBack={onBackToHome} onOpenStory={openStory} />
      </div>

      {renderedStory && (
        <div
          className="absolute inset-0 h-full w-full ease-out"
          style={{
            transform: articleOpen ? "translateX(0)" : "translateX(100%)",
            transitionProperty: "transform",
            transitionDuration: `${SLIDE_MS}ms`,
          }}
        >
          <NewspaperArticleScreen fixture={fixture} story={renderedStory} onBack={closeStory} />
        </div>
      )}
    </div>
  );
}
