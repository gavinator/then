"use client";

import Image from "next/image";
import type { NewspaperFixture, Story } from "@/lib/newspaper-data";
import { getNewspaperTheme } from "@/lib/newspaper-theme";

export function NewspaperArticleScreen({
  fixture,
  story,
  onBack,
}: {
  fixture: NewspaperFixture;
  story: Story;
  onBack: () => void;
}) {
  const theme = getNewspaperTheme(fixture.groupId);
  const article = story.article;
  if (!article) return null;

  return (
    <div
      className="h-full w-full overflow-y-auto pb-16"
      style={{ backgroundColor: theme.pageBg, backgroundImage: theme.pageBgImage, color: theme.textPrimary }}
    >
      <div className="mx-auto max-w-md">
        <header className="flex items-center justify-between gap-4 px-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to newspaper"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
            style={{ borderColor: theme.divider, color: theme.textPrimary }}
          >
            ←
          </button>
          <span
            className={`shrink-0 whitespace-nowrap border px-4 py-2 text-xs tracking-[0.2em] ${theme.cornerClass}`}
            style={{ borderColor: theme.accent, color: theme.accent }}
          >
            TEMPORAL ACCURACY: {article.accuracy}%
          </span>
        </header>

        <div className="mt-5 border-t" style={{ borderColor: theme.divider }} />

        <div className="px-6 pt-6">
          <span className="block text-xs tracking-[0.2em]" style={{ color: theme.accent }}>
            {article.kickerCategory} · {article.location}, {article.year}
          </span>

          <h1 className={`mt-3 text-3xl font-bold leading-tight ${theme.headingFont}`}>{story.headline}</h1>

          <p className={`mt-4 italic leading-relaxed ${theme.bodyFont}`} style={{ color: theme.textPrimary, opacity: 0.85 }}>
            {story.blurb}
          </p>

          <span className="mt-4 block text-xs tracking-[0.2em]" style={{ color: theme.textMuted }}>
            {article.subLocation} · {article.year}
          </span>

          {story.imageSrc && story.imageWidth && story.imageHeight ? (
            <div className={`mt-6 overflow-hidden border ${theme.cornerClass}`} style={{ borderColor: theme.imagePlaceholderBorder }}>
              {/* Sized by the image's own intrinsic aspect ratio, not a fixed box height —
                  object-cover would crop the top/bottom off a wide image like this. */}
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
          ) : (
            <div
              className={`mt-6 flex h-48 items-center justify-center border ${theme.cornerClass}`}
              style={{ borderColor: theme.imagePlaceholderBorder, backgroundImage: theme.imagePlaceholderBgImage }}
            >
              <span className="px-4 text-center text-xs tracking-[0.2em]" style={{ color: theme.textMuted }}>
                {story.imageCaption}
              </span>
            </div>
          )}

          <div className="mt-8 flex gap-6">
            <div className={`flex-[6] leading-relaxed ${theme.bodyFont}`}>
              {article.paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-5">
                  {paragraph.text}
                  {paragraph.footnote && (
                    <sup className="ml-0.5" style={{ color: theme.accent }}>
                      {paragraph.footnote}
                    </sup>
                  )}
                </p>
              ))}
            </div>

            <div className="flex-[4] border-l pl-4" style={{ borderColor: theme.divider }}>
              {article.marginNotes.map((note) => (
                <div key={note.symbol} className="mb-5">
                  <span className="block text-xs font-semibold tracking-[0.1em]" style={{ color: theme.accent }}>
                    {note.symbol}
                    {note.label ? ` ${note.label}` : ""}
                  </span>
                  <p
                    className={`mt-1 text-sm leading-snug ${theme.bodyFont} ${theme.bodyItalicMarginNotes ? "italic" : ""}`}
                    style={{ color: theme.textMuted }}
                  >
                    {note.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`mt-8 w-full py-4 text-sm font-semibold tracking-[0.15em] ${theme.cornerClass} ${theme.headingFont}`}
            style={
              theme.shareButtonStyle === "solid"
                ? { backgroundColor: theme.textPrimary, color: theme.pageBg }
                : { border: `1px solid ${theme.accent}`, color: theme.accent, backgroundColor: "transparent" }
            }
          >
            {fixture.shareLabel}
          </button>

          <div className="mt-4 pb-2 text-center text-xs tracking-[0.3em]" style={{ color: theme.textMuted }}>
            {fixture.articleFooter}
          </div>
        </div>
      </div>
    </div>
  );
}
