import type { Metadata } from "next";
import ContributorOnboardingForm from "@/components/layouts/auth/contributor-onboarding-form";

export const metadata: Metadata = {
    title: "Contributor Onboarding",
    robots: { index: false, follow: false },
};

export default function ContributorOnboardingPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
            <ContributorOnboardingForm />
        </div>
    );
}
