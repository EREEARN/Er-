"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderPlus } from "lucide-react";
import { TabSwitcher } from "@/components/reuseables/tab-switcher";
import { AppButton } from "@/components/reuseables/app-button";
import EmptyState from "@/components/reuseables/empty-state";
import DashboardTopBar from "@/components/layouts/dashboard/dashboard-topbar";
import { cn } from "cn";
import { Text } from "@/components/reuseables/text";

const tabs = ["Active Bounties", "Claimed", "Submissions to Review", "Completed"];

type PosterBounty = {
    status: "In Progress" | "Open";
    meta: string;
    title: string;
    reward: string;
    deadline: string;
    daysLeft: string;
    actionLabel: string;
};

// Starts empty to reflect a freshly onboarded poster account; populated by real bounties once created.
const postedBounties: PosterBounty[] = [];

type SubmissionToReview = {
    submitter: string;
    submittedAgo: string;
    title: string;
    description: string;
    reward: string;
};

const submissions: SubmissionToReview[] = [];

const stats = {
    totalPosted: postedBounties.length,
    activeClaimed: postedBounties.filter((bounty) => bounty.status === "In Progress").length,
    totalLocked: postedBounties.length > 0 ? "14,500 XLM" : "0 XLM",
};

const PosterDashboard = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const hasBounties = postedBounties.length > 0;
    const hasSubmissions = submissions.length > 0;

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
                    <Text as="p" className="mt-1 text-2xl font-bold text-app-dark-purple">{stats.totalPosted}</Text>
                </div>
                <div className="rounded-2xl border border-gray-100 p-5">
                    <Text as="p" className="text-xs text-app-grey-light">Active / Claimed Bounties</Text>
                    <Text as="p" className="mt-1 text-2xl font-bold text-app-primary">{stats.activeClaimed}</Text>
                </div>
                <div className="rounded-2xl border border-gray-100 p-5">
                    <Text as="p" className="text-xs text-app-grey-light">Total Locked in Escrow</Text>
                    <Text as="p" className="mt-1 text-2xl font-bold text-app-green">{stats.totalLocked}</Text>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                    <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                    {activeTab === "Active Bounties" && hasBounties ? (
                        <div className="mt-6 flex flex-col gap-4">
                            {postedBounties.map((bounty) => (
                                <div key={bounty.title} className="rounded-2xl border border-gray-100 p-5">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span
                                                    className={cn(
                                                        "rounded-full px-2.5 py-1 font-medium",
                                                        bounty.status === "In Progress"
                                                            ? "bg-app-light-primary text-app-primary"
                                                            : "bg-gray-100 text-app-grey-light"
                                                    )}
                                                >
                                                    {bounty.status}
                                                </span>
                                                <span className="text-app-grey-light">{bounty.meta}</span>
                                            </div>
                                            <Text as="p" className="mt-2 text-base font-bold text-app-dark-purple">{bounty.title}</Text>
                                            <Text as="p" className="mt-1 text-xs text-app-grey-light">
                                                Deadline: {bounty.deadline} • {bounty.daysLeft}
                                            </Text>
                                        </div>
                                        <div className="text-right">
                                            <Text as="p" className="text-lg font-bold text-app-dark-purple">{bounty.reward}</Text>
                                            <AppButton variant="outline" className="mt-2 h-8 px-3 text-xs">
                                                {bounty.actionLabel}
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
                    {hasSubmissions ? (
                        <div className="mt-4 flex flex-col gap-4">
                            {submissions.map((submission) => (
                                <div key={submission.title} className="rounded-xl border border-gray-100 p-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="size-7 shrink-0 rounded-full bg-gray-200" />
                                            <Text as="p" className="text-xs font-semibold text-app-dark-purple">{submission.submitter}</Text>
                                        </div>
                                        <span className="text-[11px] text-app-grey-light">{submission.submittedAgo}</span>
                                    </div>
                                    <Text as="p" className="mt-2 text-sm font-bold text-app-dark-purple">{submission.title}</Text>
                                    <Text as="p" className="mt-1 text-xs text-app-grey-light">{submission.description}</Text>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-sm font-bold text-app-dark-purple">{submission.reward}</span>
                                        <AppButton variant="primary" className="h-8 px-3 text-xs">
                                            Review Code
                                        </AppButton>
                                    </div>
                                </div>
                            ))}
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
