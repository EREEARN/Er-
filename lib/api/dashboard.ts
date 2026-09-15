import { apiClient } from "@/lib/api/client";
import type { ContributorDashboard, PosterDashboard } from "@/lib/api/types";

export async function getContributorDashboard() {
    const { data } = await apiClient.get<ContributorDashboard>("/api/v1/dashboard/contributor/");
    return data;
}

export async function getPosterDashboard() {
    const { data } = await apiClient.get<PosterDashboard>("/api/v1/dashboard/poster/");
    return data;
}
