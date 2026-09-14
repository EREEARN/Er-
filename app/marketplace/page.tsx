"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import NavBar from "@/components/layouts/landing/nav-bar";
import { AppInput } from "@/components/reuseables/app-input";
import { FilterChip } from "@/components/reuseables/filter-chip";
import { MarketplaceBountyCard } from "@/components/reuseables/marketplace-bounty-card";
import { Pagination } from "@/components/reuseables/pagination";
import Footer from "@/components/layouts/landing/footer";
import { bounties } from "@/lib/bounties";

export default function MarketplacePage() {
    const [page, setPage] = useState(1);

    return (
        <div>
            <NavBar />
            <main className="mx-auto max-w-[1200px] px-6 py-8">
                <AppInput
                    icon={<Search className="size-4" />}
                    placeholder="Search open tasks, skills, technologies..."
                    className="h-12 rounded-full"
                />

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-app-grey-light">
                    <span>Active filters:</span>
                    <FilterChip label="Development" selected />
                    <FilterChip label="Open" />
                    <span className="ml-1">Showing {bounties.length} bounties</span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {bounties.map((bounty) => (
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

                <Pagination currentPage={page} totalPages={3} onPageChange={setPage} className="mt-10" />
            </main>
            <Footer/>
        </div>
    );
}
