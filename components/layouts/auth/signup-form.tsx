"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, User } from "lucide-react";
import { AppImages } from "@/assets/app_images";
import { AppInput } from "@/components/reuseables/app-input";
import { AppButton } from "@/components/reuseables/app-button";
import { cn } from "cn";
import { Text } from "@/components/reuseables/text";
import { useRegister } from "@/hooks/use-auth";
import { getApiErrorMessage } from "@/lib/api/api-error";
import type { UserRole } from "@/lib/api/types";

type Role = "earn" | "post";

const roles: { id: Role; title: string; subtitle: string; icon: React.ReactNode }[] = [
    { id: "earn", title: "I want to earn", subtitle: "Contributor / Developer", icon: <User className="size-4" /> },
    { id: "post", title: "I want to post", subtitle: "Poster / Client", icon: <Briefcase className="size-4" /> },
];

const roleMap: Record<Role, UserRole> = {
    earn: "CONTRIBUTOR",
    post: "POSTER",
};

const strengthLabels = ["Very weak", "Weak", "Fair", "Good", "Strong password"];
const strengthColors = ["bg-app-red", "bg-app-red", "bg-amber-500", "bg-amber-500", "bg-app-green"];

function getPasswordStrength(password: string) {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
}

const SignUpForm = () => {
    const router = useRouter();
    const register = useRegister();
    const [role, setRole] = useState<Role>("earn");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const strength = useMemo(() => getPasswordStrength(password), [password]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

        if (password !== confirmPassword) {
            setFormError("Passwords do not match.");
            return;
        }
        if (!agreedToTerms) {
            setFormError("Please agree to the Terms of Service and Privacy Policy.");
            return;
        }

        try {
            await register.mutateAsync({
                email,
                username,
                password,
                password_confirm: confirmPassword,
                role: roleMap[role],
            });
            router.push("/dashboard");
        } catch {
            // error state is derived from register.error below
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8">
            <div className="flex flex-col items-center">
                <Image src={AppImages.logo} alt="EreEarn" width={110} height={52} className="h-auto w-[90px]" />
                <Text as="h1" className="mt-4 text-2xl font-bold text-app-dark-purple">Create your account</Text>
                <Text as="p" className="mt-1 text-sm text-app-grey-light">Start earning or posting bounties</Text>
            </div>

            <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <span className="text-sm font-medium text-app-dark-purple">Choose Your Role</span>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                        {roles.map((option) => {
                            const selected = role === option.id;
                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => setRole(option.id)}
                                    className={cn(
                                        "flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-colors",
                                        selected ? "border-app-primary bg-app-light-primary/40" : "border-gray-200"
                                    )}
                                >
                                    <div className="flex w-full items-center justify-between">
                                        <span
                                            className={cn(
                                                "flex size-7 items-center justify-center rounded-lg",
                                                selected ? "bg-app-primary text-white" : "bg-gray-100 text-app-grey-light"
                                            )}
                                        >
                                            {option.icon}
                                        </span>
                                        <span
                                            className={cn(
                                                "flex size-4 items-center justify-center rounded-full border",
                                                selected ? "border-app-primary bg-app-primary" : "border-gray-300"
                                            )}
                                        >
                                            {selected && <span className="size-1.5 rounded-full bg-white" />}
                                        </span>
                                    </div>
                                    <div>
                                        <Text as="p" className="text-sm font-semibold text-app-dark-purple">{option.title}</Text>
                                        <Text as="p" className="text-xs text-app-grey-light">{option.subtitle}</Text>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <AppInput
                    label="Username"
                    placeholder="alexrivers"
                    value={username}
                    onValueChange={(value) => setUsername(value.replace(/\s+/g, ""))}
                    required
                />
                <AppInput
                    label="Email Address"
                    type="email"
                    placeholder="alex@stellarbounties.org"
                    value={email}
                    onValueChange={setEmail}
                    required
                />

                <div>
                    <AppInput
                        label="Password"
                        type="password"
                        placeholder="Minimum 8 characters"
                        value={password}
                        onValueChange={(value) => setPassword(value)}
                        required
                    />
                    {password && (
                        <div className="mt-2">
                            <div className="flex gap-1">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <span
                                        key={index}
                                        className={cn(
                                            "h-1 flex-1 rounded-full",
                                            index < strength ? strengthColors[strength - 1] : "bg-gray-100"
                                        )}
                                    />
                                ))}
                            </div>
                            <Text as="p" className={cn("mt-1 text-xs font-medium", strength >= 4 ? "text-app-green" : "text-app-grey-light")}>
                                {strengthLabels[strength]}
                            </Text>
                        </div>
                    )}
                </div>

                <AppInput
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onValueChange={setConfirmPassword}
                    required
                />

                <label className="flex items-start gap-2 text-sm text-app-grey-light">
                    <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(event) => setAgreedToTerms(event.target.checked)}
                        className="mt-0.5 size-4 rounded border-gray-300 accent-app-primary"
                    />
                    <span>
                        I agree to the{" "}
                        <Link href="#" className="font-medium text-app-primary hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="font-medium text-app-primary hover:underline">
                            Privacy Policy
                        </Link>
                    </span>
                </label>

                {(formError || register.isError) && (
                    <Text as="p" className="text-sm text-app-red">
                        {formError ?? getApiErrorMessage(register.error)}
                    </Text>
                )}

                <AppButton variant="primary" type="submit" className="w-full" disabled={register.isPending}>
                    {register.isPending ? "Creating Account..." : "Create Account"}
                </AppButton>
            </form>

            <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-gray-100" />
                <span className="text-xs text-app-grey-light">or continue with</span>
                <span className="h-px flex-1 bg-gray-100" />
            </div>

            <AppButton
                variant="outline"
                color="#111827"
                className="w-full justify-center gap-2 border-gray-200"
            >
                <Image src={AppImages.basilWalletSolid} alt="" width={16} height={16} />
                Connect Wallet
            </AppButton>

            <Text as="p" className="mt-6 text-center text-sm text-app-grey-light">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-app-primary hover:underline">
                    Sign in
                </Link>
            </Text>
        </div>
    );
};

export default SignUpForm;
