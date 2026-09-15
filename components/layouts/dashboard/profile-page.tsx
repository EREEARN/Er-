"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppButton } from "@/components/reuseables/app-button";
import { ConnectWalletModal } from "@/components/reuseables/connect-wallet-modal";
import { Spinner } from "@/components/ui/spinner";
import { useCurrentUser } from "@/hooks/use-auth";
import { cn } from "cn";
import { Text } from "@/components/reuseables/text";

function formatMemberSince(dateJoined: string) {
    return new Date(dateJoined).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

const ProfilePage = () => {
    const { data: user, isLoading } = useCurrentUser();
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [theme, setTheme] = useState("Light Mode");
    const [language, setLanguage] = useState("English (US)");

    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center py-20">
                <Spinner className="size-6 text-app-primary" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                    <Text as="h1" className="text-lg font-bold text-app-dark-purple">Profile Details</Text>
                    <AppButton variant="outline" className="h-8 px-3 text-xs">
                        Edit Profile
                    </AppButton>
                </div>

                <div className="mt-4">
                    <Text as="p" className="text-base font-bold text-app-dark-purple">{user.username}</Text>
                    <Text as="p" className="mt-1 text-sm text-app-grey-light">
                        {user.bio || "No bio added yet."}
                    </Text>
                    <Text as="p" className="mt-2 text-xs text-app-grey-light">
                        {user.email} · Member since {formatMemberSince(user.date_joined)} ·{" "}
                        <span className="font-medium text-app-primary">
                            {user.role === "POSTER" ? "Poster" : "Contributor"}
                        </span>
                    </Text>
                </div>

                {user.skills && user.skills.length > 0 && (
                    <div className="mt-4">
                        <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Expertise Areas</Text>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {user.skills.map((skill) => (
                                <span key={skill} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-app-dark-purple">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="rounded-2xl border border-gray-100 p-6">
                <Text as="h2" className="text-lg font-bold text-app-dark-purple">Settings</Text>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 py-4">
                    <div>
                        <Text as="p" className="text-sm font-medium text-app-dark-purple">Email Notifications</Text>
                        <Text as="p" className="text-xs text-app-grey-light">Receive daily digests of new submissions and claim updates</Text>
                    </div>
                    <button
                        type="button"
                        onClick={() => setEmailNotifications((value) => !value)}
                        className={cn(
                            "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                            emailNotifications ? "bg-app-primary" : "bg-gray-200"
                        )}
                    >
                        <span
                            className={cn(
                                "absolute top-0.5 size-5 rounded-full bg-white transition-transform",
                                emailNotifications ? "translate-x-5" : "translate-x-0.5"
                            )}
                        />
                    </button>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 py-4">
                    <div>
                        <Text as="p" className="text-sm font-medium text-app-dark-purple">Theme Preference</Text>
                        <Text as="p" className="text-xs text-app-grey-light">Choose your interface display preference</Text>
                    </div>
                    <div className="relative">
                        <select
                            value={theme}
                            onChange={(event) => setTheme(event.target.value)}
                            className="h-9 appearance-none rounded-[6px] border border-app-light-primary bg-white pr-8 pl-3 text-sm text-app-dark-purple outline-none focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                        >
                            <option>Light Mode</option>
                            <option>Dark Mode</option>
                            <option>System</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-app-grey-light" />
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 py-4">
                    <div>
                        <Text as="p" className="text-sm font-medium text-app-dark-purple">Language</Text>
                        <Text as="p" className="text-xs text-app-grey-light">Select your primary localized language</Text>
                    </div>
                    <div className="relative">
                        <select
                            value={language}
                            onChange={(event) => setLanguage(event.target.value)}
                            className="h-9 appearance-none rounded-[6px] border border-app-light-primary bg-white pr-8 pl-3 text-sm text-app-dark-purple outline-none focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                        >
                            <option>English (US)</option>
                            <option>Spanish</option>
                            <option>French</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-app-grey-light" />
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <Text as="p" className="text-sm font-medium text-app-dark-purple">Connected Wallet</Text>
                    <div className="mt-3 flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
                        <span className="flex items-center gap-2 text-sm font-medium text-app-dark-purple">
                            <span className={cn("size-2 rounded-full", user.wallet_address ? "bg-app-green" : "bg-gray-300")} />
                            Stellar Wallet
                        </span>
                        {user.wallet_address ? (
                            <span className="text-sm font-semibold text-app-primary">{user.wallet_address}</span>
                        ) : (
                            <ConnectWalletModal
                                trigger={
                                    <AppButton variant="outline" className="h-8 px-3 text-xs">
                                        Connect Wallet
                                    </AppButton>
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
