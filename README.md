
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

현재 영화는 총 10개이며 한 페이지에 10개를 표시하므로 페이지는 1개입니다. 데이터가 추가되면 페이지 수와 이동 버튼이 자동으로 반영됩니다. 화면 너비에 따라 1열, 2열, 3열, 5열로 조정됩니다.

## 디자인 확인 상태

Figma 연결의 파일 접근 권한 오류로 원본 프레임의 수치와 디자인 토큰을 확인하지 못했습니다. 현재 스타일은 임시 구현이며 원본과의 시각적 일치 여부는 검증되지 않았습니다.

## 3주차 폴더 구조

- `src/routes/`: URL과 페이지 연결 (`__root.tsx`, `index.tsx`, `search.tsx`, `movies.$movieId.tsx`)
- `src/pages/movies/`: 영화 목록, 검색, 상세 화면. 검색 결과와 영화별 상세 정보를 표시합니다.
- `src/components/layout/`: 공통 레이아웃 컴포넌트
- `src/components/movies/`: 영화 화면에서 사용하는 컴포넌트
- `src/utils/cn.ts`: clsx로 조건부 클래스를 조합하고 tailwind-merge로 Tailwind 클래스 충돌을 정리합니다.
- `src/main.tsx`: 라우터 생성 및 RouterProvider 연결
- `src/routeTree.gen.ts`: TanStack Router 자동 생성 파일. 직접 수정하지 않습니다.

기존 CSS는 `src/index.css`로 합쳤으며 `App.tsx`와 `App.css`는 제거했습니다. public의 이미지와 아이콘 URL은 그대로 사용합니다.
현재 TanStack Router 패키지는 상위 `C:/umc_study/package.json`에 설치되어 있습니다. umcine 폴더만 별도로 옮기려면 라우터 패키지도 설치해야 합니다.

## 3주차 필수 미션

- `/`: 영화 목록, 북마크, 페이지 이동. 포스터와 제목을 누르면 상세 화면으로 이동합니다.
- `/search?query=스파이더맨`: URL의 query로 로컬 영화 데이터를 검색합니다. 검색 결과 수, 포스터, 제목, 개봉일, 장르와 줄거리를 표시합니다. 검색 전과 결과가 없을 때 각각 안내합니다.
- `/movies/1`: URL의 movieId로 영화 데이터를 찾아 배경, 포스터, 제목, 개봉일, 장르, 상영 시간과 줄거리를 표시합니다. 없는 ID는 ‘영화를 찾을 수 없어요.’로 안내합니다.
- 목록, 검색, 상세, 헤더, 페이지 이동 스타일을 Tailwind로 구성했습니다. 북마크와 현재 페이지의 조건부 스타일은 cn을 사용합니다. 5주차 회원 화면 전용 CSS는 유지합니다.
- Figma는 참고 자료이며 이번 구현은 기존 프로젝트의 색상과 레이아웃을 사용합니다.

### 직접 확인하기

1. 목록의 포스터 또는 제목을 누른 뒤 상세 화면의 영화가 맞는지 확인합니다.
2. 검색 화면에서 ‘스파이더맨’을 검색하면 2편이 표시됩니다. 결과 카드를 누르면 해당 상세 화면으로 이동합니다.
3. 빈 검색어, 공백 검색어, 없는 제목을 입력하여 안내를 확인합니다.
4. `/search?query=스파이더맨`, `/movies/1`을 주소창으로 직접 열고 새로고침합니다.
5. `/movies/9999`는 없는 영화 안내, 없는 경로는 없는 페이지 안내를 표시합니다.
6. 검색어를 바꾼 뒤 뒤로/앞으로 이동하여 주소, 입력값, 결과가 함께 바뀌는지 확인합니다.
7. 모바일 너비에서 검색 카드와 상세 화면이 화면 밖으로 넘치지 않는지 확인합니다.

이번 변경은 TypeScript 검사와 프로덕션 빌드를 통과했습니다. 자동 브라우저 접속 시간 초과로 화면·클릭·새로고침·Console 검사는 미확인입니다. 린트는 기존 TypeScript 7과 typescript-eslint 호환성 문제로 실행되지 않습니다.
