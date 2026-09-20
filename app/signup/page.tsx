import type { Metadata } from "next";
import SignUpForm from "@/components/layouts/auth/signup-form";
import Footer from "@/components/layouts/landing/footer";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Create an EreEarn account to post or claim fully-funded bounties.",
    alternates: { canonical: "/signup" },
    robots: { index: false, follow: true },
};

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12">
                <SignUpForm />
            </div>
            <Footer />
        </div>
    );
}
