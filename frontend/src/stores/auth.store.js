import { create } from "zustand";
export const useAuthStore = create((set) => ({
  user: null,
  login: (role, name = null) =>
    set({ user: { name: name || role.toUpperCase(), role } }),
  logout: () => set({ user: null }),
}));
