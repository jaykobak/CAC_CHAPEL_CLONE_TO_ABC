import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        accessToken: "",
        rehydrated: false,
        setAuth: (accessToken) => set({ isAuthenticated: true, accessToken }),
        logout: () => set({ isAuthenticated: false, accessToken: "" }),
      }),
      {
        name: "auth-storage",
        onRehydrateStorage: () => (state) => {
          console.log("Rehydrating state:", state);
          if (state) {
            set({ rehydrated: true });
          }
        },
      }
    )
  )
);

export default useAuthStore;
