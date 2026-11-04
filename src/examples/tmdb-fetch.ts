import { getMoviesWithFetch } from '../api/movies/get-movies-with-fetch'

// 개발 모드에서 순수 fetch의 요청과 응답을 Network 패널로 비교해요.
void getMoviesWithFetch(1)
  .then(response => {
    console.info('[TMDB fetch 실습]', {
      page: response.page,
      movieCount: response.results.length,
    })
  })
  .catch(() => {
    console.warn('[TMDB fetch 실습] 요청에 실패했어요. Network 패널을 확인해 주세요.')
  })
