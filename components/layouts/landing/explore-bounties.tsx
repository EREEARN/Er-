"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Text } from "@/components/reuseables/text";
import { AppButton } from "@/components/reuseables/app-button";
import { BountyCard } from "@/components/reuseables/bounty-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBounties } from "@/hooks/use-bounties";
import { mapApiBountyToLocal } from "@/lib/api/mappers";

const ExploreBounties = () => {
    const { data, isLoading, isError } = useBounties({ page: 1, status: "POSTED" });
    const bounties = (data?.results ?? []).slice(0, 3).map(mapApiBountyToLocal);

    return (
        <section className="max-w-[1200px] mx-auto px-6 py-20">
            <div className="flex items-center justify-between">
                <Text as="h2" variant="h2" className="text-app-dark-purple">
                    Explore bounties
                </Text>
                <Link
                    href="/marketplace"
                    className="inline-flex items-center gap-1 text-sm font-medium text-app-primary hover:underline"
                >
                    See all <ArrowRight className="size-4" />
                </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {isLoading &&
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(17,24,39,0.06)]">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="mt-6 h-5 w-full" />
                            <Skeleton className="mt-2 h-5 w-2/3" />
                            <div className="mt-6 flex items-center justify-between">
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-8 w-24" />
                            </div>
                        </div>
                    ))}

                {!isLoading && !isError && bounties.length === 0 && (
                    <Text as="p" className="col-span-full text-center text-sm text-app-grey-light">
                        No open bounties right now. Check back soon.
                    </Text>
                )}

                {!isLoading &&
                    !isError &&
                    bounties.map((bounty) => (
                        <BountyCard
                            key={bounty.id}
                            category={bounty.tags[0] ?? "General"}
                            title={bounty.title}
                            reward={bounty.reward}
                            deadline={bounty.deadline}
                            location={bounty.postedAgo}
                            href={`/marketplace/${bounty.id}`}
                        />
                    ))}

                {isError && (
                    <Text as="p" className="col-span-full text-center text-sm text-app-red">
                        Couldn&apos;t load bounties right now. Please try again shortly.
                    </Text>
                )}
            </div>

            <div className="mt-10 flex justify-center">
                <AppButton variant="outline" render={<Link href="/marketplace" />} className="px-6 py-3">
                    Browse Open Bounties
                </AppButton>
            </div>
        </section>
    );
};

export default ExploreBounties;

