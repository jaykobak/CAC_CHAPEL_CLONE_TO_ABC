import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        accessToken: "",
        rehydrated: false, // Indicates whether the state has loaded
        setAuth: (accessToken) => set({ isAuthenticated: true, accessToken }),
        logout: () => set({ isAuthenticated: false, accessToken: "" }),
      }),
      {
        name: "auth-storage",
        onRehydrateStorage: () => (state) => {
          state && set({ rehydrated: true });
        },
      }
    )
  )
);

export default useAuthStore;
