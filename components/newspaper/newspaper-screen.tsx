"use client";

import Image from "next/image";
import type { NewspaperFixture, Story } from "@/lib/newspaper-data";
import { getNewspaperTheme } from "@/lib/newspaper-theme";

export function NewspaperScreen({
  fixture,
  onBack,
  onOpenStory,
}: {
  fixture: NewspaperFixture;
  onBack: () => void;
  onOpenStory: (story: Story) => void;
}) {
  const theme = getNewspaperTheme(fixture.groupId);

  return (
    <div
      className="h-full w-full overflow-y-auto pb-16"
      style={{ backgroundColor: theme.pageBg, backgroundImage: theme.pageBgImage, color: theme.textPrimary }}
    >
      <div className="mx-auto max-w-md">
        <header className="relative px-6 pt-6">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Home"
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border"
            style={{ borderColor: theme.divider, color: theme.textPrimary }}
          >
            ←
          </button>

          <div className="flex flex-col items-center gap-2 pt-1 text-center">
            <span className={`text-xs tracking-[0.3em] ${theme.headingFont}`} style={{ color: theme.textMuted }}>
              {fixture.masthead.eyebrow}
            </span>
            <h1 className={`text-4xl font-bold leading-tight ${theme.headingFont}`}>{fixture.masthead.title}</h1>
            <span className="text-xs tracking-[0.3em]" style={{ color: theme.textMuted }}>
              {fixture.masthead.subtitle}
            </span>
          </div>
        </header>

        <div className="mx-6 mt-5 border-t" style={{ borderColor: theme.divider }} />

        <div className="mt-5 flex gap-3 overflow-x-auto px-6 pb-1 [scrollbar-width:none]">
          {fixture.categories.map((category) => {
            const active = category === fixture.activeCategory;
            const style = active
              ? { backgroundColor: theme.pillActiveStyle.background, borderColor: theme.pillActiveStyle.border, color: theme.pillActiveStyle.color }
              : { borderColor: theme.pillInactiveStyle.border, color: theme.pillInactiveStyle.color };
            return (
              <span
                key={category}
                className={`shrink-0 whitespace-nowrap border px-4 py-2 text-sm tracking-wide ${theme.cornerClass}`}
                style={style}
              >
                {category}
              </span>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-8 px-6">
          {fixture.stories.map((story, index) => (
            <div key={story.id}>
              {index > 0 && <div className="mb-8 border-t" style={{ borderColor: theme.divider }} />}
              <StoryBlock story={story} theme={theme} onOpen={() => onOpenStory(story)} />
            </div>
          ))}
        </div>

        <div className="mt-10 px-6 pb-4 text-center text-xs tracking-[0.3em]" style={{ color: theme.textMuted }}>
          {fixture.footer}
        </div>
      </div>
    </div>
  );
}

function StoryBlock({
  story,
  theme,
  onOpen,
}: {
  story: Story;
  theme: ReturnType<typeof getNewspaperTheme>;
  onOpen: () => void;
}) {
  const clickable = Boolean(story.article);

  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? onOpen : undefined}
      onKeyDown={
        clickable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
      className={clickable ? "cursor-pointer" : undefined}
    >
      {story.isLead ? (
        <span className="mb-3 block text-xs tracking-[0.3em]" style={{ color: theme.textMuted }}>
          {story.kicker}
        </span>
      ) : (
        <span className="mb-2 block text-xs font-semibold tracking-[0.2em]" style={{ color: theme.accent }}>
          {story.kicker}
        </span>
      )}

      {story.isLead && story.imageSrc && story.imageWidth && story.imageHeight && (
        <div className={`mb-4 overflow-hidden border ${theme.cornerClass}`} style={{ borderColor: theme.imagePlaceholderBorder }}>
          {/* Sized by the image's own intrinsic aspect ratio (w-full h-auto), not a fixed
              box height — object-cover would crop the top/bottom off a wide image like this. */}
          <Image
            src={story.imageSrc}
            alt={story.imageCaption ?? story.headline}
            width={story.imageWidth}
            height={story.imageHeight}
            sizes="(min-width: 448px) 448px, 100vw"
            className="h-auto w-full"
            priority
          />
        </div>
      )}

      {story.isLead && !story.imageSrc && (
        <div
          className={`mb-4 flex h-48 items-center justify-center border ${theme.cornerClass}`}
          style={{ borderColor: theme.imagePlaceholderBorder, backgroundImage: theme.imagePlaceholderBgImage }}
        >
          <span className="px-4 text-center text-xs tracking-[0.2em]" style={{ color: theme.textMuted }}>
            {story.imageCaption}
          </span>
        </div>
      )}

      <h2 className={`font-bold leading-snug ${theme.headingFont} ${story.isLead ? "text-3xl" : "text-2xl"}`}>
        {story.headline}
      </h2>
      <p className={`mt-3 italic leading-relaxed ${theme.bodyFont}`} style={{ color: theme.textPrimary, opacity: 0.85 }}>
        {story.blurb}
      </p>
      <span className="mt-3 block text-xs tracking-[0.2em]" style={{ color: theme.textMuted }}>
        {story.byline}
      </span>
    </div>
  );
}
