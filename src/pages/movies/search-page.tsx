import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState, type SubmitEvent } from 'react'
import { movies } from '../../data/movies'
import { BookmarkButton } from '../../components/bookmark-button'

export function SearchPage() {
  const { query } = useSearch({ from: '/search' })
  const navigate = useNavigate({ from: '/search' })
  const [searchText, setSearchText] = useState(query ?? '')
  useEffect(() => { setSearchText(query ?? '') }, [query])
  const normalizedQuery = query?.trim().toLowerCase() ?? ''
  const results = normalizedQuery ? movies.filter(movie => movie.title.toLowerCase().includes(normalizedQuery) || movie.originalTitle.toLowerCase().includes(normalizedQuery)) : []
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextQuery = searchText.trim()
    void navigate({ search: nextQuery ? { query: nextQuery } : {} })
  }
  return (
    <main className="mx-auto min-h-[70vh] max-w-[1264px] px-5 py-8 sm:px-8 sm:py-13">
      <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">영화 검색</h1>
      <p className="mt-2 text-sm text-[#999999]">찾고 싶은 영화의 제목을 입력해 보세요.</p>
      <form onSubmit={handleSubmit} role="search" className="mt-8 flex max-w-2xl gap-3">
        <label htmlFor="movie-query" className="sr-only">영화 검색어</label>
        <input id="movie-query" type="search" value={searchText} onChange={event => setSearchText(event.target.value)} placeholder="영화 제목 검색" className="min-w-0 flex-1 rounded-lg border border-[#3c3c3c] bg-[#1c1c1c] px-4 py-3 outline-none focus:border-[#e84459]" />
        <button type="submit" className="shrink-0 rounded-lg bg-[#e84459] px-5 font-semibold hover:bg-[#d1374b]">검색</button>
      </form>
      <div aria-live="polite" className="mt-10">
        {!normalizedQuery ? <p className="rounded-xl border border-[#2c2c2c] py-16 text-center text-[#999999]">검색어를 입력해 주세요.</p> : <>
          <h2 className="text-xl font-bold break-words">‘{query?.trim()}’ 검색 결과 <span className="text-[#e84459]">{results.length}편</span></h2>
          {results.length === 0 ? <p className="mt-6 rounded-xl border border-[#2c2c2c] px-5 py-16 text-center text-[#999999]">검색 결과가 없어요. 다른 검색어를 입력해 보세요.</p> :
            <ul className="mt-6 divide-y divide-[#2c2c2c]">
              {results.map(movie => <li key={movie.id}>
                <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }} className="group flex gap-5 rounded-lg py-6 transition-colors hover:bg-[#1c1c1c] sm:gap-7">
                  <img src={movie.posterPath} alt={`${movie.title} 포스터`} className="aspect-[2/3] w-24 shrink-0 self-start rounded-lg object-cover sm:w-36" />
                  <div className="min-w-0 py-1">
                    <h3 className="text-lg font-bold wrap-anywhere group-hover:text-[#e84459] sm:text-xl">{movie.title}</h3>
                    <p className="mt-1 text-sm wrap-anywhere text-[#999999]">{movie.originalTitle}</p>
                    <p className="mt-3 text-xs leading-6 text-[#bbbbbb] sm:text-sm"><time dateTime={movie.releaseDate.replaceAll('.', '-')}>{movie.releaseDate}</time> · {movie.genres.join(' · ')}</p>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#cccccc]">{movie.overview}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-[#e84459]">상세 보기 →</span>
                  </div>
                </Link>
                <div className="pb-6"><BookmarkButton movieId={movie.id} /></div>
              </li>)}
            </ul>}
        </>}
      </div>
    </main>
  )
}
