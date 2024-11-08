import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

// Sidebar store with persistence and rehydration tracking
export const useSidebarStore = create(
  devtools(
    persist(
      (set) => ({
        isOpen: false, // Initial sidebar state
        rehydrated: false, // Tracks if state has rehydrated
        toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
      }),
      {
        name: "sidebar-storage", // Key for localStorage
        onRehydrateStorage: () => (state) => {
          state && set({ rehydrated: true }); // Mark rehydration as complete
        },
      }
    )
  )
);
