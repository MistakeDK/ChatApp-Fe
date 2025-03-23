import { eLocalKey } from "@/config/enum";
import { IUserInfo } from "@/services/auth/auth.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { encryptedStorage } from "./middlewareStorage";

type authState = {
  isAuthenticated: boolean | null;
  accessToken: string;
  refreshToken: string;
  userInfo: IUserInfo | null;
  idUser: string | null;
};

type authAction = {
  setUserInfo: (userInfo: IUserInfo) => void;
  login: (accessToken: string, refreshToken: string, idUser: string) => void;
  logout: () => void;
};

export const useAuthStore = create<authAction & authState>()(
  persist(
    (set) => ({
      isAuthenticated: null,
      idUser: encryptedStorage.getItem(eLocalKey.AUTH_INFO) as string,
      accessToken: encryptedStorage.getItem(eLocalKey.AUTH_INFO) as string,
      refreshToken: encryptedStorage.getItem(eLocalKey.AUTH_INFO) as string,
      userInfo: null,
      setUserInfo: (userInfo: IUserInfo) => set({ userInfo: userInfo }),
      login: (accessToken, refreshToken, idUser: string) =>
        set({
          isAuthenticated: true,
          accessToken,
          refreshToken,
          idUser: idUser,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
        }),
    }),
    {
      name: eLocalKey.AUTH_INFO as string,
      storage: createJSONStorage(() => encryptedStorage),
    }
  )
);
