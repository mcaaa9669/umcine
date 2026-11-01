# UMCine

React + TypeScript + Vite로 구현한 영화 목록 화면입니다.

## 실행

```sh
pnpm install
pnpm dev
```

## 확인 명령

```sh
pnpm build
pnpm lint
```

현재 설치된 TypeScript 7.0.2는 typescript-eslint 8.72.1에서 지원되지 않아 lint 명령이 실행 전에 실패합니다. 프로덕션 빌드와 TypeScript 컴파일은 성공합니다.

## 구성

- `src/components/layout/header.tsx`: 헤더
- `src/components/movies/movie-card.tsx`: 포스터, 영화명, 개봉일, 북마크 버튼
- `src/components/movies/movie-grid.tsx`: 영화 데이터를 목록으로 표시
- `src/components/movies/pagination.tsx`: 데이터 수에 따른 페이지 이동
- `src/data/movies.ts`: 제공된 영화 데이터
- `src/types/movie.ts`: Movie 타입
- `src/pages/movies/movie-list-page.tsx`: 영화 상태 관리 및 컴포넌트 조합

북마크 버튼은 props로 전달된 콜백을 호출하며 MovieListPage의 useState가 해당 id의 영화만 불변 방식으로 변경합니다. 초기 북마크는 제공된 데이터의 오디세이와 토이 스토리 5에 표시됩니다. 새로고침하면 초기 데이터로 돌아갑니다.

현재 영화는 총 10개이며 한 페이지에 10개를 표시하므로 페이지는 1개입니다. 데이터가 추가되면 페이지 수와 이동 버튼이 자동으로 반영됩니다. 작은 화면에서는 3열, 2열, 1열로 조정됩니다.

## 디자인 확인 상태

Figma 연결의 파일 접근 권한 오류로 원본 프레임의 수치와 디자인 토큰을 확인하지 못했습니다. 현재 스타일은 임시 구현이며 원본과의 시각적 일치 여부는 검증되지 않았습니다.

## 3주차 폴더 구조

- `src/routes/`: URL과 페이지 연결 (`__root.tsx`, `index.tsx`, `search.tsx`, `movies.$movieId.tsx`)
- `src/pages/movies/`: 영화 목록, 검색, 상세 화면. 검색과 상세는 이후 학습용 기본 화면입니다.
- `src/components/layout/`: 공통 레이아웃 컴포넌트
- `src/components/movies/`: 영화 화면에서 사용하는 컴포넌트
- `src/utils/cn.ts`: 조건에 따라 클래스 이름을 연결하는 공통 함수. Tailwind 클래스 충돌 처리는 Tailwind 도입 시 확장합니다.
- `src/main.tsx`: 라우터 생성 및 RouterProvider 연결
- `src/routeTree.gen.ts`: TanStack Router 자동 생성 파일. 직접 수정하지 않습니다.

기존 CSS는 `src/index.css`로 합쳤으며 `App.tsx`와 `App.css`는 제거했습니다. public의 이미지와 아이콘 URL은 그대로 사용합니다.
현재 TanStack Router 패키지는 상위 `C:/umc_study/package.json`에 설치되어 있습니다. umcine 폴더만 별도로 옮기려면 라우터 패키지도 설치해야 합니다.
