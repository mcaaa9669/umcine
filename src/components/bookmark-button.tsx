import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark,
  );

  return (
    <button
      type="button"
      aria-pressed={isBookmarked}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors",
        isBookmarked
          ? "border-[#e84459] bg-[#e84459] text-white hover:bg-[#d1374b]"
          : "border-white/20 bg-black/60 text-white hover:bg-[#414141]",
      )}
      onClick={() => toggleBookmark(movieId)}
    >
      <img className="size-5 invert" src={`/icons/movie-icons/${isBookmarked ? 'bookmark' : 'bookmark-outline'}.svg`} alt="" />
      {isBookmarked ? "북마크 해제" : "북마크 추가"}
    </button>
  );
}
