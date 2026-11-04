import { cn } from '../../utils/cn'

interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="영화 목록 페이지">
      <button className="grid size-9 place-items-center rounded-md hover:bg-[#1c1c1c] disabled:opacity-25" type="button" aria-label="이전 페이지" disabled={page === 1} onClick={() => onPageChange(page - 1)}><img className="invert" src="/icons/movie-icons/chevron-left.svg" alt="" /></button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map(number => <button className={cn('grid size-9 place-items-center rounded-md', number === page ? 'bg-[#e84459] font-bold text-white' : 'text-[#dddddd] hover:bg-[#1c1c1c]')} type="button" key={number} aria-label={`${number} 페이지`} aria-current={number === page ? 'page' : undefined} onClick={() => onPageChange(number)}>{number}</button>)}
      <button className="grid size-9 place-items-center rounded-md hover:bg-[#1c1c1c] disabled:opacity-25" type="button" aria-label="다음 페이지" disabled={page === pageCount} onClick={() => onPageChange(page + 1)}><img className="invert" src="/icons/movie-icons/chevron-right.svg" alt="" /></button>
    </nav>
  )
}
