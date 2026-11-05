import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMovies } from '../../api/movies/get-movies'
import { MovieGrid } from '../../components/movies/movie-grid'
import { Pagination } from '../../components/movies/pagination'
import { useBookmarkStore } from '../../stores/bookmark-store'
import type { Movie } from '../../types/movie'

export function MovieListPage() {
  const [page, setPage] = useState(1)
  const moviesQuery = useQuery({
    queryKey: ['movies', 'list', { page }],
    queryFn: () => getMovies({ page }),
  })
  const movies = moviesQuery.data?.results ?? []
  const pageCount = Math.max(1, Math.min(moviesQuery.data?.total_pages ?? 0, 500))

  const bookmarkIds = useBookmarkStore(state => state.bookmarkedMovieIds)
  const toggleBookmark = useBookmarkStore(state => state.toggleBookmark)

  // API 데이터를 기존 MovieGrid가 사용하는 형태로 변환해요.
  const cardMovies: Movie[] = movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date.replaceAll('-', '.'),
    posterPath: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/icons/movie-icons/movie.svg',
    backdropPath: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : '',
    genres: [],
    runtime: '',
    tagline: '',
    overview: movie.overview,
    isBookmarked: bookmarkIds.includes(movie.id),
  }))

  return (
    <main
      className="mx-auto min-h-[70vh] max-w-[1264px] px-5 py-8 sm:px-8 sm:py-13"
      aria-busy={moviesQuery.isFetching}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">
          영화 목록
        </h1>
        <p className="mt-2 text-sm text-[#999999]">
          지금 주목해야 할 영화들을 만나보세요.
        </p>
      </div>

      {moviesQuery.isPending ? (
        <p role="status" className="py-20 text-center text-[#999999]">
          영화 목록을 불러오는 중이에요.
        </p>
      ) : moviesQuery.isError ? (
        <p role="alert" className="py-20 text-center text-[#e84459]">
          영화 목록을 불러오지 못했어요.
        </p>
      ) : movies.length === 0 ? (
        <p className="py-20 text-center text-[#999999]">
          표시할 영화가 없어요.
        </p>
      ) : (
        <>
          <MovieGrid
            movies={cardMovies}
            onToggleBookmark={toggleBookmark}
          />
          <Pagination
            page={page}
            pageCount={pageCount}
            onPageChange={setPage}
          />
        </>
      )}
    </main>
  )
}
