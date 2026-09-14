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
import { Text } from "@/components/reuseables/text";

const tabs = ["Active Bounties", "Submitted", "Completed", "Earnings"];

const activityItems = [
    { dotColor: "bg-app-green", text: "Bounty Approved & Paid (1,200 XLM)", time: "2 hours ago" },
    { dotColor: "bg-amber-500", text: "Milestone Submitted for review", time: "Yesterday at 15:43" },
    { dotColor: "bg-app-primary", text: "Claimed 'Stellar Wallet Connector React Hook'", time: "3 days ago" },
];

const ContributorDashboard = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div>
            <DashboardTopBar eyebrow="Contributor Workspace" heading="Welcome back, Developer G...4E63" />

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                    <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                    {activeTab === "Active Bounties" ? (
                        <div className="mt-6 flex flex-col gap-6">
                            <BountyProgressCard
                                variant="progress"
                                status="In Progress"
                                meta="Claimed 3 days ago"
                                note="4 days left"
                                title="Build Stellar Wallet Connector React Hook"
                                description="Create an optimized, easily extensible custom React hook to manage freighter and..."
                                progressLabel="Progress: Milestone 1 of 2 Complete"
                                progressPercent={50}
                                rewardLabel="Milestone Reward"
                                reward="1,200 XLM"
                                action={
                                    <AppButton variant="primary" render={<Link href="/dashboard/workspace/build-stellar-wallet-connector-react-hook" />}>
                                        Go to Workspace
                                    </AppButton>
                                }
                            />

                            <BountyProgressCard
                                variant="review"
                                status="In Review"
                                meta="Submitted 1 day ago"
                                note="Awaiting Poster Review"
                                title="Soroban Multi-Sig Escrow Contract Implementation"
                                description="We require a reference multi-signature escrow smart contract implementation buil..."
                                progressLabel="Submission Pending Approval"
                                progressPercent={90}
                                rewardLabel="Guaranteed Reward"
                                reward="3,500 XLM"
                                action={
                                    <AppButton variant="outline" render={<Link href="/marketplace/implement-soroban-multi-sig-escrow-contract" />}>
                                        View Submission
                                    </AppButton>
                                }
                            />

                            <div className="rounded-2xl border border-app-primary/20 bg-app-light-primary/40 p-5">
                                <Text as="p" className="text-sm font-bold text-app-primary">How to submit your work</Text>
                                <Text as="p" className="mt-2 text-sm text-app-dark-purple/80">
                                    When you are ready to deliver, click &apos;Go to Workspace&apos;. You can upload the GitHub repository URL, verify tests, and run the Soroban deployment target directly from the developer console to prove on-chain compliance.
                                </Text>
                            </div>
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
                                <span className="font-semibold text-app-dark-purple">4,700 XLM</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-app-grey-light">Pending Approval</span>
                                <span className="font-semibold text-amber-600">3,500 XLM</span>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                            <span className="text-sm text-app-grey-light">Available to Withdraw</span>
                            <span className="text-base font-bold text-app-green">1,200 XLM</span>
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
