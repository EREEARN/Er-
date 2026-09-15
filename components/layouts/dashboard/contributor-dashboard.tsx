"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { TabSwitcher } from "@/components/reuseables/tab-switcher";
import { AppButton } from "@/components/reuseables/app-button";
import EmptyState from "@/components/reuseables/empty-state";
import DashboardTopBar from "@/components/layouts/dashboard/dashboard-topbar";
import { BountyProgressCard } from "@/components/reuseables/bounty-progress-card";
import RecentActivity from "@/components/layouts/dashboard/recent-activity";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/reuseables/text";
import { useContributorDashboard } from "@/hooks/use-dashboard";
import { mapApiBountyToLocal } from "@/lib/api/mappers";
import { useAuthStore } from "@/lib/auth-store";

const tabs = ["Active Bounties", "Submitted", "Completed", "Earnings"];

const activityItems = [
    { dotColor: "bg-app-green", text: "Bounty Approved & Paid (1,200 XLM)", time: "2 hours ago" },
    { dotColor: "bg-amber-500", text: "Milestone Submitted for review", time: "Yesterday at 15:43" },
    { dotColor: "bg-app-primary", text: "Claimed 'Stellar Wallet Connector React Hook'", time: "3 days ago" },
];

function truncateAddress(address?: string) {
    if (!address) return "Developer";
    return address.length <= 10 ? address : `${address.slice(0, 4)}...${address.slice(-4)}`;
}

const ContributorDashboard = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const { data, isLoading, isError } = useContributorDashboard();
    const walletAddress = useAuthStore((state) => state.user?.wallet_address);

    const activeClaims = (data?.active_claims ?? []).map(mapApiBountyToLocal);
    const submitted = (data?.submitted ?? []).map(mapApiBountyToLocal);
    const completed = (data?.completed ?? []).map(mapApiBountyToLocal);

    const currentList =
        activeTab === "Active Bounties" ? activeClaims : activeTab === "Submitted" ? submitted : activeTab === "Completed" ? completed : [];

    return (
        <div>
            <DashboardTopBar eyebrow="Contributor Workspace" heading={`Welcome back, ${truncateAddress(walletAddress)}`} />

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                    <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                    {activeTab === "Earnings" ? (
                        <div className="mt-6 rounded-2xl border border-gray-100 p-6">
                            <Text as="h2" className="text-sm font-bold text-app-dark-purple">Total Earned</Text>
                            <Text as="p" className="mt-2 text-2xl font-bold text-app-green">
                                {isLoading ? "..." : `${Number(data?.total_earned ?? 0).toLocaleString()} XLM`}
                            </Text>
                        </div>
                    ) : isLoading ? (
                        <div className="mt-6 flex flex-col gap-6">
                            <Skeleton className="h-32 w-full rounded-2xl" />
                            <Skeleton className="h-32 w-full rounded-2xl" />
                        </div>
                    ) : isError ? (
                        <div className="mt-6 rounded-2xl border border-gray-100 p-6">
                            <EmptyState
                                icon={<Briefcase className="size-6" />}
                                title="Couldn't load your bounties"
                                description="We couldn't reach your dashboard right now. Please try again shortly."
                            />
                        </div>
                    ) : currentList.length > 0 ? (
                        <div className="mt-6 flex flex-col gap-6">
                            {currentList.map((bounty) => (
                                <BountyProgressCard
                                    key={bounty.id}
                                    variant={activeTab === "Submitted" ? "review" : "progress"}
                                    status={activeTab === "Submitted" ? "In Review" : bounty.status}
                                    meta={bounty.postedAgo}
                                    note={activeTab === "Submitted" ? "Awaiting Poster Review" : bounty.daysLeft}
                                    title={bounty.title}
                                    description={bounty.tags.join(", ")}
                                    progressLabel={activeTab === "Submitted" ? "Submission Pending Approval" : "Work in progress"}
                                    progressPercent={activeTab === "Submitted" ? 90 : activeTab === "Completed" ? 100 : 40}
                                    rewardLabel={activeTab === "Submitted" ? "Guaranteed Reward" : "Milestone Reward"}
                                    reward={bounty.reward}
                                    action={
                                        <AppButton
                                            variant={activeTab === "Submitted" ? "outline" : "primary"}
                                            render={<Link href={`/dashboard/workspace/${bounty.id}`} />}
                                        >
                                            {activeTab === "Completed"
                                                ? "View Workspace"
                                                : activeTab === "Submitted"
                                                  ? "View Submission"
                                                  : "Go to Workspace"}
                                        </AppButton>
                                    }
                                />
                            ))}

                            {activeTab === "Active Bounties" && (
                                <div className="rounded-2xl border border-app-primary/20 bg-app-light-primary/40 p-5">
                                    <Text as="p" className="text-sm font-bold text-app-primary">How to submit your work</Text>
                                    <Text as="p" className="mt-2 text-sm text-app-dark-purple/80">
                                        When you are ready to deliver, click &apos;Go to Workspace&apos;. You can upload the GitHub repository URL, verify tests, and run the Soroban deployment target directly from the developer console to prove on-chain compliance.
                                    </Text>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="mt-6 rounded-2xl border border-gray-100 p-6">
                            <EmptyState
                                icon={<Briefcase className="size-6" />}
                                title="Nothing here yet"
                                description="Browse the marketplace to find your first bounty, submit a proof-of-work, and start earning XLM."
                                action={
                                    <AppButton variant="primary" render={<Link href="/marketplace" />}>
                                        Browse Marketplace
                                    </AppButton>
                                }
                            />
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-6 md:self-start">
                    <div className="rounded-2xl border border-gray-100 p-6">
                        <Text as="h2" className="text-sm font-bold text-app-dark-purple">Earnings Summary</Text>

                        <div className="mt-4 flex flex-col gap-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-app-grey-light">Total Earned</span>
                                <span className="font-semibold text-app-dark-purple">
                                    {isLoading ? "..." : `${Number(data?.total_earned ?? 0).toLocaleString()} XLM`}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-app-grey-light">Active Claims</span>
                                <span className="font-semibold text-app-dark-purple">{activeClaims.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-app-grey-light">Submitted</span>
                                <span className="font-semibold text-amber-600">{submitted.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-app-grey-light">Completed</span>
                                <span className="font-semibold text-app-green">{completed.length}</span>
                            </div>
                        </div>

                        <AppButton variant="primary" className="mt-4 w-full justify-center bg-emerald-500 hover:bg-emerald-600">
                            Withdraw to Wallet
                        </AppButton>
                    </div>

                    <RecentActivity items={activityItems} />
                </div>
            </div>
        </div>
    );
};

export default ContributorDashboard;
