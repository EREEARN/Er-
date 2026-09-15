import { isAxiosError } from "axios";

/** Extracts a human-readable message from a DRF-style error response (detail, message, or first field error). */
export function getApiErrorMessage(error: unknown, fallback = "Something went wrong. Please try again.") {
    if (isAxiosError(error)) {
        const data = error.response?.data as
            | { detail?: string; message?: string; non_field_errors?: string[]; [key: string]: unknown }
            | undefined;

        if (data?.detail) return data.detail;
        if (data?.message) return data.message;
        if (data?.non_field_errors?.[0]) return data.non_field_errors[0];

        if (data) {
            const firstFieldError = Object.values(data).find(
                (value): value is string[] => Array.isArray(value) && typeof value[0] === "string"
            );
            if (firstFieldError) return firstFieldError[0];
        }

        return error.message || fallback;
    }

    if (error instanceof Error) return error.message;
    return fallback;
}
