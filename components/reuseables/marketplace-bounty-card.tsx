import Link from "next/link";
import { AppButton } from "@/components/reuseables/app-button";
import { Text } from "@/components/reuseables/text";

type MarketplaceBountyCardProps = {
    status: string;
    daysLeft: string;
    title: string;
    tags: string[];
    reward: string;
    href?: string;
};

const MarketplaceBountyCard = ({ status, daysLeft, title, tags, reward, href = "#" }: MarketplaceBountyCardProps) => {
    return (
        <div className="rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between">
                <span className="rounded-full bg-app-dark-purple px-3 py-1 text-xs font-medium text-white">
                    {status}
                </span>
                <span className="text-xs text-app-grey-light">{daysLeft}</span>
            </div>

            <Text as="h3" className="mt-4 text-base font-bold leading-snug text-app-dark-purple">
                {title}
            </Text>

            <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-app-grey-light">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-5 flex items-end justify-between">
                <div>
                    <Text as="p" variant="caption" className="text-app-grey-light">
                        Guaranteed Reward
                    </Text>
                    <Text as="p" className="mt-1 text-lg font-bold text-app-dark-purple">
                        {reward}
                    </Text>
                </div>
                <AppButton variant="outline" render={<Link href={href} />} className="h-8 px-4 text-xs">
                    View Details
                </AppButton>
            </div>
        </div>
    );
};

export { MarketplaceBountyCard };
export type { MarketplaceBountyCardProps };
