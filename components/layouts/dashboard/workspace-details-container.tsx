"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useBounty } from "@/hooks/use-bounties";
import { mapApiBountyToLocal } from "@/lib/api/mappers";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/reuseables/empty-state";
import { AppButton } from "@/components/reuseables/app-button";
import WorkspaceDetails from "@/components/layouts/dashboard/workspace-details";

const WorkspaceDetailsContainer = ({ id }: { id: string }) => {
    const { data, isLoading, isError } = useBounty(id);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2 flex flex-col gap-6">
                    <Skeleton className="h-8 w-2/3" />
                    <Skeleton className="h-32 w-full rounded-2xl" />
                </div>
                <Skeleton className="h-40 w-full rounded-2xl" />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <EmptyState
                icon={<AlertTriangle className="size-6" />}
                title="Workspace not found"
                description="This bounty workspace is unavailable or you may not have access to it."
                action={
                    <AppButton variant="primary" render={<Link href="/dashboard" />}>
                        Back to Dashboard
                    </AppButton>
                }
            />
        );
    }

    return <WorkspaceDetails bounty={mapApiBountyToLocal(data)} />;
};

export default WorkspaceDetailsContainer;
