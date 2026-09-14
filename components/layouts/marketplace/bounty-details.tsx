import Link from "next/link";
import { Info } from "lucide-react";
import { AppButton } from "@/components/reuseables/app-button";
import { ConnectWalletModal } from "@/components/reuseables/connect-wallet-modal";
import { ClaimBountyModal } from "@/components/reuseables/claim-bounty-modal";
import type { Bounty } from "@/lib/bounties";
import { Text } from "@/components/reuseables/text";

const BountyDetails = ({ bounty }: { bounty: Bounty }) => {
    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 p-8 md:col-span-2">
                <Text as="h1" className="text-2xl font-bold leading-snug text-app-dark-purple">{bounty.title}</Text>

                <div className="mt-4 flex items-center gap-3">
                    <span className="size-9 rounded-full border border-gray-200" />
                    <div>
                        <Text as="p" className="text-sm font-semibold text-app-dark-purple">{bounty.poster}</Text>
                        <Text as="p" className="text-xs text-app-grey-light">{bounty.postedAgo}</Text>
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-6">
                    <Text as="h2" className="text-base font-bold text-app-dark-purple">Description</Text>
                    <div className="mt-2 flex flex-col gap-3">
                        {bounty.description.map((paragraph) => (
                            <Text as="p" key={paragraph} className="text-sm text-app-grey-light">
                                {paragraph}
                            </Text>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <Text as="h2" className="text-base font-bold text-app-dark-purple">Requirements</Text>
                    <div className="mt-2 flex flex-col gap-2">
                        {bounty.requirements.map((item) => (
                            <Text as="p" key={item} className="text-sm text-app-grey-light">
                                {item}
                            </Text>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <Text as="h2" className="text-base font-bold text-app-dark-purple">Deliverables</Text>
                    <div className="mt-2 flex flex-col gap-2">
                        {bounty.deliverables.map((item) => (
                            <Text as="p" key={item} className="text-sm text-app-grey-light">
                                {item}
                            </Text>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <Text as="h2" className="text-base font-bold text-app-dark-purple">Skills Needed</Text>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {bounty.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-app-grey-light">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-6">
                    <Text as="h2" className="text-base font-bold text-app-dark-purple">Activity &amp; Submissions</Text>
                    <div className="mt-3 flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                        <Info className="mt-0.5 size-4 shrink-0 text-app-grey-light" />
                        <Text as="p" className="text-sm text-app-grey-light">
                            Bounty is active. No submissions have been recorded yet. Connect wallet to claim and submit proof of work.
                        </Text>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 md:self-start">
                <div className="rounded-2xl border border-gray-100 p-6">
                    <Text as="p" className="text-xs text-app-grey-light">Total Guaranteed Reward</Text>
                    <Text as="p" className="mt-1 text-2xl font-bold text-app-dark-purple">{bounty.reward}</Text>
                    <Text as="p" className="mt-1 text-xs text-app-grey-light">{bounty.rewardUsd}</Text>

                    <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-app-grey-light">Deadline</span>
                            <span className="font-semibold text-app-dark-purple">{bounty.deadline}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-app-grey-light">Remaining Time</span>
                            <span className="font-semibold text-amber-600">{bounty.daysLeft}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-app-grey-light">Asset Type</span>
                            <span className="font-semibold text-app-dark-purple">{bounty.assetType}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-app-grey-light">Contract State</span>
                            <span className="font-semibold text-app-green">{bounty.contractState}</span>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                        <ClaimBountyModal
                            bounty={bounty}
                            trigger={
                                <AppButton variant="primary" className="w-full">
                                    Claim This Bounty
                                </AppButton>
                            }
                        />
                        <ConnectWalletModal
                            trigger={
                                <AppButton variant="outline" className="w-full">
                                    Connect Wallet First
                                </AppButton>
                            }
                        />
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-100 p-6">
                    <Text as="h2" className="text-sm font-bold text-app-dark-purple">Smart Contract Reference</Text>
                    <Text as="p" className="mt-3 text-xs text-app-grey-light">Soroban Address:</Text>
                    <Link href="#" className="text-sm font-medium text-app-primary hover:underline">
                        {bounty.sorobanAddress}
                    </Link>
                    <Text as="p" className="mt-4 border-t border-gray-100 pt-4 text-xs text-app-grey-light">
                        All interactions are directly registered on Stellar Testnet ledger. Funds cannot be withdrawn except by contributor completion or poster multi-sig consensus.
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default BountyDetails;
