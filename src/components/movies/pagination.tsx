interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  return (
    <nav className="pagination" aria-label="영화 목록 페이지">
      <button type="button" aria-label="이전 페이지" disabled={page === 1} onClick={() => onPageChange(page - 1)}><img src="/icons/movie-icons/chevron-left.svg" alt="" /></button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map(number => <button type="button" key={number} aria-label={`${number} 페이지`} aria-current={number === page ? 'page' : undefined} onClick={() => onPageChange(number)}>{number}</button>)}
      <button type="button" aria-label="다음 페이지" disabled={page === pageCount} onClick={() => onPageChange(page + 1)}><img src="/icons/movie-icons/chevron-right.svg" alt="" /></button>
    </nav>
  )
}
