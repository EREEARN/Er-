"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppImages } from "@/assets/app_images";
import { AppInput } from "@/components/reuseables/app-input";
import { AppButton } from "@/components/reuseables/app-button";
import { Text } from "@/components/reuseables/text";
import { useLogin } from "@/hooks/use-auth";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { ConnectWalletModal } from "@/components/reuseables/connect-wallet-modal";

const LoginForm = () => {
    const router = useRouter();
    const login = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await login.mutateAsync({ email, password });
            router.push("/dashboard");
        } catch {
            // error state is derived from login.error below
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8">
            <div className="flex flex-col items-center">
                <Image src={AppImages.logo} alt="EreEarn" width={110} height={52} className="h-auto w-[90px]" />
                <Text as="h1" className="mt-4 text-2xl font-bold text-app-dark-purple">Welcome back</Text>
                <Text as="p" className="mt-1 text-sm text-app-grey-light">Sign in to your account</Text>
            </div>

            <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                <AppInput
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onValueChange={setEmail}
                    required
                />

                <AppInput
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onValueChange={setPassword}
                    required
                    rightSlot={
                        <button
                            type="button"
                            onClick={() => setShowPassword((value) => !value)}
                            className="text-sm font-medium text-app-primary hover:underline"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    }
                />

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-app-grey-light">
                        <input type="checkbox" className="size-4 rounded border-gray-300 accent-app-primary" />
                        Remember me
                    </label>
                    <Link href="#" className="font-medium text-app-dark-purple hover:text-app-primary">
                        Forgot password?
                    </Link>
                </div>

                {login.isError && (
                    <Text as="p" className="text-sm text-app-red">
                        {getApiErrorMessage(login.error)}
                    </Text>
                )}

                <AppButton variant="primary" type="submit" className="w-full" disabled={login.isPending}>
                    {login.isPending ? "Signing In..." : "Sign In"}
                </AppButton>
            </form>

            <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-gray-100" />
                <span className="text-xs text-app-grey-light">or continue with</span>
                <span className="h-px flex-1 bg-gray-100" />
            </div>

            <ConnectWalletModal
                trigger={
                    <AppButton
                        variant="outline"
                        color="#111827"
                        className="w-full justify-center gap-2 border-gray-200"
                    >
                        <Image src={AppImages.basilWalletSolid} alt="" width={16} height={16} />
                        Connect Wallet
                    </AppButton>
                }
            />

            <Text as="p" className="mt-6 text-center text-sm text-app-grey-light">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-app-primary hover:underline">
                    Sign up
                </Link>
            </Text>
        </div>
    );
};

export default LoginForm;
