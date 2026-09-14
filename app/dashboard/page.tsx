"use client";

import { useAppStore } from "@/lib/store";
import ContributorDashboard from "@/components/layouts/dashboard/contributor-dashboard";
import PosterDashboard from "@/components/layouts/dashboard/poster-dashboard";

export default function DashboardPage() {
    const role = useAppStore((state) => state.role);

    return role === "poster" ? <PosterDashboard /> : <ContributorDashboard />;
}
