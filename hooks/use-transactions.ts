"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { listBountyTransactions } from "@/lib/api/transactions";
import { getBounty } from "@/lib/api/bounties";
import { bountyKeys } from "@/hooks/use-bounties";
import { useCurrentUser } from "@/hooks/use-auth";
import { useContributorDashboard, usePosterDashboard } from "@/hooks/use-dashboard";
import type { BountyTransaction, TransactionListParams } from "@/lib/api/types";

export const transactionKeys = {
    list: (bountyId: string, params?: TransactionListParams) =>
        ["transactions", bountyId, params ?? {}] as const,
};

export function useBountyTransactions(bountyId: string, params: TransactionListParams = {}) {
    return useQuery({
        queryKey: transactionKeys.list(bountyId, params),
        queryFn: () => listBountyTransactions(bountyId, params),
        enabled: Boolean(bountyId),
    });
}

export type WalletTransaction = BountyTransaction & { bountyTitle: string };

/** Aggregates the real per-bounty transaction history across every bounty the user is involved in. */
export function useWalletTransactions() {
    const { data: user } = useCurrentUser();
    const isPoster = user?.role === "POSTER";

    const contributorDashboard = useContributorDashboard();
    const posterDashboard = usePosterDashboard();

    const bounties = isPoster
        ? [
              ...(posterDashboard.data?.active_bounties ?? []),
              ...(posterDashboard.data?.claimed_bounties ?? []),
              ...(posterDashboard.data?.pending_reviews ?? []),
              ...(posterDashboard.data?.completed_bounties ?? []),
          ]
        : [
              ...(contributorDashboard.data?.active_claims ?? []),
              ...(contributorDashboard.data?.submitted ?? []),
              ...(contributorDashboard.data?.completed ?? []),
          ];

    const uniqueBounties = Array.from(new Map(bounties.map((bounty) => [bounty.id, bounty])).values());

    const bountyQueries = useQueries({
        queries: uniqueBounties.map((bounty) => ({
            queryKey: bountyKeys.detail(bounty.id),
            queryFn: () => getBounty(bounty.id),
        })),
    });

    const dashboardQuery = isPoster ? posterDashboard : contributorDashboard;

    const transactions: WalletTransaction[] = bountyQueries
        .flatMap((query) => {
            const bounty = query.data;
            if (!bounty) return [];
            return bounty.transactions.map((tx) => ({ ...tx, bountyTitle: bounty.title }));
        })
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return {
        transactions,
        isLoading: dashboardQuery.isLoading || bountyQueries.some((query) => query.isLoading),
        isError: dashboardQuery.isError || bountyQueries.some((query) => query.isError),
    };
}
