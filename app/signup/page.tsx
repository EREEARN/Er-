import SignUpForm from "@/components/layouts/auth/signup-form";
import Footer from "@/components/layouts/landing/footer";

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
