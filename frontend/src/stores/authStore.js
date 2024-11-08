import { create } from "zustand";


const useAuthStore = create((set) => ({
    isAuthenticated: false,
    accessToken: "",
    refreshToken: "",
    setAuth: (accessToken, refreshToken) => set({ isAuthenticated: true, accessToken, refreshToken }),
    logout: () => set({ isAuthenticated: false, accessToken: "", refreshToken: "" }),
}))

export default useAuthStore