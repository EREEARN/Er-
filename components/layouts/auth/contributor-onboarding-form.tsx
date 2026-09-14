"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { AppInput } from "@/components/reuseables/app-input";
import { AppButton } from "@/components/reuseables/app-button";
import { cn } from "cn";
import { Text } from "@/components/reuseables/text";

const skillOptions = ["Frontend", "React", "Rust", "Soroban", "Design", "Technical Writing"];

const ContributorOnboardingForm = () => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>(["Frontend", "React", "Rust", "Soroban"]);

    const toggleSkill = (skill: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill]
        );
    };

    return (
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8">
            <div className="text-center">
                <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Step 1 of 2</Text>
                <Text as="h1" className="mt-2 text-2xl font-bold text-app-dark-purple">Set Up Your Profile</Text>
                <Text as="p" className="mt-1 text-sm text-app-grey-light">Establish your identity for posters to recognize you.</Text>
            </div>

            <div className="mt-6 flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-app-light-primary text-app-primary">
                    <User className="size-5" />
                </span>
                <div>
                    <Text as="p" className="text-sm font-semibold text-app-dark-purple">Avatar Picture</Text>
                    <Text as="p" className="text-xs text-app-grey-light">
                        <button type="button" className="font-medium text-app-primary hover:underline">
                            Upload photo
                        </button>{" "}
                        • Up to 2MB
                    </Text>
                </div>
            </div>

            <form className="mt-6 flex flex-col gap-4">
                <AppInput label="Display Name *" placeholder="e.g. StellarBuilder" />

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-app-dark-purple">Bio</label>
                    <textarea
                        rows={3}
                        placeholder="Short description of your skills, interests, and experience..."
                        className="w-full rounded-[6px] border border-app-light-primary bg-white px-3.5 py-2.5 text-sm text-app-dark-purple outline-none transition-colors placeholder:text-app-grey-light focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-app-dark-purple">Skills (Select or Type)</span>
                    <div className="flex flex-wrap gap-2">
                        {skillOptions.map((skill) => {
                            const selected = selectedSkills.includes(skill);
                            return (
                                <button
                                    key={skill}
                                    type="button"
                                    onClick={() => toggleSkill(skill)}
                                    className={cn(
                                        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                                        selected
                                            ? "border-app-primary bg-white text-app-primary"
                                            : "border-transparent bg-gray-100 text-app-grey-light"
                                    )}
                                >
                                    {skill}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <AppInput label="Portfolio URL" placeholder="https://yourportfolio.com" />
                <AppInput label="GitHub Username" placeholder="github_username" />

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

export default ContributorOnboardingForm;
