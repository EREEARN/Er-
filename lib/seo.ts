export const SITE_URL = "https://www.ereearn.com";
export const SITE_NAME = "EreEarn";
export const DEFAULT_TITLE = "EreEarn - Complete Work and Get Paid";
export const DEFAULT_DESCRIPTION =
    "Find fully-funded technical and creative bounties. Work from anywhere, complete milestone submissions, and receive automatic payouts backed by Stellar smart-contracts.";
export const DEFAULT_KEYWORDS = [
    "bounties",
    "freelance work",
    "earn crypto",
    "Stellar smart contracts",
    "escrow payments",
    "remote work",
    "developer bounties",
    "design bounties",
];

export function absoluteUrl(path = "/") {
    return new URL(path, SITE_URL).toString();
}
