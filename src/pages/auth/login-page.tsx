import { Link } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { AccountLayout, accountInput, accountPrimary } from "../../components/auth/account-layout";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedEmail(email.trim());
    setPassword("");
  }

  return (
    <AccountLayout title="로그인">
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-semibold">
          이메일
          <input className={`${accountInput} bg-[url(/icons/movie-icons/mail.svg)] bg-[length:16px] bg-[position:14px_center] bg-no-repeat pl-10`} name="email" type="email" autoComplete="email" placeholder="이메일을 입력해 주세요" value={email} required onChange={(event) => {
            setEmail(event.target.value);
            setSubmittedEmail("");
          }} />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          비밀번호
          <input className={`${accountInput} bg-[url(/icons/movie-icons/lock.svg)] bg-[length:16px] bg-[position:14px_center] bg-no-repeat pl-10`} name="password" type="password" autoComplete="current-password" placeholder="비밀번호를 입력해 주세요" value={password} required onChange={(event) => {
            setPassword(event.target.value);
            setSubmittedEmail("");
          }} />
        </label>
        <button className={`${accountPrimary} min-h-12`} type="submit" disabled={!email.trim() || !password}>로그인</button>
        {submittedEmail && <p className="break-all text-sm text-[#626975]" role="status">입력한 이메일은 {submittedEmail}이에요. 이 화면에서는 입력만 확인해요.</p>}
      </form>
      <div className="mt-6 flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm">
        <span className="text-[#626975]">아직 계정이 없으신가요?</span>
        <Link className="font-semibold text-[#255de0] underline-offset-4 hover:underline" to="/signup">회원가입</Link>
      </div>
    </AccountLayout>
  );
}
