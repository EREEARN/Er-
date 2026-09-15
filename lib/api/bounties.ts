import { apiClient } from "@/lib/api/client";
import type {
    Bounty,
    BountyListParams,
    CreateBountyPayload,
    CreateBountyResponse,
    ExpireBountyResponse,
    PaginatedResponse,
    PrepareFundResponse,
    ReviewSubmissionPayload,
    ReviewSubmissionResponse,
    Submission,
    SubmitWorkPayload,
} from "@/lib/api/types";

export async function listBounties(params: BountyListParams = {}) {
    const { data } = await apiClient.get<PaginatedResponse<Bounty>>("/api/v1/bounties/", { params });
    return data;
}

export async function getBounty(id: string) {
    const { data } = await apiClient.get<Bounty>(`/api/v1/bounties/${id}/`);
    return data;
}

export async function createBounty(payload: CreateBountyPayload) {
    const { data } = await apiClient.post<CreateBountyResponse>("/api/v1/bounties/create/", payload);
    return data;
}

export async function prepareFundBounty(payload: CreateBountyPayload) {
    const { data } = await apiClient.post<PrepareFundResponse>("/api/v1/bounties/prepare-fund/", payload);
    return data;
}

export async function claimBounty(id: string) {
    const { data } = await apiClient.post<Bounty>(`/api/v1/bounties/${id}/claim/`);
    return data;
}

export async function expireBounty(id: string) {
    const { data } = await apiClient.post<ExpireBountyResponse>(`/api/v1/bounties/${id}/expire/`);
    return data;
}

export async function submitBountyWork(id: string, payload: SubmitWorkPayload) {
    const { data } = await apiClient.post<Submission>(`/api/v1/bounties/${id}/submit/`, payload);
    return data;
}

export async function reviewBountySubmission(id: string, payload: ReviewSubmissionPayload) {
    const { data } = await apiClient.post<ReviewSubmissionResponse>(`/api/v1/bounties/${id}/review/`, payload);
    return data;
}
