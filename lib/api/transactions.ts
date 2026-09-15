import { apiClient } from "@/lib/api/client";
import type { BountyTransaction, PaginatedResponse, TransactionListParams } from "@/lib/api/types";

export async function listBountyTransactions(bountyId: string, params: TransactionListParams = {}) {
    const { data } = await apiClient.get<PaginatedResponse<BountyTransaction>>(
        `/api/v1/transactions/${bountyId}/`,
        { params }
    );
    return data;
}
