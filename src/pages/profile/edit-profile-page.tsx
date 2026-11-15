import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { accountInput, accountPrimary, ProfileAvatar } from "../../components/auth/account-layout";
import { useProfileStore } from "../../stores/profile-store";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export function EditProfilePage() {
  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const [nickname, setNickname] = useState(profile.nickname);
  const [image, setImage] = useState(profile.image);
  const [nicknameStatus, setNicknameStatus] = useState("");
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [imageError, setImageError] = useState("");
  const [isReadingImage, setIsReadingImage] = useState(false);
  const navigate = useNavigate();
  const trimmedNickname = nickname.trim();
  const nicknameValid = trimmedNickname.length >= 2 && trimmedNickname.length <= 12;

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > MAX_IMAGE_SIZE) {
      setImageError("5MB 이하 JPG, PNG, WebP 이미지를 선택해 주세요.");
      return;
    }

    setImageError("");
    setIsReadingImage(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setImage(reader.result);
    };
    reader.onerror = () => setImageError("이미지를 열지 못했어요.");
    reader.onloadend = () => setIsReadingImage(false);
    reader.readAsDataURL(file);
  }

  async function handleCheckNickname() {
    if (!nicknameValid || isCheckingNickname) return;
    setIsCheckingNickname(true);
    setNicknameStatus("");
    try {
      const { available } = await checkNicknameDuplicate(trimmedNickname);
      if (typeof available !== "boolean") throw new Error("잘못된 응답");
      setNicknameStatus(available ? "사용할 수 있는 닉네임이에요." : "이미 사용 중인 닉네임이에요.");
    } catch {
      setNicknameStatus("중복 확인을 완료하지 못했어요. 다시 시도해 주세요.");
    } finally {
      setIsCheckingNickname(false);
    }
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nicknameValid || isReadingImage) return;
    updateProfile({ ...profile, nickname: trimmedNickname, image });
    void navigate({ to: "/my" });
  }

  return (
    <main className="mx-auto flex w-full max-w-[1344px] flex-1 flex-col gap-8 px-5 py-7 sm:px-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="mb-2 text-3xl font-bold">내 정보 수정</h1>
            <p className="text-sm text-[#626975]">닉네임과 프로필 이미지를 변경할 수 있어요.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/my" className="text-sm font-semibold text-[#626975] hover:underline">취소</Link>
            <button className={accountPrimary} type="submit" disabled={!nicknameValid || isReadingImage}>변경사항 저장</button>
          </div>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          <div className="grid content-start justify-items-center gap-2 py-4">
            <label className="relative cursor-pointer rounded-full">
              <ProfileAvatar image={image} />
              <span className="absolute right-0 bottom-0 grid size-6 place-items-center rounded-full border border-[#222] bg-white">
                <img src="/icons/movie-icons/edit.svg" width={14} height={14} alt="" />
              </span>
              <span className="sr-only">프로필 이미지 선택</span>
              <input className="absolute inset-0 size-full cursor-pointer opacity-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-[#255de0]" type="file" accept="image/jpeg,image/png,image/webp" disabled={isReadingImage} onChange={handleImageChange} />
            </label>
            <p className="text-sm font-semibold">프로필 이미지</p>
            <p className="text-xs text-[#626975]">JPG, PNG, WebP · 최대 5MB</p>
            {imageError && <p className="text-sm text-[#ad2020]" role="alert">{imageError}</p>}
          </div>
          <div className="grid content-start gap-4">
            <div className="grid gap-2 text-sm font-semibold">
              <label htmlFor="profile-nickname">닉네임</label>
              <div className="flex overflow-hidden rounded-lg border border-[#e1e4e9] bg-white focus-within:border-[#255de0]">
                <input className="min-w-0 flex-1 px-3.5 py-3 outline-none" id="profile-nickname" name="nickname" autoComplete="nickname" value={nickname} required maxLength={12} disabled={isCheckingNickname} aria-invalid={!nicknameValid} aria-describedby={nicknameValid ? undefined : "nickname-hint"} onChange={(event) => {
                  setNickname(event.target.value);
                  setNicknameStatus("");
                }} />
                <button className="shrink-0 px-3 text-xs font-semibold text-[#255de0] disabled:opacity-50" type="button" disabled={!nicknameValid || trimmedNickname === profile.nickname || isCheckingNickname} onClick={() => void handleCheckNickname()}>
                  {isCheckingNickname ? "확인 중" : "중복 확인"}
                </button>
              </div>
              {!nicknameValid && <span id="nickname-hint" className="text-[#ad2020]">닉네임은 2~12자예요.</span>}
              {nicknameStatus && <p className="text-xs font-normal text-[#626975]" role="status">{nicknameStatus}</p>}
            </div>
            <label className="grid gap-2 text-sm font-semibold">
              이메일
              <input className={accountInput} name="email" type="email" value={profile.email} readOnly />
            </label>
          </div>
        </div>
      </form>
      <section aria-labelledby="withdrawal-title" className="mt-auto flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#e39a9a] bg-[#f9e8e8] p-4 text-[#972020]">
        <div><h2 id="withdrawal-title" className="text-sm font-semibold">회원 탈퇴</h2><p className="mt-1 text-xs">탈퇴 기능은 아직 연결되지 않았어요.</p></div>
        <button className="rounded-lg border border-[#e39a9a] bg-white px-3 py-2 text-sm font-semibold opacity-60" type="button" disabled>회원 탈퇴</button>
      </section>
    </main>
  );
}
