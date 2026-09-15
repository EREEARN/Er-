export type UserRole = "CONTRIBUTOR" | "POSTER";

export type UserProfile = {
    id: string;
    username: string;
    email: string;
    wallet_address: string;
    role: UserRole;
    bio: string;
    avatar_url: string;
    skills: string[] | null;
    date_joined: string;
    updated_at?: string;
};

export type SkillCategory =
    | "DEVELOPMENT"
    | "DESIGN"
    | "WRITING"
    | "VIDEO"
    | "PROJECT_MANAGEMENT"
    | "COMMUNITY";

export type RewardAsset = "XLM" | "USDC";

export type BountyStatus = "POSTED" | "CLAIMED" | "SUBMITTED" | "APPROVED" | "PAID" | "EXPIRED";

export type SubmissionStatus = "PENDING" | "APPROVED" | "REVISION_REQUESTED";

export type TransactionType = "FUND_ESCROW" | "RELEASE_PAYMENT" | "REFUND";

export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";

export type Submission = {
    id: string;
    bounty: string;
    contributor: UserProfile;
    submission_text: string;
    submission_url: string;
    reviewer_notes: string;
    status: SubmissionStatus;
    created_at: string;
    updated_at: string;
};

export type BountyTransaction = {
    id: string;
    bounty: string;
    tx_hash: string;
    tx_type: TransactionType;
    from_address: string;
    to_address: string;
    amount: string;
    asset: string;
    status: TransactionStatus;
    explorer_url: string;
    created_at: string;
};

export type Bounty = {
    id: string;
    poster: UserProfile;
    title: string;
    description: string;
    skill_category: SkillCategory;
    reward_amount: string;
    reward_asset: RewardAsset;
    deadline: string;
    status: BountyStatus;
    escrow_tx_hash: string;
    escrow_bounty_id: string;
    payment_tx_hash: string;
    contributor: UserProfile | null;
    submissions: Submission[];
    transactions: BountyTransaction[];
    is_expired: boolean;
    created_at: string;
    updated_at: string;
};

/** Slim bounty shape returned in list/dashboard endpoints (no submissions/transactions). */
export type BountySummary = {
    id: string;
    title: string;
    skill_category: SkillCategory;
    reward_amount: string;
    reward_asset: RewardAsset;
    deadline: string;
    status: BountyStatus;
    escrow_tx_hash: string;
    poster: UserProfile;
    contributor: UserProfile | null;
    is_expired: boolean;
    created_at: string;
};

export type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};

export type ContributorDashboard = {
    active_claims: BountySummary[];
    submitted: BountySummary[];
    completed: BountySummary[];
    total_earned: string;
};

export type PosterDashboard = {
    active_bounties: BountySummary[];
    claimed_bounties: BountySummary[];
    pending_reviews: BountySummary[];
    completed_bounties: BountySummary[];
    total_posted: number;
    total_spent: string;
};

export type AuthTokens = {
    access: string;
    refresh: string;
};

export type AuthChallengeResponse = {
    wallet_address: string;
    message: string;
    nonce: string;
};

export type AuthVerifyPayload = {
    wallet_address: string;
    signature: string;
    /** Only used for first-time login. Defaults to "CONTRIBUTOR" server-side. */
    role?: UserRole;
    /** Optional custom username for first-time login. */
    username?: string | null;
};

export type AuthSessionResponse = AuthTokens & {
    user: UserProfile;
    created: boolean;
};

export type AuthVerifyResponse = AuthSessionResponse;

export type LoginPayload = {
    email: string;
    password: string;
};

export type RegisterPayload = {
    email: string;
    username?: string;
    password: string;
    password_confirm?: string;
    role?: UserRole;
    skills?: string[];
    bio?: string;
    avatar_url?: string;
    wallet_address?: string | null;
};

export type UpdateProfilePayload = {
    username?: string;
    email?: string | null;
    wallet_address?: string | null;
    role?: UserRole;
    bio?: string;
    avatar_url?: string;
    skills?: string[];
};

export type BountyListParams = {
    ordering?: string;
    page?: number;
    reward_asset?: RewardAsset;
    search?: string;
    skill_category?: SkillCategory;
    status?: BountyStatus;
};

export type CreateBountyPayload = {
    title: string;
    description: string;
    skill_category: SkillCategory;
    reward_amount: string;
    reward_asset: RewardAsset;
    deadline: string;
    escrow_tx_hash?: string;
    signed_xdr?: string;
};

export type CreateBountyResponse = {
    title: string;
    description: string;
    skill_category: SkillCategory;
    reward_amount: string;
    reward_asset: RewardAsset;
    deadline: string;
    escrow_tx_hash: string;
};

export type PrepareFundResponse = {
    xdr: string;
    network_passphrase: string;
    [key: string]: unknown;
};

export type SubmitWorkPayload = {
    submission_text: string;
    submission_url: string;
};

export type ReviewSubmissionPayload = {
    action: "approve" | "request_revision";
    reviewer_notes?: string;
};

export type ReviewSubmissionResponse = {
    status: string;
    tx_hash?: string;
    [key: string]: unknown;
};

export type ExpireBountyResponse = {
    refund_tx_hash: string;
    [key: string]: unknown;
};

export type TransactionListParams = {
    ordering?: string;
    page?: number;
    search?: string;
};
