import { Link } from '@tanstack/react-router'
import type { Movie } from '../../types/movie'
import { cn } from '../../utils/cn'

interface MovieCardProps {
  movie: Movie
  onToggleBookmark: (movieId: number) => void
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[2/3] overflow-hidden rounded-[10px] bg-[#1c1c1c]">
        <Link className="block h-full focus-visible:outline-offset-[-3px]" to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <img className="h-full w-full object-cover transition-transform duration-[180ms] ease-in-out group-hover:scale-[1.025] motion-reduce:transition-none" src={movie.posterPath} alt={`${movie.title} 포스터`} />
        </Link>
        <button type="button" className={cn(
          'absolute top-2 right-2 grid size-9 place-items-center rounded-full border p-0 transition-colors duration-150 motion-reduce:transition-none sm:top-3 sm:right-3',
          movie.isBookmarked
            ? 'border-[#e84459] bg-[#e84459] hover:bg-[#d1374b]'
            : 'border-white/20 bg-black/70 hover:bg-[#414141]',
        )} aria-label={`${movie.title} 북마크`} aria-pressed={movie.isBookmarked} title={movie.isBookmarked ? '북마크 해제' : '북마크 추가'} onClick={() => onToggleBookmark(movie.id)}>
          <img className="size-5 invert" src={`/icons/movie-icons/${movie.isBookmarked ? 'bookmark' : 'bookmark-outline'}.svg`} alt="" />
        </button>
      </div>
      <div className="pt-4"><h2 className="text-sm leading-normal font-semibold wrap-anywhere sm:text-base"><Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>{movie.title}</Link></h2><time className="mt-[7px] block text-[13px] text-[#999999]" dateTime={movie.releaseDate.replaceAll('.', '-')}>{movie.releaseDate}</time></div>
    </article>
  )
}
