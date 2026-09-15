"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { useBounty } from "@/hooks/use-bounties";
import { mapApiBountyToLocal } from "@/lib/api/mappers";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/reuseables/empty-state";
import { AppButton } from "@/components/reuseables/app-button";
import BountyDetails from "@/components/layouts/marketplace/bounty-details";

type BountyDetailsContainerProps = {
    id: string;
    marketplaceHref?: string;
};

const BountyDetailsContainer = ({ id, marketplaceHref = "/marketplace" }: BountyDetailsContainerProps) => {
    const { data, isLoading, isError } = useBounty(id);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-100 p-8 md:col-span-2">
                    <Skeleton className="h-8 w-2/3" />
                    <Skeleton className="mt-4 h-4 w-1/3" />
                    <Skeleton className="mt-6 h-24 w-full" />
                </div>
                <div className="rounded-2xl border border-gray-100 p-6">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="mt-4 h-8 w-1/3" />
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <EmptyState
                icon={<AlertTriangle className="size-6" />}
                title="Bounty not found"
                description="This bounty may have been removed or the link is incorrect."
                action={
                    <AppButton variant="primary" render={<Link href={marketplaceHref} />}>
                        Back to Marketplace
                    </AppButton>
                }
            />
        );
    }

    return <BountyDetails bounty={mapApiBountyToLocal(data)} />;
};

export default BountyDetailsContainer;
