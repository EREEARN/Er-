"use client";

import { useQuery } from "@tanstack/react-query";
import { getContributorDashboard, getPosterDashboard } from "@/lib/api/dashboard";

export const dashboardKeys = {
    contributor: ["dashboard", "contributor"] as const,
    poster: ["dashboard", "poster"] as const,
};

export function useContributorDashboard() {
    return useQuery({
        queryKey: dashboardKeys.contributor,
        queryFn: getContributorDashboard,
    });
}

export function usePosterDashboard() {
    return useQuery({
        queryKey: dashboardKeys.poster,
        queryFn: getPosterDashboard,
    });
}
