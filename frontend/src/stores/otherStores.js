// sidebarStore.js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useSidebarStore = create(
  devtools(
    persist(
      (set) => ({
        isOpen: false,
        rehydrated: false,
        toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
        initializeSidebar: (isLargeScreen) => {
          set({ isOpen: isLargeScreen });
        },
      }),
      {
        name: "sidebar-storage",
        onRehydrateStorage: () => (state) => {
          state && set({ rehydrated: true });
        },
      }
    )
  )
);
