"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    LayoutDashboard,
    Store,
    Briefcase,
    Wallet,
    Receipt,
    User,
    Settings,
    Bell,
    CircleHelp,
} from "lucide-react";
import { AppImages } from "@/assets/app_images";
import { AppButton } from "@/components/reuseables/app-button";
import { useAppStore } from "@/lib/store";
import { cn } from "cn";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";

type NavLink = { label: string; href: string; icon: React.ElementType };

const getContributingLinks = (role: "contributor" | "poster"): NavLink[] => [
    { label: "Home", href: "/", icon: Home },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    role === "poster"
        ? { label: "My Bounties", href: "/dashboard/my-bounties", icon: Briefcase }
        : { label: "Marketplace", href: "/dashboard/marketplace", icon: Store },
    { label: "Wallet", href: "/dashboard/wallet", icon: Wallet },
    { label: "Transaction", href: "/dashboard/transactions", icon: Receipt },
];

const accountLinks = [
    { label: "Profile", href: "/dashboard/profile", icon: User },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
    { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { label: "Help & Docs", href: "/dashboard/help", icon: CircleHelp },
];

const AppSidebar = () => {
    const pathname = usePathname();
    const role = useAppStore((state) => state.role);
    const setRole = useAppStore((state) => state.setRole);
    const contributingLinks = getContributingLinks(role);

    const renderLink = (link: NavLink) => {
        const isActive = pathname === link.href;
        return (
            <SidebarMenuItem key={link.label}>
                <SidebarMenuButton
                    render={<Link href={link.href} />}
                    isActive={isActive}
                    className={cn(
                        "h-11 gap-3 rounded-xl px-3 text-sm font-medium text-gray-500 hover:bg-transparent hover:text-gray-500",
                        isActive && "bg-app-light-primary font-semibold text-app-primary hover:bg-app-light-primary hover:text-app-primary"
                    )}
                >
                    <span
                        className={cn(
                            "flex size-6 shrink-0 items-center justify-center",
                            isActive && "rounded-md bg-app-primary text-white"
                        )}
                    >
                        <link.icon className="size-4" />
                    </span>
                    <span>{link.label}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    };

    return (
        <Sidebar>
            <SidebarHeader className="px-3 py-4">
                <Image src={AppImages.logo} alt="EreEarn" width={110} height={52} className="h-auto w-[90px]" />
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{role === "poster" ? "Posting" : "Contributing"}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>{contributingLinks.map(renderLink)}</SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>{accountLinks.map(renderLink)}</SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="flex flex-col gap-3 p-3">
                <AppButton
                    variant="outline"
                    color="#111827"
                    render={<Link href="/dashboard/create-bounty" />}
                    className="w-full rounded-xl border-gray-200 py-3 font-semibold"
                >
                    Create a bounty
                </AppButton>

                <div className="flex rounded-xl bg-gray-100 p-1 text-xs font-medium">
                    <button
                        type="button"
                        onClick={() => setRole("contributor")}
                        className={cn(
                            "flex-1 rounded-lg py-1.5 transition-colors",
                            role === "contributor" ? "bg-white text-app-dark-purple shadow-sm" : "text-app-grey-light"
                        )}
                    >
                        Contributor
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole("poster")}
                        className={cn(
                            "flex-1 rounded-lg py-1.5 transition-colors",
                            role === "poster" ? "bg-white text-app-dark-purple shadow-sm" : "text-app-grey-light"
                        )}
                    >
                        Poster
                    </button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
