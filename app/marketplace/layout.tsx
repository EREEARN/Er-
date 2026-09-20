import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bounty Marketplace",
    description:
        "Browse fully-funded technical and creative bounties across development, design, writing, video, and more.",
    alternates: { canonical: "/marketplace" },
    openGraph: {
        url: "/marketplace",
        title: "Bounty Marketplace | EreEarn",
        description:
            "Browse fully-funded technical and creative bounties across development, design, writing, video, and more.",
    },
};

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
