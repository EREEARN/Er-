"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layouts/dashboard/app-sidebar";
import WalletAddressBadge from "@/components/reuseables/wallet-address-badge";
import { ConnectWalletModal } from "@/components/reuseables/connect-wallet-modal";
import { AppButton } from "@/components/reuseables/app-button";
import { useCurrentUser } from "@/hooks/use-auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: user, isLoading } = useCurrentUser();

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 md:px-6">
                    <SidebarTrigger className="md:hidden" />
                    {!isLoading && user && (
                        user.wallet_address ? (
                            <WalletAddressBadge address={user.wallet_address} className="ml-auto" />
                        ) : (
                            <ConnectWalletModal
                                trigger={
                                    <AppButton variant="primary" className="ml-auto h-8 px-4 text-xs">
                                        Connect Wallet
                                    </AppButton>
                                }
                            />
                        )
                    )}
                </div>
                <div className="p-6">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
