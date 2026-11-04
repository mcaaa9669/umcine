import { useEffect, useState } from 'react'
import { getMovies } from '../../api/movies/get-movies'
import type { TmdbMovieListItem } from '../../api/movies/models'
import { MovieGrid } from '../../components/movies/movie-grid'
import { Pagination } from '../../components/movies/pagination'
import { useBookmarkStore } from '../../stores/bookmark-store'
import type { Movie } from '../../types/movie'

export function MovieListPage() {
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)

  const bookmarkIds = useBookmarkStore(state => state.bookmarkedMovieIds)
  const toggleBookmark = useBookmarkStore(state => state.toggleBookmark)

  useEffect(() => {
    let ignore = false

    async function loadMovies() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const response = await getMovies({ page })

        if (!ignore) {
          setMovies(response.results)
          setPageCount(Math.max(1, Math.min(response.total_pages, 500)))
        }
      } catch {
        if (!ignore) {
          setErrorMessage('영화 목록을 불러오지 못했어요.')
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    void loadMovies()

    return () => {
      ignore = true
    }
  }, [page])

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
      aria-busy={isLoading}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">
          영화 목록
        </h1>
        <p className="mt-2 text-sm text-[#999999]">
          지금 주목해야 할 영화들을 만나보세요.
        </p>
      </div>

      {isLoading ? (
        <p role="status" className="py-20 text-center text-[#999999]">
          영화 목록을 불러오는 중이에요.
        </p>
      ) : errorMessage ? (
        <p role="alert" className="py-20 text-center text-[#e84459]">
          {errorMessage}
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