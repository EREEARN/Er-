import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/lib/auth-store";
import type { AuthTokens } from "@/lib/api/types";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL ?? 'https://api.ereearn.com';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
});

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
    const { refreshToken, setTokens, clearAuth } = useAuthStore.getState();
    if (!refreshToken) return null;

    try {
        const { data } = await axios.post<AuthTokens>(`${API_BASE_URL}/api/v1/auth/refresh/`, {
            refresh: refreshToken,
        });
        setTokens(data.access, data.refresh ?? refreshToken);
        return data.access;
    } catch {
        clearAuth();
        return null;
    }
}

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableConfig | undefined;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            refreshPromise ??= refreshAccessToken().finally(() => {
                refreshPromise = null;
            });
            const newAccessToken = await refreshPromise;

            if (newAccessToken) {
                originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
                return apiClient(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);
