import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="border-b border-[#2c2c2c] bg-[#111111]">
      <div className="mx-auto flex min-h-20 max-w-[1264px] flex-wrap items-center gap-8 px-5 py-4 sm:px-8">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#e84459]">UMCine</Link>
        <nav aria-label="주 메뉴" className="flex gap-6 text-sm font-semibold">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: 'text-[#e84459]' }}>영화</Link>
          <Link to="/search" activeProps={{ className: 'text-[#e84459]' }}>검색</Link>
          <Link to="/members" activeProps={{ className: 'text-[#e84459]' }}>회원 · 평점</Link>
        </nav>
      </div>
    </header>
  );
}
