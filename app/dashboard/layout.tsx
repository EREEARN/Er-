import type { Metadata } from "next";
import DashboardShell from "@/components/layouts/dashboard/dashboard-shell";

export const metadata: Metadata = {
    title: { template: "%s | EreEarn Dashboard", default: "Dashboard" },
    robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <DashboardShell>{children}</DashboardShell>;
}

