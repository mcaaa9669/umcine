import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

export function Header({ light = false }: { light?: boolean }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (light) {
    return (
      <header className="border-b border-[#e5e7eb] bg-white">
        <nav aria-label="주요 메뉴" className="mx-auto flex min-h-[72px] max-w-[1344px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:min-h-[90px] sm:gap-x-8 sm:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2 text-lg font-extrabold">
            <span className="grid size-8 place-items-center rounded-lg border-2"><img src="/icons/movie-icons/movie.svg" width={23} height={23} alt="" /></span>
            UMCine
          </Link>
          <div className="flex items-center gap-3 text-sm sm:gap-7">
            <Link to="/" activeOptions={{ exact: true }}>영화</Link>
            <Link to="/search">검색</Link>
            <Link to="/my" activeProps={{ className: "font-semibold underline underline-offset-4" }}>내 정보</Link>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/search" aria-label="영화 검색" className="hidden size-10 place-items-center rounded-lg border border-[#e5e7eb] sm:grid">
              <img src="/icons/movie-icons/search.svg" width={18} height={18} alt="" />
            </Link>
            <Link to="/login" className="rounded-lg bg-[#255de0] px-3 py-2.5 text-xs font-semibold text-white sm:px-4 sm:text-sm">로그인</Link>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="border-b border-[#2c2c2c] bg-[#111111]">
      <nav className="mx-auto flex min-h-18 max-w-[1264px] items-center gap-3 px-4 sm:gap-10 sm:px-8" aria-label="주요 메뉴">
        <Link to="/" className="shrink-0 text-xl font-extrabold tracking-wider text-[#e84459] sm:text-2xl" aria-label="UMCINE 영화 목록">UMCINE</Link>
        <div className="flex items-center gap-3 text-sm font-semibold sm:gap-8">
          <Link to="/" activeOptions={{ exact: true }}>
            <span className={cn('block py-6 transition-colors hover:text-white', pathname === '/' ? 'text-[#e84459]' : 'text-[#999999]')}>영화</span>
          </Link>
          <Link to="/search">
            <span className={cn('block py-6 transition-colors hover:text-white', pathname === '/search' ? 'text-[#e84459]' : 'text-[#999999]')}>검색</span>
          </Link>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-3 text-xs font-semibold sm:gap-5 sm:text-sm">
          <Link to="/login" className="text-[#b3b3b3] hover:text-white" activeProps={{ className: "text-[#ff8798]" }}>로그인</Link>
          <Link to="/my" className="text-[#b3b3b3] hover:text-white" activeProps={{ className: "text-[#ff8798]" }}>내 정보</Link>
        </div>
      </nav>
    </header>
  );
}
