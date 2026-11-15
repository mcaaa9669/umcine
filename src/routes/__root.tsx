import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";

function RootLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname.replace(/\/$/, "") });
  const isAccount = pathname === "/login" || pathname === "/my" || pathname === "/my/edit";

  return (
    <div className={`flex min-h-screen flex-col ${isAccount ? "bg-[#f4f6f8] text-[#16181d]" : ""}`}>
      <Header light={isAccount} />
      <Outlet />
      {pathname !== "/login" && pathname !== "/my/edit" && <Footer light={isAccount} />}
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <main className="mx-auto max-w-[1264px] px-5 py-20 sm:px-8"><h1 className="text-2xl font-bold">페이지를 찾을 수 없어요.</h1><a className="mt-6 inline-block text-[#e84459]" href="/">영화 목록으로 돌아가기 →</a></main>,
});
