import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "@/lib/api/types";

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    user: UserProfile | null;
    setTokens: (accessToken: string, refreshToken: string) => void;
    setUser: (user: UserProfile) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            user: null,
            setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
            setUser: (user) => set({ user }),
            clearAuth: () => set({ accessToken: null, refreshToken: null, user: null }),
        }),
        { name: "ereearn-auth-store" }
    )
);
