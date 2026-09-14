import { cn } from "cn";
import { Text } from "@/components/reuseables/text";

type ActivityItem = {
    dotColor: string;
    text: string;
    time: string;
};

type RecentActivityProps = {
    items: ActivityItem[];
};

const RecentActivity = ({ items }: RecentActivityProps) => {
    return (
        <div className="rounded-2xl border border-gray-100 p-6">
            <Text as="h2" className="text-sm font-bold text-app-dark-purple">Recent Activity</Text>
            <div className="mt-4 flex flex-col gap-4">
                {items.map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                        <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", item.dotColor)} />
                        <div>
                            <Text as="p" className="text-sm text-app-dark-purple">{item.text}</Text>
                            <Text as="p" className="text-xs text-app-grey-light">{item.time}</Text>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
export type { ActivityItem, RecentActivityProps };
