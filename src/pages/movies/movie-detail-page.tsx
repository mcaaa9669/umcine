import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => String(item.id) === movieId);

  if (!movie) {
    return (
      <main className="mx-auto max-w-[1264px] px-5 py-20 sm:px-8">
        <h1 className="text-2xl font-bold">영화를 찾을 수 없어요.</h1>
        <Link className="mt-6 inline-block text-[#e84459]" to="/">
          영화 목록으로 돌아가기 →
        </Link>
      </main>
    );
  }

  return (
    <main className="relative isolate min-h-[70vh] overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[560px]" aria-hidden="true">
        <img className="h-full w-full object-cover" src={movie.backdropPath} alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/50 via-[#111111]/80 to-[#111111]" />
      </div>
      <div className="mx-auto max-w-[1264px] px-5 py-8 sm:px-8 sm:py-13">
        <Link className="inline-block rounded text-sm hover:text-[#e84459]" to="/">
          ← 영화 목록
        </Link>
        <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row sm:gap-10">
          <img className="aspect-[2/3] w-48 shrink-0 rounded-[10px] object-cover shadow-xl sm:w-64" src={movie.posterPath} alt={`${movie.title} 포스터`} />
          <div className="max-w-2xl sm:pt-4">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl">{movie.title}</h1>
            <p className="mt-3 text-[#bbbbbb]">{movie.originalTitle}</p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#cccccc]">
              <time dateTime={movie.releaseDate.replaceAll('.', '-')}>{movie.releaseDate}</time>
              <p>{movie.genres.join(" · ")}</p>
              <p>{movie.runtime}</p>
            </div>
            <h2 className="mt-8 text-xl font-semibold">{movie.tagline}</h2>
            <p className="mt-4 leading-relaxed text-[#cccccc]">{movie.overview}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
