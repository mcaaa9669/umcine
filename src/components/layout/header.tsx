import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

export function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <header className="border-b border-[#2c2c2c] bg-[#111111]">
      <nav className="mx-auto flex min-h-18 max-w-[1264px] items-center gap-6 px-5 sm:gap-10 sm:px-8" aria-label="주요 메뉴">
        <Link to="/" className="shrink-0 text-xl font-extrabold tracking-wider text-[#e84459] sm:text-2xl" aria-label="UMCINE 영화 목록">UMCINE</Link>
        <div className="flex items-center gap-5 text-sm font-semibold sm:gap-8">
          <Link to="/" activeOptions={{ exact: true }}>
            <span className={cn('block py-6 transition-colors hover:text-white', pathname === '/' ? 'text-[#e84459]' : 'text-[#999999]')}>영화</span>
          </Link>
          <Link to="/search">
            <span className={cn('block py-6 transition-colors hover:text-white', pathname === '/search' ? 'text-[#e84459]' : 'text-[#999999]')}>검색</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
