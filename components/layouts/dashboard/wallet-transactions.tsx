"use client";

import { useState } from "react";
import { Copy, ExternalLink, Search } from "lucide-react";
import { AppInput } from "@/components/reuseables/app-input";
import { AppButton } from "@/components/reuseables/app-button";
import { ConnectWalletModal } from "@/components/reuseables/connect-wallet-modal";
import { Spinner } from "@/components/ui/spinner";
import { TransactionStatusModal } from "@/components/reuseables/transaction-status-modal";
import { useCurrentUser } from "@/hooks/use-auth";
import { useContributorDashboard, usePosterDashboard } from "@/hooks/use-dashboard";
import { useWalletTransactions, type WalletTransaction } from "@/hooks/use-transactions";
import type { TransactionStatus, TransactionType } from "@/lib/api/types";
import { cn } from "cn";
import { Text } from "@/components/reuseables/text";

const typeLabels: Record<TransactionType, string> = {
    FUND_ESCROW: "Funded Escrow",
    RELEASE_PAYMENT: "Escrow Release",
    REFUND: "Escrow Refund",
};

const typeStyles: Record<TransactionType, string> = {
    RELEASE_PAYMENT: "bg-app-light-primary text-app-primary",
    FUND_ESCROW: "bg-gray-100 text-gray-700",
    REFUND: "bg-amber-50 text-amber-600",
};

const statusLabels: Record<TransactionStatus, string> = {
    SUCCESS: "Success",
    PENDING: "Pending",
    FAILED: "Failed",
};

const statusStyles: Record<TransactionStatus, string> = {
    SUCCESS: "bg-app-green/10 text-app-green",
    PENDING: "bg-amber-50 text-amber-600",
    FAILED: "bg-app-red/10 text-app-red",
};

const typeFilters: (TransactionType | "All Types")[] = ["All Types", "FUND_ESCROW", "RELEASE_PAYMENT", "REFUND"];
const statusFilters: (TransactionStatus | "All Statuses")[] = ["All Statuses", "SUCCESS", "PENDING", "FAILED"];

function truncateAddress(address: string) {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

const WalletTransactions = () => {
    const { data: user } = useCurrentUser();
    const contributorDashboard = useContributorDashboard();
    const posterDashboard = usePosterDashboard();
    const { transactions, isLoading, isError } = useWalletTransactions();

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState<(typeof typeFilters)[number]>("All Types");
    const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>("All Statuses");
    const [selectedTx, setSelectedTx] = useState<WalletTransaction | null>(null);

    const isPoster = user?.role === "POSTER";
    const stats = isPoster
        ? [
              { label: "Total Spent", value: posterDashboard.data ? `${Number(posterDashboard.data.total_spent).toLocaleString()}` : "—", note: "Poster Lock Costs" },
              { label: "Active Bounties", value: posterDashboard.data ? `${posterDashboard.data.active_bounties.length}` : "—", note: "Currently Live" },
              { label: "Pending Reviews", value: posterDashboard.data ? `${posterDashboard.data.pending_reviews.length}` : "—", note: "Awaiting Decision" },
              { label: "Completed", value: posterDashboard.data ? `${posterDashboard.data.completed_bounties.length}` : "—", note: "Fully Paid Out" },
          ]
        : [
              { label: "Total Earned", value: contributorDashboard.data ? `${Number(contributorDashboard.data.total_earned).toLocaleString()}` : "—", note: "Soroban Rewards" },
              { label: "Active Claims", value: contributorDashboard.data ? `${contributorDashboard.data.active_claims.length}` : "—", note: "In Progress" },
              { label: "Awaiting Review", value: contributorDashboard.data ? `${contributorDashboard.data.submitted.length}` : "—", note: "Submitted Work" },
              { label: "Completed", value: contributorDashboard.data ? `${contributorDashboard.data.completed.length}` : "—", note: "Approved & Paid" },
          ];

    const filtered = transactions.filter((tx) => {
        const matchesSearch = tx.bountyTitle.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter === "All Types" || tx.tx_type === typeFilter;
        const matchesStatus = statusFilter === "All Statuses" || tx.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
    });

    const clearFilters = () => {
        setSearch("");
        setTypeFilter("All Types");
        setStatusFilter("All Statuses");
    };

    return (
        <div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                    {user?.wallet_address ? (
                        <div className="flex items-center gap-2">
                            <Text as="h1" className="text-2xl font-bold text-app-dark-purple">
                                {truncateAddress(user.wallet_address)}
                            </Text>
                            <button
                                type="button"
                                onClick={() => navigator.clipboard.writeText(user.wallet_address)}
                                className="text-app-grey-light hover:text-app-primary"
                            >
                                <Copy className="size-4" />
                            </button>
                        </div>
                    ) : (
                        <ConnectWalletModal
                            trigger={<AppButton variant="primary" className="h-9 px-4 text-xs">Connect Wallet</AppButton>}
                        />
                    )}
                    <Text as="p" className="mt-1 text-sm text-app-grey-light">Connected on Stellar Testnet Network</Text>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-gray-100 p-5">
                        <Text as="p" className="text-xs text-app-grey-light">{stat.label}</Text>
                        <Text as="p" className="mt-1 text-xl font-bold text-app-dark-purple">{stat.value}</Text>
                        <Text as="p" className="mt-1 text-xs text-app-grey-light">{stat.note}</Text>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <AppInput
                    icon={<Search className="size-4" />}
                    placeholder="Search transactions..."
                    value={search}
                    onValueChange={setSearch}
                    className="sm:max-w-xs"
                />
                <select
                    value={typeFilter}
                    onChange={(event) => setTypeFilter(event.target.value as (typeof typeFilters)[number])}
                    className="h-10 rounded-[6px] border border-app-light-primary bg-white px-3 text-sm text-app-dark-purple outline-none focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                >
                    {typeFilters.map((option) => (
                        <option key={option} value={option}>
                            {option === "All Types" ? option : typeLabels[option]}
                        </option>
                    ))}
                </select>
                <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as (typeof statusFilters)[number])}
                    className="h-10 rounded-[6px] border border-app-light-primary bg-white px-3 text-sm text-app-dark-purple outline-none focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                >
                    {statusFilters.map((option) => (
                        <option key={option} value={option}>
                            {option === "All Statuses" ? option : statusLabels[option]}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-medium text-app-primary hover:underline sm:ml-auto"
                >
                    Clear Filters
                </button>
            </div>

            {isLoading && (
                <div className="mt-6 flex items-center justify-center py-16">
                    <Spinner className="size-6 text-app-primary" />
                </div>
            )}

            {isError && (
                <div className="mt-6 rounded-2xl border border-gray-100 py-16 text-center text-sm text-app-red">
                    Couldn&apos;t load your transactions right now. Please try again shortly.
                </div>
            )}

            {!isLoading && !isError && (
                <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-100">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 text-xs text-app-grey-light">
                                <th className="px-4 py-3 font-medium">Date</th>
                                <th className="px-4 py-3 font-medium">Type</th>
                                <th className="px-4 py-3 font-medium">Bounty Title</th>
                                <th className="px-4 py-3 font-medium">Amount</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Explorer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((tx) => {
                                const isIncoming = tx.to_address === user?.wallet_address;
                                return (
                                    <tr key={tx.id} className="border-b border-gray-100 last:border-b-0">
                                        <td className="px-4 py-3 whitespace-nowrap text-app-grey-light">
                                            {new Date(tx.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", typeStyles[tx.tx_type])}>
                                                {typeLabels[tx.tx_type]}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-app-dark-purple">{tx.bountyTitle}</td>
                                        <td
                                            className={cn(
                                                "px-4 py-3 font-semibold whitespace-nowrap",
                                                isIncoming ? "text-app-green" : "text-app-dark-purple"
                                            )}
                                        >
                                            {isIncoming ? "+" : "-"}
                                            {Number(tx.amount).toLocaleString()} {tx.asset}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", statusStyles[tx.status])}>
                                                {statusLabels[tx.status]}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedTx(tx)}
                                                className="inline-flex items-center gap-1 text-xs font-medium text-app-primary hover:underline"
                                            >
                                                View Transaction <ExternalLink className="size-3" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-sm text-app-grey-light">
                                        No transactions match your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedTx && (
                <TransactionStatusModal
                    open={Boolean(selectedTx)}
                    onOpenChange={(open) => !open && setSelectedTx(null)}
                    status={selectedTx.status === "SUCCESS" ? "success" : selectedTx.status === "PENDING" ? "pending" : "failed"}
                    title={
                        selectedTx.status === "SUCCESS"
                            ? "Transaction Successful"
                            : selectedTx.status === "PENDING"
                              ? "Transaction Pending"
                              : "Transaction Failed"
                    }
                    description={
                        selectedTx.status === "SUCCESS"
                            ? `${Number(selectedTx.amount).toLocaleString()} ${selectedTx.asset} was successfully transferred on the Stellar Soroban escrow contract for "${selectedTx.bountyTitle}".`
                            : selectedTx.status === "PENDING"
                              ? "This transaction is still being confirmed on the Stellar Testnet ledger."
                              : "This transaction could not be completed on the Stellar ledger."
                    }
                    hash={selectedTx.tx_hash}
                    explorerHref={selectedTx.explorer_url || undefined}
                />
            )}
        </div>
    );
};

export default WalletTransactions;

