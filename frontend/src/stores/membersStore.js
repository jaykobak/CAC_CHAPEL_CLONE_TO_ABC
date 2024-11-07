import { create } from "zustand";

const useMembersStore = create((set, get) => ({
  members: [],
  selectedMemberIds: new Set(), 
  setMembers: (members) => set({ members }),
  toggleMemberSelection: (id) => set((state) => {
    const selectedMemberIds = new Set(state.selectedMemberIds);
    if (selectedMemberIds.has(id)) {
      selectedMemberIds.delete(id);
    } else {
      selectedMemberIds.add(id);
    }
    return { selectedMemberIds };
  }),
  isMemberSelected: (id) => get().selectedMemberIds.has(id),

  selectAllMembers: () => set((state) => ({
    selectedMemberIds: new Set(state.members.map((member) => member.id)),
  })),

  deselectAllMembers: () => set({ selectedMemberIds: new Set() }),

  getSelectedMembersData: () =>
    Array.from(get().selectedMemberIds).map(
      (id) => get().members.find((member) => member.id === id)
    ),
}));

export default useMembersStore;
