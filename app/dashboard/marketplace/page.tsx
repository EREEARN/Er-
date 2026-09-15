"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { AppInput } from "@/components/reuseables/app-input";
import { FilterChip } from "@/components/reuseables/filter-chip";
import { MarketplaceBountyCard } from "@/components/reuseables/marketplace-bounty-card";
import { Pagination } from "@/components/reuseables/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/reuseables/empty-state";
import { Text } from "@/components/reuseables/text";
import { useBounties } from "@/hooks/use-bounties";
import { mapApiBountyToLocal } from "@/lib/api/mappers";
import type { BountyStatus, SkillCategory } from "@/lib/api/types";

const categoryOptions: { label: string; value: SkillCategory }[] = [
    { label: "Development", value: "DEVELOPMENT" },
    { label: "Design", value: "DESIGN" },
    { label: "Writing", value: "WRITING" },
    { label: "Video Creation", value: "VIDEO" },
    { label: "Project Management", value: "PROJECT_MANAGEMENT" },
    { label: "Community", value: "COMMUNITY" },
];

const statusOptions: { label: string; value: BountyStatus }[] = [
    { label: "Open", value: "POSTED" },
    { label: "Claimed", value: "CLAIMED" },
    { label: "Submitted", value: "SUBMITTED" },
    { label: "Approved", value: "APPROVED" },
    { label: "Paid", value: "PAID" },
    { label: "Expired", value: "EXPIRED" },
];

const sortOptions = [
    { label: "Newest", value: "-created_at" },
    { label: "Highest Reward", value: "-reward_amount" },
    { label: "Ending Soon", value: "deadline" },
];

export default function DashboardMarketplacePage() {
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState<SkillCategory | null>(null);
    const [status, setStatus] = useState<BountyStatus | null>(null);
    const [sort, setSort] = useState(sortOptions[0].value);

    const { data, isLoading, isError } = useBounties({
        page,
        skill_category: category ?? undefined,
        status: status ?? undefined,
        ordering: sort,
    });
    const bounties = data?.results.map(mapApiBountyToLocal) ?? [];

    const clearFilters = () => {
        setCategory(null);
        setStatus(null);
    };

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
                <AppInput
                    icon={<Search className="size-4" />}
                    placeholder="Search open tasks, skills, technologies..."
                    className="h-12 rounded-full"
                />

                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="text-sm text-app-grey-light">Active filters:</span>
                    {category && (
                        <FilterChip
                            label={categoryOptions.find((option) => option.value === category)?.label ?? category}
                            selected
                            onRemove={() => setCategory(null)}
                        />
                    )}
                    {status && (
                        <FilterChip
                            label={statusOptions.find((option) => option.value === status)?.label ?? status}
                            onRemove={() => setStatus(null)}
                        />
                    )}
                    <span className="ml-1 text-sm text-app-grey-light">Showing {data?.count ?? 0} bounties</span>
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
                                href={`/dashboard/marketplace/${bounty.id}`}
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
                        description="Try adjusting your filters to find more opportunities."
                    />
                )}

                {!isLoading && !isError && bounties.length > 0 && (
                    <Pagination currentPage={page} totalPages={Math.max(1, Math.ceil((data?.count ?? 0) / (bounties.length || 1)))} onPageChange={setPage} className="mt-10" />
                )}
            </div>

            <div className="rounded-2xl border border-gray-100 p-6 md:self-start">
                <div className="flex items-center justify-between">
                    <Text as="h2" className="text-sm font-bold text-app-dark-purple">Filters</Text>
                    <button type="button" onClick={clearFilters} className="text-xs font-medium text-app-primary hover:underline">
                        Clear all
                    </button>
                </div>

                <div className="mt-5">
                    <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Categories</Text>
                    <div className="mt-3 flex flex-col gap-2.5">
                        {categoryOptions.map((option) => (
                            <label key={option.value} className="flex items-center gap-2 text-sm text-app-dark-purple">
                                <input
                                    type="checkbox"
                                    checked={category === option.value}
                                    onChange={() => setCategory(category === option.value ? null : option.value)}
                                    className="size-4 rounded border-gray-300 accent-app-primary"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-5">
                    <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Bounty Status</Text>
                    <div className="mt-3 flex flex-col gap-2.5">
                        {statusOptions.map((option) => (
                            <label key={option.value} className="flex items-center gap-2 text-sm text-app-dark-purple">
                                <input
                                    type="checkbox"
                                    checked={status === option.value}
                                    onChange={() => setStatus(status === option.value ? null : option.value)}
                                    className="size-4 rounded border-gray-300 accent-app-primary"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-5">
                    <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Sort By</Text>
                    <div className="mt-3 flex flex-col gap-2.5">
                        {sortOptions.map((option) => (
                            <label key={option.value} className="flex items-center gap-2 text-sm text-app-dark-purple">
                                <input
                                    type="radio"
                                    name="sort"
                                    checked={sort === option.value}
                                    onChange={() => setSort(option.value)}
                                    className="size-4 border-gray-300 accent-app-primary"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
