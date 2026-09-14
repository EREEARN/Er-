"use client";

import { useState } from "react";
import { Copy, ExternalLink, Search } from "lucide-react";
import { AppInput } from "@/components/reuseables/app-input";
import { TransactionStatusModal } from "@/components/reuseables/transaction-status-modal";
import { cn } from "cn";
import { Text } from "@/components/reuseables/text";

type TransactionType = "Escrow Release" | "Funded Escrow" | "Claimed Reward" | "Escrow Refund";
type TransactionStatus = "Success" | "Pending" | "Failed";

type Transaction = {
    date: string;
    type: TransactionType;
    title: string;
    amount: number;
    status: TransactionStatus;
    hash: string;
};

const transactions: Transaction[] = [
    { date: "Mar 08, 2026", type: "Escrow Release", title: "Build Stellar Wallet Connector Hook", amount: 1200, status: "Success", hash: "GD3F...18B2" },
    { date: "Mar 05, 2026", type: "Funded Escrow", title: "Setup Soroban Multi-Sig Escrow Contract", amount: -3500, status: "Success", hash: "GC8D...A9E3" },
    { date: "Mar 03, 2026", type: "Claimed Reward", title: "Design Landing Page for Stellar Asset", amount: 800, status: "Pending", hash: "tx_e0294e...9ba35c" },
    { date: "Feb 28, 2026", type: "Escrow Refund", title: "Fix Soroban CLI script template", amount: 500, status: "Failed", hash: "GD9K...4F7A" },
];

const typeStyles: Record<TransactionType, string> = {
    "Escrow Release": "bg-app-light-primary text-app-primary",
    "Funded Escrow": "bg-gray-100 text-gray-700",
    "Claimed Reward": "bg-amber-50 text-amber-600",
    "Escrow Refund": "bg-gray-100 text-gray-700",
};

const statusStyles: Record<TransactionStatus, string> = {
    Success: "bg-app-green/10 text-app-green",
    Pending: "bg-amber-50 text-amber-600",
    Failed: "bg-app-red/10 text-app-red",
};

const stats = [
    { label: "Total Earned", value: "4,700 XLM", note: "Soroban Rewards" },
    { label: "Total Spent", value: "0 XLM", note: "Poster Lock Costs" },
    { label: "Pending Review", value: "3,500 XLM", note: "Escrow Reserved" },
    { label: "In Active Escrow", value: "1,200 XLM", note: "Active Contract" },
];

const typeFilters = ["All Types", "Escrow Release", "Funded Escrow", "Claimed Reward", "Escrow Refund"];
const statusFilters = ["All Statuses", "Success", "Pending", "Failed"];

const WalletTransactions = () => {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [statusFilter, setStatusFilter] = useState("All Statuses");
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

    const filtered = transactions.filter((tx) => {
        const matchesSearch = tx.title.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter === "All Types" || tx.type === typeFilter;
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
                    <div className="flex items-center gap-2">
                        <Text as="h1" className="text-2xl font-bold text-app-dark-purple">GD7X...4E63</Text>
                        <button type="button" className="text-app-grey-light hover:text-app-primary">
                            <Copy className="size-4" />
                        </button>
                    </div>
                    <Text as="p" className="mt-1 text-sm text-app-grey-light">Freighter Wallet · Connected on Stellar Testnet Network</Text>
                </div>
                <div className="text-left sm:text-right">
                    <Text as="p" className="text-xs text-app-grey-light">Current Balance</Text>
                    <Text as="p" className="text-2xl font-bold text-app-primary">12,450.85 XLM</Text>
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
                    onChange={(event) => setTypeFilter(event.target.value)}
                    className="h-10 rounded-[6px] border border-app-light-primary bg-white px-3 text-sm text-app-dark-purple outline-none focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                >
                    {typeFilters.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="h-10 rounded-[6px] border border-app-light-primary bg-white px-3 text-sm text-app-dark-purple outline-none focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                >
                    {statusFilters.map((option) => (
                        <option key={option} value={option}>
                            {option}
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
                        {filtered.map((tx) => (
                            <tr key={`${tx.date}-${tx.title}`} className="border-b border-gray-100 last:border-b-0">
                                <td className="px-4 py-3 whitespace-nowrap text-app-grey-light">{tx.date}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", typeStyles[tx.type])}>
                                        {tx.type}
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-medium text-app-dark-purple">{tx.title}</td>
                                <td
                                    className={cn(
                                        "px-4 py-3 font-semibold whitespace-nowrap",
                                        tx.amount >= 0 ? "text-app-green" : "text-app-dark-purple"
                                    )}
                                >
                                    {tx.amount >= 0 ? "+" : ""}
                                    {tx.amount.toLocaleString()} XLM
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", statusStyles[tx.status])}>
                                        {tx.status}
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
                        ))}
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

            {selectedTx && (
                <TransactionStatusModal
                    open={Boolean(selectedTx)}
                    onOpenChange={(open) => !open && setSelectedTx(null)}
                    status={selectedTx.status === "Success" ? "success" : selectedTx.status === "Pending" ? "pending" : "failed"}
                    title={
                        selectedTx.status === "Success"
                            ? "Transaction Successful"
                            : selectedTx.status === "Pending"
                              ? "Transaction Pending"
                              : "Transaction Failed"
                    }
                    description={
                        selectedTx.status === "Success"
                            ? `Your payment of ${Math.abs(selectedTx.amount).toLocaleString()} XLM has been successfully released to the contributor's Stellar wallet. Thank you for completing your review.`
                            : selectedTx.status === "Pending"
                              ? "Your transaction is being processed on Stellar Testnet. We are locking the requested milestone funds in the smart escrow contract."
                              : "The transaction could not be completed. Account balance is insufficient to lock rewards. Funds remain in your wallet."
                    }
                    hash={selectedTx.hash}
                    estimatedTime={selectedTx.status === "Pending" ? "~5 seconds" : undefined}
                    reason={selectedTx.status === "Failed" ? "tx_insufficient_balance" : undefined}
                />
            )}
        </div>
    );
};

export default WalletTransactions;
