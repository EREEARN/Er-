"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import NavBar from "@/components/layouts/landing/nav-bar";
import { AppInput } from "@/components/reuseables/app-input";
import { FilterChip } from "@/components/reuseables/filter-chip";
import { MarketplaceBountyCard } from "@/components/reuseables/marketplace-bounty-card";
import { Pagination } from "@/components/reuseables/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/reuseables/empty-state";
import Footer from "@/components/layouts/landing/footer";
import { cn } from "cn";
import { useBounties } from "@/hooks/use-bounties";
import { mapApiBountyToLocal } from "@/lib/api/mappers";
import type { SkillCategory } from "@/lib/api/types";

const categoryOptions: { label: string; value: SkillCategory }[] = [
    { label: "Development", value: "DEVELOPMENT" },
    { label: "Design", value: "DESIGN" },
    { label: "Writing", value: "WRITING" },
    { label: "Video", value: "VIDEO" },
    { label: "Project Management", value: "PROJECT_MANAGEMENT" },
    { label: "Community", value: "COMMUNITY" },
];

export default function MarketplacePage() {
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState<SkillCategory | null>(null);
    const { data, isLoading, isError } = useBounties({ page, skill_category: category ?? undefined });
    const bounties = data?.results.map(mapApiBountyToLocal) ?? [];
    const totalPages = data ? Math.max(1, Math.ceil(data.count / bounties.length || 1)) : 1;

    return (
        <div>
            <NavBar />
            <main className="mx-auto max-w-[1200px] px-6 py-8">
                <AppInput
                    icon={<Search className="size-4" />}
                    placeholder="Search open tasks, skills, technologies..."
                    className="h-12 rounded-full"
                />

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    {categoryOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                setCategory(category === option.value ? null : option.value);
                                setPage(1);
                            }}
                            className={cn(
                                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                                category === option.value
                                    ? "border-app-primary bg-app-light-primary text-app-primary"
                                    : "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-app-grey-light">
                    {category && (
                        <>
                            <span>Active filters:</span>
                            <FilterChip
                                label={categoryOptions.find((option) => option.value === category)?.label ?? category}
                                selected
                                onRemove={() => setCategory(null)}
                            />
                        </>
                    )}
                    <span className="ml-1">Showing {data?.count ?? 0} bounties</span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {isLoading &&
                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="rounded-2xl border border-gray-100 p-5">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-5 w-16 rounded-full" />
                                    <Skeleton className="h-4 flex-1" />
                                </div>
                                <Skeleton className="mt-4 h-4 w-2/3" />
                                <div className="mt-5 flex items-center justify-between">
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-8 w-28 rounded-lg" />
                                </div>
                            </div>
                        ))}

                    {!isLoading &&
                        !isError &&
                        bounties.map((bounty) => (
                            <MarketplaceBountyCard
                                key={bounty.id}
                                status={bounty.status}
                                daysLeft={bounty.daysLeft}
                                title={bounty.title}
                                tags={bounty.tags}
                                reward={bounty.reward}
                                href={`/marketplace/${bounty.id}`}
                            />
                        ))}
                </div>

                {isError && (
                    <EmptyState
                        icon={<Search className="size-6" />}
                        title="Couldn't load bounties"
                        description="We couldn't reach the marketplace right now. Please try again shortly."
                    />
                )}

                {!isLoading && !isError && bounties.length === 0 && (
                    <EmptyState
                        icon={<Search className="size-6" />}
                        title="No bounties found"
                        description="There are no open bounties matching your search right now."
                    />
                )}

                {!isLoading && !isError && bounties.length > 0 && (
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} className="mt-10" />
                )}
            </main>
            <Footer/>
        </div>
    );
}
