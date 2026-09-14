import { AppButton } from "@/components/reuseables/app-button";
import { Text } from "@/components/reuseables/text";

type MarketplacePreviewProps = {
    title: string;
    tags: string[];
    reward: string;
};

const MarketplacePreview = ({ title, tags, reward }: MarketplacePreviewProps) => {
    return (
        <div>
            <Text as="h2" className="text-sm font-bold text-app-dark-purple">Live Marketplace Preview</Text>
            <Text as="p" className="mt-1 text-xs text-app-grey-light">This is how your bounty will appear to contributors.</Text>

            <div className="mt-4 rounded-2xl border border-app-primary/30 p-5">
                <div className="flex items-center justify-between">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-app-grey-light">Live</span>
                    <span className="text-[11px] text-app-grey-light">Draft</span>
                </div>
                <Text as="p" className="mt-3 text-base font-bold text-app-dark-purple">{title || "Untitled Bounty"}</Text>
                {tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-app-grey-light">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
                    <div>
                        <Text as="p" className="text-[11px] text-app-grey-light">Guaranteed Reward</Text>
                        <Text as="p" className="mt-1 text-lg font-bold text-app-dark-purple">{reward}</Text>
                    </div>
                    <AppButton variant="outline" className="h-8 px-3 text-xs" disabled>
                        View Details
                    </AppButton>
                </div>
            </div>
        </div>
    );
};

export default MarketplacePreview;
