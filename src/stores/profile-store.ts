import { create } from "zustand";

interface Profile {
  email: string;
  nickname: string;
  image: string | null;
}

interface ProfileState {
  profile: Profile;
  updateProfile: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: { email: "movie@example.com", nickname: "영화팬", image: null },
  updateProfile: (profile) => set({ profile }),
}));
