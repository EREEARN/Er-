"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getCurrentUser,
    loginWithPassword,
    patchCurrentUser,
    registerWithPassword,
    requestAuthChallenge,
    updateCurrentUser,
    verifyAuthChallenge,
} from "@/lib/api/auth";
import { useAuthStore } from "@/lib/auth-store";
import type { AuthVerifyPayload, LoginPayload, RegisterPayload, UpdateProfilePayload } from "@/lib/api/types";

export const authKeys = {
    me: ["auth", "me"] as const,
};

export function useAuthChallenge() {
    return useMutation({
        mutationFn: (walletAddress: string) => requestAuthChallenge(walletAddress),
    });
}

export function useVerifyAuth() {
    const queryClient = useQueryClient();
    const setTokens = useAuthStore((state) => state.setTokens);
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: (payload: AuthVerifyPayload) => verifyAuthChallenge(payload),
        onSuccess: (data) => {
            setTokens(data.access, data.refresh);
            setUser(data.user);
            queryClient.setQueryData(authKeys.me, data.user);
        },
    });
}

export function useLogin() {
    const queryClient = useQueryClient();
    const setTokens = useAuthStore((state) => state.setTokens);
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: (payload: LoginPayload) => loginWithPassword(payload),
        onSuccess: (data) => {
            setTokens(data.access, data.refresh);
            setUser(data.user);
            queryClient.setQueryData(authKeys.me, data.user);
        },
    });
}

export function useRegister() {
    const queryClient = useQueryClient();
    const setTokens = useAuthStore((state) => state.setTokens);
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: (payload: RegisterPayload) => registerWithPassword(payload),
        onSuccess: (data) => {
            setTokens(data.access, data.refresh);
            setUser(data.user);
            queryClient.setQueryData(authKeys.me, data.user);
        },
    });
}

export function useCurrentUser() {
    const accessToken = useAuthStore((state) => state.accessToken);

    return useQuery({
        queryKey: authKeys.me,
        queryFn: getCurrentUser,
        enabled: Boolean(accessToken),
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: (payload: UpdateProfilePayload) => updateCurrentUser(payload),
        onSuccess: (data) => {
            setUser(data);
            queryClient.setQueryData(authKeys.me, data);
        },
    });
}

export function usePatchProfile() {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: (payload: Partial<UpdateProfilePayload>) => patchCurrentUser(payload),
        onSuccess: (data) => {
            setUser(data);
            queryClient.setQueryData(authKeys.me, data);
        },
    });
}
