import { Link, useParams } from '@tanstack/react-router'
import { movies } from '../../data/movies'

export function MovieDetailPage() {
  const { movieId } = useParams({ from: '/movies/$movieId' })
  const movie = movies.find(item => String(item.id) === movieId)
  if (!movie) return <main className="mx-auto max-w-[1264px] px-5 py-20 sm:px-8"><h1 className="text-2xl font-bold">영화를 찾을 수 없어요.</h1><Link to="/" className="mt-6 inline-block text-[#e84459]">영화 목록으로 돌아가기 →</Link></main>
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#2c2c2c]">
        <img src={movie.backdropPath} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-linear-to-t from-[#111111] via-[#111111]/60 to-[#111111]/20" />
        <div className="relative mx-auto max-w-[1264px] px-5 py-10 sm:px-8 sm:py-14">
          <Link to="/" className="mb-8 inline-flex text-sm text-[#cccccc] hover:text-white">← 영화 목록</Link>
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:gap-10">
            <img src={movie.posterPath} alt={`${movie.title} 포스터`} className="aspect-[2/3] w-44 shrink-0 rounded-xl object-cover shadow-xl sm:w-60" />
            <div className="max-w-2xl pb-2">
              <p className="mb-3 text-sm text-[#cccccc]">{movie.originalTitle}</p>
              <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">{movie.title}</h1>
              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm">
                <dt className="text-[#999999]">개봉일</dt><dd><time dateTime={movie.releaseDate.replaceAll('.', '-')}>{movie.releaseDate}</time></dd>
                <dt className="text-[#999999]">장르</dt><dd>{movie.genres.join(' · ')}</dd>
                <dt className="text-[#999999]">상영 시간</dt><dd>{movie.runtime}</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="overview-heading" className="mx-auto max-w-[1264px] px-5 py-10 sm:px-8 sm:py-14">
        <h2 id="overview-heading" className="text-xl font-bold">줄거리</h2>
        <p className="mt-6 text-xl font-semibold text-[#e84459]">“{movie.tagline}”</p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#cccccc]">{movie.overview}</p>
      </section>
    </main>
  )
}
