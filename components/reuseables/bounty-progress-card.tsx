import type { ReactNode } from "react";
import { cn } from "cn";
import { Text } from "@/components/reuseables/text";

type BountyProgressCardVariant = "progress" | "review";

type BountyProgressCardProps = {
    variant: BountyProgressCardVariant;
    status: string;
    meta: string;
    note: string;
    title: string;
    description: string;
    progressLabel: string;
    progressPercent: number;
    rewardLabel: string;
    reward: string;
    action: ReactNode;
};

const variantStyles: Record<BountyProgressCardVariant, { badge: string; dot: string; bar: string; note: string }> = {
    progress: {
        badge: "bg-app-light-primary text-app-primary",
        dot: "bg-app-primary",
        bar: "bg-app-primary",
        note: "text-amber-600",
    },
    review: {
        badge: "bg-amber-50 text-amber-600",
        dot: "bg-amber-500",
        bar: "bg-amber-500",
        note: "text-app-grey-light",
    },
};

const BountyProgressCard = ({
    variant,
    status,
    meta,
    note,
    title,
    description,
    progressLabel,
    progressPercent,
    rewardLabel,
    reward,
    action,
}: BountyProgressCardProps) => {
    const styles = variantStyles[variant];

    return (
        <div className="rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", styles.badge)}>
                        <span className={cn("size-1.5 rounded-full", styles.dot)} />
                        {status}
                    </span>
                    <span className="text-xs text-app-grey-light">{meta}</span>
                </div>
                <span className={cn("text-xs font-medium", styles.note)}>{note}</span>
            </div>

            <Text as="h3" className="mt-4 text-base font-bold text-app-dark-purple">{title}</Text>
            <Text as="p" className="mt-1 text-sm text-app-grey-light">{description}</Text>

            <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-app-grey-light">
                    <span>{progressLabel}</span>
                    <span>{progressPercent}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className={cn("h-full rounded-full", styles.bar)} style={{ width: `${progressPercent}%` }} />
                </div>
            </div>

            <div className="mt-4 flex items-end justify-between">
                <div>
                    <Text as="p" className="text-xs text-app-grey-light">{rewardLabel}</Text>
                    <Text as="p" className="mt-1 text-lg font-bold text-app-dark-purple">{reward}</Text>
                </div>
                {action}
            </div>
        </div>
    );
};

export { BountyProgressCard };
export type { BountyProgressCardProps };
