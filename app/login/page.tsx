import type { Metadata } from "next";
import LoginForm from "@/components/layouts/auth/login-form";
import Footer from "@/components/layouts/landing/footer";

export const metadata: Metadata = {
    title: "Log In",
    description: "Log in to your EreEarn account to manage bounties, submissions, and payouts.",
    alternates: { canonical: "/login" },
    robots: { index: false, follow: true },
};

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12">
                <LoginForm />
            </div>
            <Footer />
        </div>
    );
}
