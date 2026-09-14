import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Text } from "@/components/reuseables/text";
import { AppButton } from "@/components/reuseables/app-button";
import { BountyCard } from "@/components/reuseables/bounty-card";

const bounties = [
    {
        category: "Development",
        title: "Build a Soroban Rust SDK Client for Web Apps",
        reward: "2,500 USDC",
        deadline: "May 18, 2026",
        location: "Stellar Nigeria",
    },
    {
        category: "Writing",
        title: "Write Technical Documentation on Smart Contracts",
        reward: "800 XLM",
        deadline: "May 25, 2026",
        location: "Stellar Nigeria",
    },
    {
        category: "Design",
        title: "Design Landing Page UI/UX for Stellar Bridge",
        reward: "1,200 USDC",
        deadline: "May 22, 2026",
        location: "Stellar Nigeria",
    },
];

const ExploreBounties = () => {
    return (
        <section className="max-w-[1200px] mx-auto px-6 py-20">
            <div className="flex items-center justify-between">
                <Text as="h2" variant="h2" className="text-app-dark-purple">
                    Explore bounties
                </Text>
                <Link
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-medium text-app-primary hover:underline"
                >
                    See all <ArrowRight className="size-4" />
                </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {bounties.map((bounty) => (
                    <BountyCard key={bounty.title} {...bounty} />
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <AppButton variant="outline" className="px-6 py-3">
                    Browse Open Bounties
                </AppButton>
            </div>
        </section>
    );
};

export default ExploreBounties;
