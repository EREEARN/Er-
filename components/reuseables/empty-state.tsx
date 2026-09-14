import type { ReactNode } from "react";
import { Text } from "@/components/reuseables/text";

type EmptyStateProps = {
    icon: ReactNode;
    title: string;
    description: string;
    action?: ReactNode;
};

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-app-light-primary text-app-primary">
                {icon}
            </span>
            <div>
                <Text as="p" className="text-base font-bold text-app-dark-purple">{title}</Text>
                <Text as="p" className="mt-1 max-w-sm text-sm text-app-grey-light">{description}</Text>
            </div>
            {action}
        </div>
    );
};

export default EmptyState;
export type { EmptyStateProps };
