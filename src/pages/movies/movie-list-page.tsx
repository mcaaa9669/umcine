import { useState } from 'react'
import { movies as initialMovies } from '../../data/movies'
import { MovieGrid } from '../../components/movies/movie-grid'
import { Pagination } from '../../components/movies/pagination'
import { useBookmarkStore } from '../../stores/bookmark-store'

export function MovieListPage() {
  const bookmarkIds = useBookmarkStore(state => state.bookmarkedMovieIds)
  const toggleBookmark = useBookmarkStore(state => state.toggleBookmark)
  const movies = initialMovies.map(movie => ({
    ...movie,
    isBookmarked: bookmarkIds.includes(movie.id),
  }))
  const [page, setPage] = useState(1)
  const pageSize = 10
  const pageCount = Math.max(1, Math.ceil(movies.length / pageSize))

  return (
    <>
      <main className="mx-auto min-h-[70vh] max-w-[1264px] px-5 py-8 sm:px-8 sm:py-13">
        <div className="mb-8"><h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">영화 목록</h1><p className="mt-2 text-sm text-[#999999]">지금 주목해야 할 영화들을 만나보세요.</p></div>
        <MovieGrid movies={movies.slice((page - 1) * pageSize, page * pageSize)} onToggleBookmark={toggleBookmark} />
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </main>
    </>
  )
}

