import { useState, type FormEvent } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
const DEFAULT_FORM = { email: "", nickname: "", password: "", passwordConfirm: "" };
const DEFAULT_DUPLICATE_CHECK = { isChecking: false, isAvailable: false };
const DUPLICATE_FIELDS = [
  { key: "email", label: "이메일", type: "email", autoComplete: "email", check: checkEmailDuplicate },
  { key: "nickname", label: "닉네임", type: "text", autoComplete: "nickname", check: checkNicknameDuplicate },
] as const;

type FormKey = keyof typeof DEFAULT_FORM;
type DuplicateField = (typeof DUPLICATE_FIELDS)[number];

export function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const nicknameLength = form.nickname.trim().length;
  const isNicknameValid = nicknameLength >= 2 && nicknameLength <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid = form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;
  const canSubmit = isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfirmValid
    && duplicateCheck.email.isAvailable && duplicateCheck.nickname.isAvailable;

  function handleChangeField(key: FormKey, value: string) {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;
      setDuplicateCheck((previous) => ({ ...previous, [key]: DEFAULT_DUPLICATE_CHECK }));
    }
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  async function handleCheckDuplicate({ key, label, check }: DuplicateField) {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking) return;

    setDuplicateCheck((previous) => ({ ...previous, [key]: { isChecking: true, isAvailable: false } }));
    try {
      const { available } = await check(form[key].trim());
      if (typeof available !== "boolean") throw new Error("중복 확인 응답이 올바르지 않아요.");
      setDuplicateCheck((previous) => ({ ...previous, [key]: { isChecking: false, isAvailable: available } }));
      alert(available ? `사용할 수 있는 ${label}이에요.` : `이미 사용 중인 ${label}이에요.`);
    } catch {
      setDuplicateCheck((previous) => ({ ...previous, [key]: DEFAULT_DUPLICATE_CHECK }));
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });
      if (!response.isSuccess) throw new Error(response.message);
      setForm(DEFAULT_FORM);
      setDuplicateCheck({ email: DEFAULT_DUPLICATE_CHECK, nickname: DEFAULT_DUPLICATE_CHECK });
      alert(response.message);
      // 로그인 페이지 연결 후 사용: navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">회원가입</h1>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {DUPLICATE_FIELDS.map((field) => {
          const { key, label, type, autoComplete } = field;
          const { isChecking, isAvailable } = duplicateCheck[key];
          const isValid = key === "email" ? isEmailValid : isNicknameValid;
          const showError = form[key].length > 0 && !isValid;
          return (
            <div key={key}>
              <label className="mb-1 block" htmlFor={key}>{label}</label>
              <div className="flex gap-2">
                <input
                  className="min-w-0 flex-1 rounded border px-3 py-2"
                  id={key}
                  type={type}
                  autoComplete={autoComplete}
                  value={form[key]}
                  disabled={isChecking || isSubmitting}
                  aria-invalid={showError}
                  onChange={(event) => handleChangeField(key, event.target.value)}
                />
                <button
                  className="rounded border px-3 disabled:opacity-50"
                  type="button"
                  disabled={!isValid || isChecking || isSubmitting}
                  onClick={() => void handleCheckDuplicate(field)}
                >
                  {isChecking ? "확인 중" : "중복 확인"}
                </button>
              </div>
              {showError && <p className="text-sm text-red-500">{key === "email" ? "이메일 형식을 확인해 주세요." : "닉네임은 2~12자로 입력해 주세요."}</p>}
              {isAvailable && <p className="text-sm" role="status">사용할 수 있는 {label}이에요.</p>}
            </div>
          );
        })}
        <div>
          <label className="mb-1 block" htmlFor="password">비밀번호</label>
          <input className="w-full rounded border px-3 py-2" id="password" type="password" autoComplete="new-password" disabled={isSubmitting} value={form.password} onChange={(event) => handleChangeField("password", event.target.value)} />
          {form.password.length > 0 && !isPasswordValid && <p className="text-sm text-red-500">영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 포함해 8자 이상 입력해 주세요.</p>}
        </div>
        <div>
          <label className="mb-1 block" htmlFor="passwordConfirm">비밀번호 확인</label>
          <input className="w-full rounded border px-3 py-2" id="passwordConfirm" type="password" autoComplete="new-password" disabled={isSubmitting} value={form.passwordConfirm} onChange={(event) => handleChangeField("passwordConfirm", event.target.value)} />
          {form.passwordConfirm.length > 0 && !isPasswordConfirmValid && <p className="text-sm text-red-500">비밀번호가 일치하지 않아요.</p>}
        </div>
        <button className="w-full rounded border px-3 py-2 disabled:opacity-50" type="submit" disabled={!canSubmit || isSubmitting}>{isSubmitting ? "가입 중" : "가입하기"}</button>
      </form>
    </main>
  );
}
