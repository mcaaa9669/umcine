export function Footer({ light = false }: { light?: boolean }) {
  return (
    <footer className={light ? "mt-auto border-t border-[#e5e7eb] bg-white" : "mt-auto border-t border-[#2c2c2c]"}>
      <div className={light ? "mx-auto flex max-w-[1344px] flex-wrap items-center justify-end gap-3 px-5 py-5 text-xs text-[#626975] sm:px-8" : "mx-auto flex max-w-[1264px] flex-col gap-4 px-5 py-8 text-xs leading-relaxed text-[#999999] sm:flex-row sm:items-center sm:gap-6 sm:px-8"}>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" aria-label="TMDB 홈페이지">
          <img className={light ? "h-auto w-8" : "h-auto w-28"} src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        </a>
        <div>
          {!light && <p>영화 정보 및 이미지 출처: TMDB</p>}
          <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </div>
      </div>
    </footer>
  )
}
