import { apiClient } from "@/lib/api/client";
import type {
    AuthChallengeResponse,
    AuthSessionResponse,
    AuthVerifyPayload,
    AuthTokens,
    LoginPayload,
    RegisterPayload,
    UpdateProfilePayload,
    UserProfile,
} from "@/lib/api/types";

export async function requestAuthChallenge(walletAddress: string) {
    const { data } = await apiClient.post<AuthChallengeResponse>("/api/v1/auth/challenge/", {
        wallet_address: walletAddress,
    });
    return data;
}

export async function verifyAuthChallenge(payload: AuthVerifyPayload) {
    const { data } = await apiClient.post<AuthSessionResponse>("/api/v1/auth/verify/", payload);
    return data;
}

export async function loginWithPassword(payload: LoginPayload) {
    const { data } = await apiClient.post<AuthSessionResponse>("/api/v1/auth/login/", payload);
    return data;
}

export async function registerWithPassword(payload: RegisterPayload) {
    const { data } = await apiClient.post<AuthSessionResponse>("/api/v1/auth/register/", payload);
    return data;
}

export async function refreshAuthTokens(refresh: string) {
    const { data } = await apiClient.post<AuthTokens>("/api/v1/auth/refresh/", { refresh });
    return data;
}

export async function getCurrentUser() {
    const { data } = await apiClient.get<UserProfile>("/api/v1/auth/me/");
    return data;
}

export async function updateCurrentUser(payload: UpdateProfilePayload) {
    const { data } = await apiClient.put<UserProfile>("/api/v1/auth/me/", payload);
    return data;
}

export async function patchCurrentUser(payload: Partial<UpdateProfilePayload>) {
    const { data } = await apiClient.patch<UserProfile>("/api/v1/auth/me/", payload);
    return data;
}
