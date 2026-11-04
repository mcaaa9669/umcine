import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { getTmdbPosterUrl, getTmdbBackdropUrl } from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;
  // ID별로 컴포넌트를 새로 만들어 이전 영화가 잠깐 보이지 않게 해요.
  return <MovieDetailContent key={movieId} movieId={parsedMovieId} isValidMovieId={isValidMovieId} />;
}

function MovieDetailContent({ movieId, isValidMovieId }: { movieId: number; isValidMovieId: boolean }) {
  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(isValidMovieId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setMovie(null);
    setErrorMessage(null);
    if (!isValidMovieId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    async function loadMovie() {
      try {
        const response = await getMovieDetail(movieId);
        if (!ignore) setMovie(response);
      } catch (error) {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    void loadMovie();
    return () => { ignore = true; };
  }, [movieId, isValidMovieId]);

  if (!isValidMovieId || isLoading || errorMessage || !movie) {
    return (
      <main className="mx-auto max-w-[1264px] px-5 py-20 sm:px-8">
        <h1 role={isLoading ? 'status' : 'alert'} className="text-2xl font-bold">
          {!isValidMovieId ? '올바르지 않은 영화 번호예요.' : isLoading ? '영화 정보를 불러오는 중이에요.' : errorMessage ?? '영화를 찾을 수 없어요.'}
        </h1>
        <Link className="mt-6 inline-block text-[#e84459]" to="/">
          영화 목록으로 돌아가기 →
        </Link>
      </main>
    );
  }

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const runtime = typeof movie.runtime === 'number'
    ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
    : '상영 시간 정보가 없어요.';

  return (
    <main className="relative isolate min-h-[70vh] overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[560px]" aria-hidden="true">
        {backdropUrl && <img className="h-full w-full object-cover" src={backdropUrl} alt="" />}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/50 via-[#111111]/80 to-[#111111]" />
      </div>
      <div className="mx-auto max-w-[1264px] px-5 py-8 sm:px-8 sm:py-13">
        <Link className="inline-block rounded text-sm hover:text-[#e84459]" to="/">
          ← 영화 목록
        </Link>
        <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row sm:gap-10">
          {posterUrl ? <img className="aspect-[2/3] w-48 shrink-0 rounded-[10px] object-cover shadow-xl sm:w-64" src={posterUrl} alt={`${movie.title} 포스터`} /> : <div className="grid aspect-[2/3] w-48 shrink-0 place-items-center rounded-[10px] bg-[#1c1c1c] text-[#999999] sm:w-64">포스터가 없어요.</div>}
          <div className="max-w-2xl sm:pt-4">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl">{movie.title}</h1>
            <p className="mt-3 text-[#bbbbbb]">{movie.original_title}</p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#cccccc]">
              {movie.release_date ? <time dateTime={movie.release_date}>{movie.release_date.replaceAll('-', '.')}</time> : <p>개봉일 정보가 없어요.</p>}
              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
              <p>{runtime}</p>
            </div>
            <h2 className="mt-8 text-xl font-semibold">{movie.tagline}</h2>
            <p className="mt-4 leading-relaxed text-[#cccccc]">{movie.overview}</p>
            <div className="mt-6"><BookmarkButton movieId={movie.id} /></div>
          </div>
        </div>
      </div>
    </main>
  );
}
