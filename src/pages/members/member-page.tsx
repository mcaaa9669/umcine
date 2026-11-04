import { useState, type SubmitEvent } from 'react'

interface Rating { ratingId: number; movieId: number; score: number; comment: string | null; createdAt: string; updatedAt: string }
const apiBase = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, { signal: AbortSignal.timeout(10000) })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message ?? `요청 실패 (${response.status})`)
  return data as T
}

function AvailabilityForm({ kind, label, initial }: { kind: 'nickname' | 'email'; label: string; initial: string }) {
  const [value, setValue] = useState(initial)
  const [result, setResult] = useState<{ available: boolean } | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [requested, setRequested] = useState('')
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const path = `/members/${kind}/${encodeURIComponent(value.trim())}`
    setLoading(true); setError(''); setResult(null); setRequested(path)
    try { setResult(await get<{ available: boolean }>(path)) }
    catch (error) { setError(error instanceof Error ? error.message : '서버에 연결할 수 없어요.') }
    finally { setLoading(false) }
  }
  return <section className="member-panel">
    <h2>{label} 중복 확인</h2>
    <form onSubmit={submit}><label>{label}<input type={kind === 'email' ? 'email' : 'text'} required maxLength={kind === 'email' ? 254 : 50} value={value} onChange={event => { setValue(event.target.value); setResult(null); setError('') }} disabled={loading} /></label><button disabled={loading || !value.trim()}>{loading ? '확인 중…' : `${label} 확인`}</button></form>
    <div aria-live="polite">{error && <p role="alert">{error}</p>}{result && <><p>{result.available ? '사용할 수 있어요.' : '이미 사용 중이에요.'}</p><small>GET {apiBase}{requested} · 200</small><pre>{JSON.stringify(result, null, 2)}</pre></>}</div>
  </section>
}

export function MemberPage() {
  const [memberId, setMemberId] = useState('1')
  const [ratings, setRatings] = useState<Rating[] | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [requestedId, setRequestedId] = useState('')
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError(''); setRatings(null); setRequestedId(memberId)
    try { setRatings(await get<Rating[]>(`/members/${encodeURIComponent(memberId)}/ratings`)) }
    catch (error) { setError(error instanceof Error ? error.message : '서버에 연결할 수 없어요.') }
    finally { setLoading(false) }
  }
  return <main className="member-page mx-auto min-h-[70vh] px-5 py-8 sm:px-8 sm:py-13">
    <div className="mb-8 [&_h1]:text-2xl [&_h1]:font-bold [&_p]:mt-2 [&_p]:text-sm [&_p]:text-[#999999]"><h1>회원 · 평점</h1><p>닉네임과 이메일을 확인하고 회원이 남긴 평점을 조회해 보세요.</p></div>
    <div className="member-checks"><AvailabilityForm kind="nickname" label="닉네임" initial="수현" /><AvailabilityForm kind="email" label="이메일" initial="noco@umc.com" /></div>
    <section className="member-panel"><h2>회원별 평점</h2><form onSubmit={submit}><label>회원 ID<input type="number" min="1" step="1" required value={memberId} disabled={loading} onChange={event => { setMemberId(event.target.value); setRatings(null); setError('') }} /></label><button disabled={loading}>{loading ? '불러오는 중…' : '평점 조회'}</button></form>
      <div aria-live="polite">{error && <p role="alert">{error}</p>}{ratings && <><p>{ratings.length ? `평점 ${ratings.length}개 · 최신순` : '아직 남긴 평점이 없어요.'}</p><ul className="rating-list">{ratings.map(rating => <li key={rating.ratingId}><strong>영화 #{rating.movieId} · {'★'.repeat(rating.score)}</strong><p>{rating.comment ?? '코멘트 없음'}</p><time dateTime={rating.createdAt}>{new Date(rating.createdAt).toLocaleString('ko-KR')}</time></li>)}</ul><details><summary>응답 데이터 보기</summary><small>GET {apiBase}/members/{requestedId}/ratings · 200</small><pre>{JSON.stringify(ratings, null, 2)}</pre></details></>}</div>
    </section>
  </main>
}

