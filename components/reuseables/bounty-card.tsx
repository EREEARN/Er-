import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Text } from "@/components/reuseables/text";

type BountyCardProps = {
    category: string;
    title: string;
    reward: string;
    deadline: string;
    location: string;
    href?: string;
};

const BountyCard = ({ category, title, reward, deadline, location, href = "#" }: BountyCardProps) => {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(17,24,39,0.06)]">
            <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm font-medium text-app-green">
                    <span className="text-lg leading-none">&bull;</span>
                    Live
                </span>
                <span className="text-sm text-app-grey-light">{category}</span>
            </div>

            <Text as="h3" className="mt-6 text-lg font-bold leading-snug text-gray-900">
                {title}
            </Text>

            <div className="mt-6 flex items-start justify-between">
                <div>
                    <Text as="p" variant="caption" className="uppercase tracking-wide text-app-grey-light">
                        Reward
                    </Text>
                    <Text as="p" className="mt-1 text-xl font-bold text-gray-900">
                        {reward}
                    </Text>
                </div>
                <div className="text-right">
                    <Text as="p" variant="caption" className="uppercase tracking-wide text-app-grey-light">
                        Deadline
                    </Text>
                    <Text as="p" className="mt-1 text-base font-semibold text-app-red">
                        {deadline}
                    </Text>
                </div>
            </div>

            <Text as="p" variant="small" className="mt-4 text-app-grey-light">
                {location}
            </Text>

            <div className="mt-6 border-t border-gray-100 pt-5">
                <Link
                    href={href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-app-primary hover:underline"
                >
                    View Details <ArrowRight className="size-4" />
                </Link>
            </div>
        </div>
    );
};

export { BountyCard };
export type { BountyCardProps };
