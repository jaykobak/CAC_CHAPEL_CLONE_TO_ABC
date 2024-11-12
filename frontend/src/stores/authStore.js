import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        accessToken: "",
        setAuth: (accessToken) =>
          set({ isAuthenticated: true, accessToken }),
        logout: () =>
          set({ isAuthenticated: false, accessToken: "" }),
      }),
      {
        name: "auth-storage", // Key for localStorage
      }
    )
  )
);

export default useAuthStore;
