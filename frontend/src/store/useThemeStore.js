import { create } from "zustand";

// here i set the localtstorage so that when the user returns, we know their theme.
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("preferred-theme") || "forrest",
  setTheme: (theme) => {
    localStorage.setItem("preferred-theme", theme);
    set({ theme });
  },
}));
