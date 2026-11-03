import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
  notFoundComponent: () => <main className="mx-auto max-w-[1264px] px-5 py-20 sm:px-8"><h1 className="text-2xl font-bold">페이지를 찾을 수 없어요.</h1><a className="mt-6 inline-block text-[#e84459]" href="/">영화 목록으로 돌아가기 →</a></main>,
});
