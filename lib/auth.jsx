import { create } from "zustand";

export const useAuth = create((set) => ({
  user: null,
  login: (email, _password, role) =>
    set({
      user: {
        id: "1",
        name: role === "admin" ? "Admin User" : "Normal User",
        email,
        role,
      },
    }),
  signup: (name, email, _password, role) =>
    set({
      user: {
        id: "1",
        name,
        email,
        role,
      },
    }),
  logout: () => set({ user: null }),
}));
