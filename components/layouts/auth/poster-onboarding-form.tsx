"use client";

import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";
import { AppInput } from "@/components/reuseables/app-input";
import { AppButton } from "@/components/reuseables/app-button";
import { Text } from "@/components/reuseables/text";

const PosterOnboardingForm = () => {
    return (
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8">
            <div className="text-center">
                <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Step 2 of 2</Text>
                <Text as="h1" className="mt-2 text-2xl font-bold text-app-dark-purple">Set Up Your Organization</Text>
                <Text as="p" className="mt-1 text-sm text-app-grey-light">Create your posters identity to establish developer trust.</Text>
            </div>

            <div className="mt-6 flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-app-light-primary text-app-primary">
                    <ImageIcon className="size-5" />
                </span>
                <div>
                    <Text as="p" className="text-sm font-semibold text-app-dark-purple">Organization Logo</Text>
                    <Text as="p" className="text-xs text-app-grey-light">
                        <button type="button" className="font-medium text-app-primary hover:underline">
                            Upload Logo
                        </button>{" "}
                        • PNG or SVG up to 2MB
                    </Text>
                </div>
            </div>

            <form className="mt-6 flex flex-col gap-4">
                <AppInput label="Organization Name *" placeholder="e.g. Stellar Foundation" />

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-app-dark-purple">About the Organization</label>
                    <textarea
                        rows={3}
                        placeholder="Describe your company, products, and what tasks you outsource..."
                        className="w-full rounded-[6px] border border-app-light-primary bg-white px-3.5 py-2.5 text-sm text-app-dark-purple outline-none transition-colors placeholder:text-app-grey-light focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                    />
                </div>

                <AppInput label="Website URL" placeholder="https://yourcompany.com" />
                <AppInput label="Industry" placeholder="e.g. Blockchain/Web3 development" />

                <AppButton variant="primary" render={<Link href="/onboarding/complete" />} className="w-full">
                    Complete Setup
                </AppButton>
            </form>

            <button type="button" className="mt-4 w-full text-center text-sm text-app-grey-light hover:text-app-primary">
                Skip for now
            </button>
        </div>
    );
};

export default PosterOnboardingForm;
