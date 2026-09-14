"use client";

import { useState } from "react";
import Link from "next/link";
import { AppButton } from "@/components/reuseables/app-button";
import { TabSwitcher } from "@/components/reuseables/tab-switcher";
import DashboardTopBar from "@/components/layouts/dashboard/dashboard-topbar";
import { cn } from "cn";
import { Text } from "@/components/reuseables/text";

const tabs = ["All", "Open", "Claimed", "Completed", "Expired"];

type BountyStatus = "Active" | "Open" | "Claimed" | "Completed" | "Expired";

type BountyRow = {
    status: BountyStatus;
    meta: string;
    title: string;
    deadline: string;
    daysLeft: string;
    reward: string;
    actionLabel: string;
};

const bounties: BountyRow[] = [
    {
        status: "Active",
        meta: "3 active claims",
        title: "Soroban Multi-Sig Escrow Smart Contract",
        deadline: "Mar 20, 2026",
        daysLeft: "12 days left",
        reward: "3,500 XLM",
        actionLabel: "Manage",
    },
    {
        status: "Open",
        meta: "Awaiting claims",
        title: "Design High-Fidelity Figma Landing Page",
        deadline: "Mar 15, 2026",
        daysLeft: "7 days left",
        reward: "1,200 XLM",
        actionLabel: "Manage",
    },
    {
        status: "Claimed",
        meta: "Claimed by G03A...9P",
        title: "Develop Stellar Wallet Connector Hook",
        deadline: "Mar 10, 2026",
        daysLeft: "2 days left",
        reward: "1,500 XLM",
        actionLabel: "Manage",
    },
    {
        status: "Completed",
        meta: "Paid to RustDev...7Y",
        title: "Write Rust SDK Soroban Examples",
        deadline: "Feb 28, 2026",
        daysLeft: "Finished",
        reward: "2,000 XLM",
        actionLabel: "View Work",
    },
    {
        status: "Expired",
        meta: "No claims resolved",
        title: "Bug Bounty: Fix Escrow Overflow Vulnerability",
        deadline: "Feb 15, 2026",
        daysLeft: "Expired",
        reward: "800 XLM",
        actionLabel: "Re-post",
    },
];

const statusStyles: Record<BountyStatus, string> = {
    Active: "bg-app-light-primary text-app-primary",
    Open: "bg-app-green/10 text-app-green",
    Claimed: "bg-amber-50 text-amber-600",
    Completed: "bg-app-green/10 text-app-green",
    Expired: "bg-app-red/10 text-app-red",
};

const dotStyles: Record<BountyStatus, string> = {
    Active: "bg-app-primary",
    Open: "bg-app-green",
    Claimed: "bg-amber-500",
    Completed: "bg-app-green",
    Expired: "bg-app-red",
};

const MyBounties = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const filteredBounties = bounties.filter((bounty) => {
        if (activeTab === "All") return true;
        if (activeTab === "Open") return bounty.status === "Open" || bounty.status === "Active";
        return bounty.status === activeTab;
    });

    return (
        <div>
            <DashboardTopBar
                eyebrow="Poster Workspace"
                heading="My Bounties"
                action={
                    <AppButton variant="primary" render={<Link href="/dashboard/create-bounty" />}>
                        + Create New Bounty
                    </AppButton>
                }
            />

            <div className="mt-8">
                <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="mt-6 flex flex-col gap-4">
                    {filteredBounties.map((bounty) => (
                        <div key={bounty.title} className="rounded-2xl border border-gray-100 p-5">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className={cn(
                                                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium",
                                                statusStyles[bounty.status]
                                            )}
                                        >
                                            <span className={cn("size-1.5 rounded-full", dotStyles[bounty.status])} />
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
            </div>
        </div>
    );
};

export default MyBounties;
