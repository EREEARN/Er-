"use client";

import { useQuery } from "@tanstack/react-query";
import { listBountyTransactions } from "@/lib/api/transactions";
import type { TransactionListParams } from "@/lib/api/types";

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
