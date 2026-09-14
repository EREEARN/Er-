"use client";

import { useState } from "react";
import type { ElementType } from "react";
import { CircleCheck, FileText, TriangleAlert, User } from "lucide-react";
import { cn } from "cn";
import { Text } from "@/components/reuseables/text";

type Notification = {
    id: string;
    icon: ElementType;
    iconClassName: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    group: "Today" | "Earlier";
};

const initialNotifications: Notification[] = [
    {
        id: "1",
        icon: FileText,
        iconClassName: "bg-app-light-primary text-app-primary",
        title: "New submission on Soroban Escrow Contract",
        description: "RustExpert S...2M4N submitted proof of work for review",
        time: "2 min ago",
        read: false,
        group: "Today",
    },
    {
        id: "2",
        icon: User,
        iconClassName: "bg-app-light-primary text-app-primary",
        title: "Your bounty has been claimed by alex.stellar",
        description: "Soroban Multi-Sig Escrow contract gained a new candidate",
        time: "1 hour ago",
        read: false,
        group: "Today",
    },
    {
        id: "3",
        icon: CircleCheck,
        iconClassName: "bg-app-green/10 text-app-green",
        title: "Payment of 500 XLM received",
        description: "System automatically processed payout for 'Design UI Dashboard'",
        time: "Yesterday",
        read: true,
        group: "Earlier",
    },
    {
        id: "4",
        icon: TriangleAlert,
        iconClassName: "bg-app-red/10 text-app-red",
        title: "Revision requested on UI Dashboard",
        description: "Poster requested adjustments on visual specs of step 3",
        time: "2 days ago",
        read: true,
        group: "Earlier",
    },
];

const groups: Notification["group"][] = ["Today", "Earlier"];

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState(initialNotifications);

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    };

    return (
        <div className="rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <Text as="h1" className="text-lg font-bold text-app-dark-purple">Notifications</Text>
                    <Text as="p" className="mt-1 text-sm text-app-grey-light">
                        Keep track of submissions, review alerts, and wallet transfers.
                    </Text>
                </div>
                <button
                    type="button"
                    onClick={markAllAsRead}
                    className="shrink-0 text-sm font-medium text-app-primary hover:underline"
                >
                    Mark all as read
                </button>
            </div>

            {groups.map((group) => {
                const items = notifications.filter((item) => item.group === group);
                if (items.length === 0) return null;
                return (
                    <div key={group} className="mt-5">
                        <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">{group}</Text>
                        <div className="mt-2 flex flex-col gap-2">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className={cn("flex items-start gap-3 rounded-xl p-3", !item.read && "bg-app-light-primary/40")}
                                >
                                    <span
                                        className={cn(
                                            "flex size-8 shrink-0 items-center justify-center rounded-full",
                                            item.iconClassName
                                        )}
                                    >
                                        <item.icon className="size-4" />
                                    </span>
                                    <div className="flex-1">
                                        <Text as="p" className="text-sm font-semibold text-app-dark-purple">{item.title}</Text>
                                        <Text as="p" className="text-xs text-app-grey-light">{item.description}</Text>
                                    </div>
                                    <span className="shrink-0 text-xs text-app-grey-light">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default NotificationsPage;
