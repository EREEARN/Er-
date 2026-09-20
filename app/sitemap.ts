import type { MetadataRoute } from "next";
import { listBounties } from "@/lib/api/bounties";
import { SITE_URL } from "@/lib/seo";

const staticRoutes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
}> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/marketplace", changeFrequency: "hourly", priority: 0.9 },
    { path: "/login", changeFrequency: "yearly", priority: 0.3 },
    { path: "/signup", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: `${SITE_URL}${route.path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    // Bounty listing is public data; best-effort include it and fall back to static routes if the API is unreachable.
    try {
        const { results } = await listBounties({ page: 1 });
        for (const bounty of results) {
            entries.push({
                url: `${SITE_URL}/marketplace/${bounty.id}`,
                lastModified: bounty.deadline ? new Date(bounty.deadline) : now,
                changeFrequency: "daily",
                priority: 0.7,
            });
        }
    } catch {
        // ignore - sitemap still returns static routes
    }

    return entries;
}
