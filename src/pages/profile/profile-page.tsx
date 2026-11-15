import { useQueries } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { accountPrimary, ProfileAvatar } from "../../components/auth/account-layout";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { useProfileStore } from "../../stores/profile-store";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function ProfilePage() {
  const { email, nickname, image } = useProfileStore((state) => state.profile);
  const bookmarkedIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
  const favorites = useQueries({
    queries: bookmarkedIds.map((id) => ({
      queryKey: ["movie", id],
      queryFn: () => getMovieDetail(id),
    })),
  });

  return (
    <main className="mx-auto w-full max-w-[1344px] flex-1 px-5 py-7 sm:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">내 정보</h1>
        <Link className={accountPrimary} to="/my/edit">정보 수정</Link>
      </div>
      <section aria-labelledby="profile-details">
        <h2 id="profile-details" className="mb-3 text-base font-semibold">기본 정보</h2>
        <div className="flex items-center gap-5 sm:gap-7">
          <ProfileAvatar image={image} />
          <dl className="grid min-w-0 flex-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div><dt className="mb-1 text-xs text-[#626975]">닉네임</dt><dd className="break-all text-sm font-semibold">{nickname}</dd></div>
            <div><dt className="mb-1 text-xs text-[#626975]">이메일</dt><dd className="break-all text-sm font-semibold">{email}</dd></div>
          </dl>
        </div>
      </section>
      <section className="mt-8" aria-labelledby="profile-favorites">
        <h2 id="profile-favorites" className="mb-3 text-base font-semibold">내 즐겨찾기</h2>
        {bookmarkedIds.length === 0
          ? <p className="text-sm text-[#626975]">즐겨찾기한 영화가 없어요.</p>
          : <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {favorites.map(({ data, isError }, index) => {
                const id = bookmarkedIds[index];
                if (!data) return <li key={id} className="rounded-lg bg-white p-3 text-sm text-[#626975]">{isError ? "영화 정보를 불러오지 못했어요." : "불러오는 중…"}</li>;
                const posterUrl = getTmdbPosterUrl(data.poster_path);
                return (
                  <li key={id} className="min-w-0">
                    <Link to="/movies/$movieId" params={{ movieId: String(id) }}>
                      <div className="mb-2 grid aspect-[8/9] place-items-center overflow-hidden rounded-lg bg-[#e3e6ea]">
                        {posterUrl ? <img className="h-full w-full object-cover" src={posterUrl} alt="" /> : <img src="/icons/movie-icons/movie.svg" width={24} height={24} alt="" />}
                      </div>
                      <span className="block break-words text-sm font-semibold">{data.title}</span>
                      {data.release_date && <time className="text-xs text-[#626975]" dateTime={data.release_date}>{data.release_date}</time>}
                    </Link>
                  </li>
                );
              })}
            </ul>}
      </section>
    </main>
  );
}
