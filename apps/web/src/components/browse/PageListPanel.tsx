import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { chaptersQueryOptions } from "~/hooks/useChapters";
import type { Chapter } from "@mahfuz/shared/types";

function getChapterForPage(page: number, chapters: Chapter[]): Chapter | undefined {
  return chapters.find((ch) => page >= ch.pages[0] && page <= ch.pages[1]);
}

export function PageListPanel() {
  const { data: chapters } = useSuspenseQuery(chaptersQueryOptions());

  return (
    <>
      <p className="mb-4 text-[13px] text-[var(--theme-text-tertiary)]">
        604 sayfa
      </p>

      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
        {Array.from({ length: 604 }, (_, i) => {
          const page = i + 1;
          const ch = getChapterForPage(page, chapters);
          return (
            <Link
              key={page}
              to="/page/$pageNumber"
              params={{ pageNumber: String(page) }}
              className="flex flex-col items-center rounded-xl bg-[var(--theme-bg-primary)] px-1 py-2.5 transition-all hover:shadow-[var(--shadow-elevated)] active:scale-[0.97]"
            >
              <span className="text-[14px] font-semibold tabular-nums text-[var(--theme-text)]">
                {page}
              </span>
              {ch && (
                <span className="mt-0.5 max-w-full truncate text-[9px] text-[var(--theme-text-quaternary)]">
                  {ch.name_simple}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
