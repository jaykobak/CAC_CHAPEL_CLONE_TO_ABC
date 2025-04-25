// sidebarStore.js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useSidebarStore = create(
  devtools(
    persist(
      (set) => ({
        isOpen: true, // Default to open on first load
        rehydrated: false,
        toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
        initializeSidebar: (isLargeScreen) => {
          set((state) => {
            // Only set initial state if not already rehydrated from storage
            if (!state.rehydrated) {
              return {
                isOpen: isLargeScreen, // Open on large screens, closed on small
                rehydrated: true
              };
            }
            return state;
          });
        },
      }),
      {
        name: "sidebar-storage",
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.rehydrated = true;
          }
        },
      }
    )
  )
);
