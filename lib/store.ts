import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "contributor" | "poster";

type AppState = {
    role: UserRole;
    setRole: (role: UserRole) => void;
};

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            role: "contributor",
            setRole: (role) => set({ role }),
        }),
        { name: "ereearn-app-store" }
    )
);
