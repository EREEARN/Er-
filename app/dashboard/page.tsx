"use client";

import { useCurrentUser } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";
import ContributorDashboard from "@/components/layouts/dashboard/contributor-dashboard";
import PosterDashboard from "@/components/layouts/dashboard/poster-dashboard";

export default function DashboardPage() {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Spinner className="size-6 text-app-primary" />
            </div>
        );
    }

    return user?.role === "POSTER" ? <PosterDashboard /> : <ContributorDashboard />;
}
