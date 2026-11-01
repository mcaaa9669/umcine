import { useState } from 'react'
import { movies as initialMovies } from '../../data/movies'
import { MovieGrid } from '../../components/movies/movie-grid'
import { Pagination } from '../../components/movies/pagination'

export function MovieListPage() {
  const [movies, setMovies] = useState(initialMovies)
  const [page, setPage] = useState(1)
  const pageSize = 10
  const pageCount = Math.max(1, Math.ceil(movies.length / pageSize))

  function toggleBookmark(movieId: number) {
    setMovies(previous => previous.map(movie =>
      movie.id === movieId ? { ...movie, isBookmarked: !movie.isBookmarked } : movie,
    ))
  }

  return (
    <>
      <main className="movie-page">
        <div className="page-heading"><h1>영화 목록</h1><p>지금 주목해야 할 영화들을 만나보세요.</p></div>
        <MovieGrid movies={movies.slice((page - 1) * pageSize, page * pageSize)} onToggleBookmark={toggleBookmark} />
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </main>
    </>
  )
}

