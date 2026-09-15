"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderPlus } from "lucide-react";
import { TabSwitcher } from "@/components/reuseables/tab-switcher";
import { AppButton } from "@/components/reuseables/app-button";
import EmptyState from "@/components/reuseables/empty-state";
import DashboardTopBar from "@/components/layouts/dashboard/dashboard-topbar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "cn";
import { Text } from "@/components/reuseables/text";
import { usePosterDashboard } from "@/hooks/use-dashboard";
import { mapApiBountyToLocal } from "@/lib/api/mappers";

const tabs = ["Active Bounties", "Claimed", "Submissions to Review", "Completed"];

function truncateAddress(address?: string | null) {
    if (!address) return "a contributor";
    return address.length <= 10 ? address : `${address.slice(0, 4)}...${address.slice(-4)}`;
}

const PosterDashboard = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const { data, isLoading, isError } = usePosterDashboard();

    const activeBounties = (data?.active_bounties ?? []).map(mapApiBountyToLocal);
    const claimedBounties = (data?.claimed_bounties ?? []).map(mapApiBountyToLocal);
    const completedBounties = (data?.completed_bounties ?? []).map(mapApiBountyToLocal);
    const pendingReviews = data?.pending_reviews ?? [];

    const currentList =
        activeTab === "Active Bounties"
            ? activeBounties
            : activeTab === "Claimed"
              ? claimedBounties
              : activeTab === "Completed"
                ? completedBounties
                : [];

    const activeClaimedCount = activeBounties.length + claimedBounties.length;

    return (
        <div>
            <DashboardTopBar
                eyebrow="Poster Workspace"
                heading="Dashboard"
                action={
                    <AppButton variant="primary" render={<Link href="/dashboard/create-bounty" />}>
                        + Create New Bounty
                    </AppButton>
                }
            />

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-100 p-5">
                    <Text as="p" className="text-xs text-app-grey-light">Total Bounties Posted</Text>
                    <Text as="p" className="mt-1 text-2xl font-bold text-app-dark-purple">
                        {isLoading ? "..." : (data?.total_posted ?? 0)}
                    </Text>
                </div>
                <div className="rounded-2xl border border-gray-100 p-5">
                    <Text as="p" className="text-xs text-app-grey-light">Active / Claimed Bounties</Text>
                    <Text as="p" className="mt-1 text-2xl font-bold text-app-primary">{isLoading ? "..." : activeClaimedCount}</Text>
                </div>
                <div className="rounded-2xl border border-gray-100 p-5">
                    <Text as="p" className="text-xs text-app-grey-light">Total Spent</Text>
                    <Text as="p" className="mt-1 text-2xl font-bold text-app-green">
                        {isLoading ? "..." : `${Number(data?.total_spent ?? 0).toLocaleString()} XLM`}
                    </Text>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                    <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                    {activeTab === "Submissions to Review" ? (
                        isLoading ? (
                            <div className="mt-6 flex flex-col gap-4">
                                <Skeleton className="h-24 w-full rounded-2xl" />
                                <Skeleton className="h-24 w-full rounded-2xl" />
                            </div>
                        ) : pendingReviews.length > 0 ? (
                            <div className="mt-6 flex flex-col gap-4">
                                {pendingReviews.map((bounty) => {
                                    const mapped = mapApiBountyToLocal(bounty);
                                    return (
                                        <div key={bounty.id} className="rounded-2xl border border-gray-100 p-5">
                                            <div className="flex flex-wrap items-start justify-between gap-4">
                                                <div>
                                                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">
                                                        Awaiting Review
                                                    </span>
                                                    <Text as="p" className="mt-2 text-base font-bold text-app-dark-purple">{mapped.title}</Text>
                                                    <Text as="p" className="mt-1 text-xs text-app-grey-light">
                                                        Submitted by {truncateAddress(bounty.contributor?.wallet_address)}
                                                    </Text>
                                                </div>
                                                <div className="text-right">
                                                    <Text as="p" className="text-lg font-bold text-app-dark-purple">{mapped.reward}</Text>
                                                    <AppButton
                                                        variant="primary"
                                                        render={<Link href={`/dashboard/marketplace/${bounty.id}`} />}
                                                        className="mt-2 h-8 px-3 text-xs"
                                                    >
                                                        Review Code
                                                    </AppButton>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="mt-6 rounded-2xl border border-gray-100 p-6">
                                <EmptyState
                                    icon={<FolderPlus className="size-6" />}
                                    title="Nothing to review"
                                    description="No submissions are currently waiting for your review on the Stellar ledger."
                                />
                            </div>
                        )
                    ) : isLoading ? (
                        <div className="mt-6 flex flex-col gap-4">
                            <Skeleton className="h-24 w-full rounded-2xl" />
                            <Skeleton className="h-24 w-full rounded-2xl" />
                        </div>
                    ) : isError ? (
                        <div className="mt-6 rounded-2xl border border-gray-100 p-6">
                            <EmptyState
                                icon={<FolderPlus className="size-6" />}
                                title="Couldn't load your bounties"
                                description="We couldn't reach your dashboard right now. Please try again shortly."
                            />
                        </div>
                    ) : currentList.length > 0 ? (
                        <div className="mt-6 flex flex-col gap-4">
                            {currentList.map((bounty) => (
                                <div key={bounty.id} className="rounded-2xl border border-gray-100 p-5">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span
                                                    className={cn(
                                                        "rounded-full px-2.5 py-1 font-medium",
                                                        activeTab === "Active Bounties"
                                                            ? "bg-app-light-primary text-app-primary"
                                                            : "bg-gray-100 text-app-grey-light"
                                                    )}
                                                >
                                                    {bounty.status}
                                                </span>
                                            </div>
                                            <Text as="p" className="mt-2 text-base font-bold text-app-dark-purple">{bounty.title}</Text>
                                            <Text as="p" className="mt-1 text-xs text-app-grey-light">
                                                Deadline: {bounty.deadline} • {bounty.daysLeft}
                                            </Text>
                                        </div>
                                        <div className="text-right">
                                            <Text as="p" className="text-lg font-bold text-app-dark-purple">{bounty.reward}</Text>
                                            <AppButton
                                                variant="outline"
                                                render={<Link href={`/dashboard/marketplace/${bounty.id}`} />}
                                                className="mt-2 h-8 px-3 text-xs"
                                            >
                                                {activeTab === "Completed" ? "View Work" : "Manage"}
                                            </AppButton>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-6 rounded-2xl border border-gray-100 p-6">
                            <EmptyState
                                icon={<FolderPlus className="size-6" />}
                                title="You haven't posted any bounties yet"
                                description="Create your first bounty with milestone rewards to find talented Stellar developers and smart-contract experts."
                                action={
                                    <AppButton variant="primary" render={<Link href="/dashboard/create-bounty" />}>
                                        + Create Your First Bounty
                                    </AppButton>
                                }
                            />
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border border-gray-100 p-6 md:self-start">
                    <Text as="h2" className="text-sm font-bold text-app-dark-purple">Awaiting Review</Text>
                    {isLoading ? (
                        <Skeleton className="mt-4 h-16 w-full rounded-xl" />
                    ) : pendingReviews.length > 0 ? (
                        <div className="mt-4 flex flex-col gap-4">
                            {pendingReviews.slice(0, 3).map((bounty) => {
                                const mapped = mapApiBountyToLocal(bounty);
                                return (
                                    <div key={bounty.id} className="rounded-xl border border-gray-100 p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="size-7 shrink-0 rounded-full bg-gray-200" />
                                                <Text as="p" className="text-xs font-semibold text-app-dark-purple">
                                                    {truncateAddress(bounty.contributor?.wallet_address)}
                                                </Text>
                                            </div>
                                        </div>
                                        <Text as="p" className="mt-2 text-sm font-bold text-app-dark-purple">{mapped.title}</Text>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-sm font-bold text-app-dark-purple">{mapped.reward}</span>
                                            <AppButton
                                                variant="primary"
                                                render={<Link href={`/dashboard/marketplace/${bounty.id}`} />}
                                                className="h-8 px-3 text-xs"
                                            >
                                                Review Code
                                            </AppButton>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <Text as="p" className="mt-2 text-sm text-app-grey-light">
                            No submissions currently waiting for your review on the Stellar ledger.
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PosterDashboard;
