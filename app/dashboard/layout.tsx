import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layouts/dashboard/app-sidebar";
import WalletAddressBadge from "@/components/reuseables/wallet-address-badge";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 md:px-6">
                    <SidebarTrigger className="md:hidden" />
                    <WalletAddressBadge address="GD7X...4E63" className="ml-auto" />
                </div>
                <div className="p-6">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
