import type { ReactNode } from "react";
import { Text } from "@/components/reuseables/text";

type DashboardTopBarProps = {
    eyebrow: string;
    heading: string;
    action?: ReactNode;
};

const DashboardTopBar = ({ eyebrow, heading, action }: DashboardTopBarProps) => {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">{eyebrow}</Text>
                <Text as="h1" className="mt-1 text-2xl font-bold text-app-dark-purple md:text-3xl">{heading}</Text>
            </div>
            {action}
        </div>
    );
};

export default DashboardTopBar;
export type { DashboardTopBarProps };
