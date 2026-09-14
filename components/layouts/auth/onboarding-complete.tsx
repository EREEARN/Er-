import Link from "next/link";
import { AppButton } from "@/components/reuseables/app-button";
import { Text } from "@/components/reuseables/text";

const tips = [
    {
        title: "01. Verify Wallet",
        description: "Ensure Freighter or Albedo is configured to the Stellar Testnet.",
    },
    {
        title: "02. Fund Gas",
        description: "Use the Stellar Laboratory Faucet to load free testnet XLM.",
    },
    {
        title: "03. Claim Bounty",
        description: "Select an open opportunity, read the checklist, and lock your claim.",
    },
];

const OnboardingComplete = () => {
    return (
        <div className="w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-8">
            <div className="text-center">
                <Text as="h1" className="text-2xl font-bold text-app-dark-purple">You&apos;re all set!</Text>
                <Text as="p" className="mt-1 text-sm text-app-grey-light">
                    Your profile is ready. Start exploring ÉreEARN on Stellar Soroban Core.
                </Text>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-5 text-center">
                    <Text as="p" className="text-sm font-semibold text-app-dark-purple">For Contributors</Text>
                    <AppButton variant="primary" render={<Link href="/marketplace" />} className="w-full">
                        Browse Marketplace
                    </AppButton>
                </div>
                <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-5 text-center">
                    <Text as="p" className="text-sm font-semibold text-app-dark-purple">For Posters</Text>
                    <AppButton variant="outline" render={<Link href="#" />} className="w-full">
                        Create a Bounty
                    </AppButton>
                </div>
            </div>

            <div className="mt-8">
                <Text as="p" className="text-sm font-semibold text-app-dark-purple">Quick tips to get started:</Text>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {tips.map((tip) => (
                        <div key={tip.title} className="rounded-xl border border-gray-100 p-4">
                            <Text as="p" className="text-sm font-semibold text-app-dark-purple">{tip.title}</Text>
                            <Text as="p" className="mt-1 text-xs text-app-grey-light">{tip.description}</Text>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OnboardingComplete;
