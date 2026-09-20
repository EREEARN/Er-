import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${SITE_NAME} - Complete Work and Get Paid`,
        short_name: SITE_NAME,
        description:
            "Find fully-funded technical and creative bounties, complete milestone submissions, and receive automatic payouts backed by Stellar smart-contracts.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4F46E5",
        icons: [
            {
                src: "/icon",
                sizes: "32x32",
                type: "image/png",
            },
            {
                src: "/apple-icon",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}
