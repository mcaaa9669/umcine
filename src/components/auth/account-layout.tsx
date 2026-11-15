import type { ReactNode } from "react";

export const accountInput = "min-w-0 w-full rounded-lg border border-[#e1e4e9] bg-white px-3.5 py-3 text-sm text-[#16181d] outline-none placeholder:text-[#737986] focus:border-[#255de0] read-only:bg-[#fafbfc]";
export const accountPrimary = "inline-flex min-h-10 items-center justify-center rounded-lg bg-[#255de0] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1949ba] disabled:opacity-50";

export function AccountLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="grid flex-1 place-items-center px-5 py-12">
      <section aria-labelledby="account-title" className="w-full max-w-[428px]">
        <h1 id="account-title" className="mb-4 text-3xl font-bold">{title}</h1>
        {children}
      </section>
    </main>
  );
}

export function ProfileAvatar({ image }: { image: string | null }) {
  return (
    <span className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-[#e3e6ea]">
      {image
        ? <img className="h-full w-full object-cover" src={image} alt="프로필 이미지" />
        : <img src="/icons/movie-icons/person.svg" width={36} height={36} alt="" />}
    </span>
  );
}
