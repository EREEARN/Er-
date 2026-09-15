"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    claimBounty,
    createBounty,
    expireBounty,
    getBounty,
    listBounties,
    prepareFundBounty,
    reviewBountySubmission,
    submitBountyWork,
} from "@/lib/api/bounties";
import { dashboardKeys } from "@/hooks/use-dashboard";
import type {
    BountyListParams,
    CreateBountyPayload,
    ReviewSubmissionPayload,
    SubmitWorkPayload,
} from "@/lib/api/types";

export const bountyKeys = {
    list: (params?: BountyListParams) => ["bounties", "list", params ?? {}] as const,
    detail: (id: string) => ["bounties", "detail", id] as const,
};

export function useBounties(params: BountyListParams = {}) {
    return useQuery({
        queryKey: bountyKeys.list(params),
        queryFn: () => listBounties(params),
    });
}

export function useBounty(id: string) {
    return useQuery({
        queryKey: bountyKeys.detail(id),
        queryFn: () => getBounty(id),
        enabled: Boolean(id),
    });
}

export function useCreateBounty() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateBountyPayload) => createBounty(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bounties", "list"] });
            queryClient.invalidateQueries({ queryKey: dashboardKeys.poster });
        },
    });
}

export function usePrepareFundBounty() {
    return useMutation({
        mutationFn: (payload: CreateBountyPayload) => prepareFundBounty(payload),
    });
}

export function useClaimBounty() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => claimBounty(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(bountyKeys.detail(id), data);
            queryClient.invalidateQueries({ queryKey: ["bounties", "list"] });
            queryClient.invalidateQueries({ queryKey: dashboardKeys.contributor });
        },
    });
}

export function useExpireBounty() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => expireBounty(id),
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ queryKey: bountyKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: ["bounties", "list"] });
        },
    });
}

export function useSubmitBountyWork(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: SubmitWorkPayload) => submitBountyWork(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: bountyKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: dashboardKeys.contributor });
        },
    });
}

export function useReviewBountySubmission(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ReviewSubmissionPayload) => reviewBountySubmission(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: bountyKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: dashboardKeys.poster });
        },
    });
}
