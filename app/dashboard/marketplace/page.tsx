"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { AppInput } from "@/components/reuseables/app-input";
import { FilterChip } from "@/components/reuseables/filter-chip";
import { MarketplaceBountyCard } from "@/components/reuseables/marketplace-bounty-card";
import { Pagination } from "@/components/reuseables/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { bounties } from "@/lib/bounties";
import { Text } from "@/components/reuseables/text";

const categories = ["Development", "Design", "Content", "Research"];
const statuses = ["Open", "In Progress", "Closed", "Completed"];
const sortOptions = ["Newest", "Highest Reward", "Ending Soon"];

export default function DashboardMarketplacePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("Development");
    const [status, setStatus] = useState("Open");
    const [sort, setSort] = useState("Newest");

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
                {isLoading ? (
                    <Skeleton className="h-12 w-full rounded-full" />
                ) : (
                    <AppInput
                        icon={<Search className="size-4" />}
                        placeholder="Search open tasks, skills, technologies..."
                        className="h-12 rounded-full"
                    />
                )}

                <div className="mt-4 flex flex-wrap items-center gap-3">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-7 w-28 rounded-full" />
                            <Skeleton className="h-7 w-20 rounded-full" />
                        </>
                    ) : (
                        <>
                            <span className="text-sm text-app-grey-light">Active filters:</span>
                            <FilterChip label={category} selected />
                            <FilterChip label={status} />
                            <span className="ml-1 text-sm text-app-grey-light">Showing {bounties.length} bounties</span>
                        </>
                    )}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, index) => (
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
                          ))
                        : bounties.map((bounty) => (
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

                {!isLoading && (
                    <Pagination currentPage={page} totalPages={3} onPageChange={setPage} className="mt-10" />
                )}
            </div>

            <div className="rounded-2xl border border-gray-100 p-6 md:self-start">
                <div className="flex items-center justify-between">
                    <Text as="h2" className="text-sm font-bold text-app-dark-purple">Filters</Text>
                    <button type="button" className="text-xs font-medium text-app-primary hover:underline">
                        Clear all
                    </button>
                </div>

                <div className="mt-5">
                    <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Categories</Text>
                    <div className="mt-3 flex flex-col gap-2.5">
                        {categories.map((option) => (
                            <label key={option} className="flex items-center gap-2 text-sm text-app-dark-purple">
                                <input
                                    type="checkbox"
                                    checked={category === option}
                                    onChange={() => setCategory(option)}
                                    className="size-4 rounded border-gray-300 accent-app-primary"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-5">
                    <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Bounty Status</Text>
                    <div className="mt-3 flex flex-col gap-2.5">
                        {statuses.map((option) => (
                            <label key={option} className="flex items-center gap-2 text-sm text-app-dark-purple">
                                <input
                                    type="checkbox"
                                    checked={status === option}
                                    onChange={() => setStatus(option)}
                                    className="size-4 rounded border-gray-300 accent-app-primary"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-5">
                    <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Sort By</Text>
                    <div className="mt-3 flex flex-col gap-2.5">
                        {sortOptions.map((option) => (
                            <label key={option} className="flex items-center gap-2 text-sm text-app-dark-purple">
                                <input
                                    type="radio"
                                    name="sort"
                                    checked={sort === option}
                                    onChange={() => setSort(option)}
                                    className="size-4 border-gray-300 accent-app-primary"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
