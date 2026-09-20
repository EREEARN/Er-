import type { Metadata } from "next";
import OnboardingComplete from "@/components/layouts/auth/onboarding-complete";

export const metadata: Metadata = {
    title: "Onboarding Complete",
    robots: { index: false, follow: false },
};

export default function OnboardingCompletePage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
            <OnboardingComplete />
        </div>
    );
}
