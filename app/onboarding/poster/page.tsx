import type { Metadata } from "next";
import PosterOnboardingForm from "@/components/layouts/auth/poster-onboarding-form";

export const metadata: Metadata = {
    title: "Poster Onboarding",
    robots: { index: false, follow: false },
};

export default function PosterOnboardingPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
            <PosterOnboardingForm />
        </div>
    );
}
