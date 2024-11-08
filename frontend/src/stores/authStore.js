import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        accessToken: "",
        refreshToken: "",
        setAuth: (accessToken, refreshToken) =>
          set({ isAuthenticated: true, accessToken, refreshToken }),
        logout: () =>
          set({ isAuthenticated: false, accessToken: "", refreshToken: "" }),
      }),
      {
        name: "auth-storage", // Key for localStorage
      }
    )
  )
);

export default useAuthStore;
