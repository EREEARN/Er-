import type { Bounty as ApiBounty, BountySummary } from "@/lib/api/types";
import type { Bounty as LocalBounty } from "@/lib/bounties";

const STATUS_LABELS: Record<string, string> = {
    POSTED: "Open",
    CLAIMED: "Claimed",
    SUBMITTED: "Submitted",
    APPROVED: "Approved",
    PAID: "Paid",
    EXPIRED: "Expired",
};

function formatStatus(status: string) {
    return STATUS_LABELS[status] ?? status;
}

function formatSkillCategory(category: string) {
    return category
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function formatDaysLeft(deadline: string) {
    const diffMs = new Date(deadline).getTime() - Date.now();
    if (diffMs <= 0) return "Expired";
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return days <= 1 ? "1 day left" : `${days} days left`;
}

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatRelativeTime(value: string) {
    const diffMs = Date.now() - new Date(value).getTime();
    const minutes = Math.round(diffMs / 60000);
    if (minutes < 60) return `Posted ${Math.max(minutes, 1)} minute${minutes === 1 ? "" : "s"} ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `Posted ${hours} hour${hours === 1 ? "" : "s"} ago`;
    const days = Math.round(hours / 24);
    return `Posted ${days} day${days === 1 ? "" : "s"} ago`;
}

function truncateAddress(address: string | undefined) {
    if (!address) return "Unknown Poster";
    if (address.length <= 12) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

/** Adapts the backend's Bounty/BountySummary schema into the richer shape the UI components expect. */
export function mapApiBountyToLocal(bounty: ApiBounty | BountySummary): LocalBounty {
    const description = "description" in bounty && bounty.description ? [bounty.description] : [];
    const postedAgo = "created_at" in bounty ? formatRelativeTime(bounty.created_at) : "";
    const sorobanAddress =
        ("escrow_bounty_id" in bounty && bounty.escrow_bounty_id) || bounty.escrow_tx_hash || "Not yet funded";

    return {
        id: bounty.id,
        status: formatStatus(bounty.status),
        daysLeft: formatDaysLeft(bounty.deadline),
        title: bounty.title,
        tags: [formatSkillCategory(bounty.skill_category)],
        reward: `${Number(bounty.reward_amount).toLocaleString()} ${bounty.reward_asset}`,
        rewardUsd: "Secured in Stellar smart escrow",
        poster: truncateAddress(bounty.poster?.wallet_address),
        postedAgo,
        deadline: formatDate(bounty.deadline),
        assetType: bounty.reward_asset === "XLM" ? "Native XLM" : "USDC (Stellar Fiat)",
        contractState: bounty.escrow_tx_hash ? "Locked" : "Pending Funding",
        description,
        requirements: [],
        deliverables: [],
        sorobanAddress,
    };
}
