"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { AppInput } from "@/components/reuseables/app-input";
import { AppButton } from "@/components/reuseables/app-button";
import { Calendar } from "@/components/ui/calendar";
import StepHeader from "@/components/layouts/dashboard/create-bounty/step-header";
import MarketplacePreview from "@/components/layouts/dashboard/create-bounty/marketplace-preview";
import { FundEscrowModal } from "@/components/reuseables/fund-escrow-modal";
import { cn } from "cn";
import { Text } from "@/components/reuseables/text";

const steps = ["Bounty Details", "Reward", "Deadline", "Review & Publish", "Fund Escrow"];
const categories = ["Development", "Design", "Content", "Research"];

const CreateBountyForm = () => {
    const [step, setStep] = useState(0);
    const [fundModalOpen, setFundModalOpen] = useState(false);

    const [title, setTitle] = useState("Build Stellar Wallet Connector React Hook");
    const [category, setCategory] = useState(categories[0]);
    const [description, setDescription] = useState(
        "Create an optimized, easily extensible custom React hook to manage freighter and albedo wallet connections on the Stellar Testnet. This should handle session persistence..."
    );
    const [requirements, setRequirements] = useState([
        "Frictionless connection state management",
        "Unit testing with 90%+ coverage",
    ]);
    const [newRequirement, setNewRequirement] = useState("");
    const [skills, setSkills] = useState(["React", "Frontend", "Stellar"]);
    const [skillInput, setSkillInput] = useState("");

    const [asset, setAsset] = useState<"XLM" | "USDC">("XLM");
    const [rewardAmount, setRewardAmount] = useState("1000");

    const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(new Date(2026, 2, 20));
    const [endTime, setEndTime] = useState("23:59");
    const [allowExtensions, setAllowExtensions] = useState(true);

    const rewardNumber = Number(rewardAmount) || 0;
    const usdEquivalent = (rewardNumber * 0.1254).toFixed(2);
    const platformFeePercent = 1;
    const platformFee = Math.round(rewardNumber * (platformFeePercent / 100) * 100) / 100;
    const totalRequired = rewardNumber + platformFee;

    const addRequirement = () => {
        if (!newRequirement.trim()) return;
        setRequirements((prev) => [...prev, newRequirement.trim()]);
        setNewRequirement("");
    };

    const removeRequirement = (index: number) => {
        setRequirements((prev) => prev.filter((_, i) => i !== index));
    };

    const addSkill = () => {
        const value = skillInput.trim();
        if (!value || skills.includes(value)) return;
        setSkills((prev) => [...prev, value]);
        setSkillInput("");
    };

    const removeSkill = (skill: string) => {
        setSkills((prev) => prev.filter((item) => item !== skill));
    };

    const formattedDeadline = deadlineDate
        ? deadlineDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        : "No deadline set";

    return (
        <div>
            <StepHeader steps={steps} currentStep={step} />

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-100 p-6 md:col-span-2">
                    {step === 0 && (
                        <>
                            <Text as="h2" className="text-lg font-bold text-app-dark-purple">Bounty Requirements</Text>
                            <Text as="p" className="mt-1 text-sm text-app-grey-light">
                                Explain the deliverables clearly to help the contributors construct stellar Soroban products.
                            </Text>

                            <div className="mt-4 flex flex-col gap-4 border-t border-gray-100 pt-4">
                                <AppInput label="Bounty Title" value={title} onValueChange={setTitle} />

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-app-dark-purple">Category</label>
                                    <div className="relative">
                                        <select
                                            value={category}
                                            onChange={(event) => setCategory(event.target.value)}
                                            className="h-10 w-full appearance-none rounded-[6px] border border-app-light-primary bg-white px-3.5 text-sm text-app-dark-purple outline-none focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                                        >
                                            {categories.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-app-grey-light" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-app-dark-purple">Description</label>
                                    <textarea
                                        rows={4}
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                        className="w-full rounded-[6px] border border-app-light-primary bg-white px-3.5 py-2.5 text-sm text-app-dark-purple outline-none transition-colors placeholder:text-app-grey-light focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-app-dark-purple">Key Requirements</label>
                                        <button
                                            type="button"
                                            onClick={addRequirement}
                                            className="text-sm font-medium text-app-primary hover:underline"
                                        >
                                            + Add Requirement
                                        </button>
                                    </div>
                                    <div className="mt-2 flex flex-col gap-2">
                                        {requirements.map((item, index) => (
                                            <div key={item} className="flex items-start gap-2 text-sm text-app-dark-purple">
                                                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-app-light-primary text-xs font-semibold text-app-primary">
                                                    {index + 1}
                                                </span>
                                                <span className="flex-1">{item}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeRequirement(index)}
                                                    className="text-app-grey-light hover:text-app-red"
                                                >
                                                    <X className="size-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            value={newRequirement}
                                            onChange={(event) => setNewRequirement(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") {
                                                    event.preventDefault();
                                                    addRequirement();
                                                }
                                            }}
                                            placeholder="Add a requirement and press Enter"
                                            className="h-9 w-full rounded-[6px] border border-app-light-primary bg-white px-3 text-sm text-app-dark-purple outline-none placeholder:text-app-grey-light focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-app-dark-purple">Skills Needed</label>
                                    <div className="mt-2 flex flex-wrap items-center gap-2 rounded-[6px] border border-app-light-primary p-2">
                                        {skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-app-dark-purple"
                                            >
                                                {skill}
                                                <button
                                                    type="button"
                                                    onClick={() => removeSkill(skill)}
                                                    className="text-app-grey-light hover:text-app-red"
                                                >
                                                    <X className="size-3" />
                                                </button>
                                            </span>
                                        ))}
                                        <input
                                            value={skillInput}
                                            onChange={(event) => setSkillInput(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") {
                                                    event.preventDefault();
                                                    addSkill();
                                                }
                                            }}
                                            placeholder="Type and press enter..."
                                            className="h-7 min-w-[140px] flex-1 border-none bg-transparent text-sm text-app-dark-purple outline-none placeholder:text-app-grey-light"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                                <AppButton variant="outline" color="#111827">
                                    Save Draft
                                </AppButton>
                                <AppButton variant="primary" onClick={() => setStep(1)}>
                                    Next: Set Reward
                                </AppButton>
                            </div>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <Text as="h2" className="text-lg font-bold text-app-dark-purple">Set Bounty Reward</Text>
                            <Text as="p" className="mt-1 text-sm text-app-grey-light">
                                Enter the amount of Stellar assets you wish to put in escrow as a reward for successful completion.
                            </Text>

                            <div className="mt-4 flex flex-col gap-4 border-t border-gray-100 pt-4">
                                <div>
                                    <label className="text-sm font-medium text-app-dark-purple">Select Asset</label>
                                    <div className="mt-2 grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setAsset("XLM")}
                                            className={cn(
                                                "flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-medium",
                                                asset === "XLM"
                                                    ? "border-app-primary bg-app-light-primary/40 text-app-dark-purple"
                                                    : "border-gray-200 text-app-grey-light"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "flex size-4 items-center justify-center rounded-full border",
                                                    asset === "XLM" ? "border-app-primary bg-app-primary" : "border-gray-300"
                                                )}
                                            >
                                                {asset === "XLM" && <span className="size-1.5 rounded-full bg-white" />}
                                            </span>
                                            XLM (Stellar Lumens)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setAsset("USDC")}
                                            className={cn(
                                                "flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-medium",
                                                asset === "USDC"
                                                    ? "border-app-primary bg-app-light-primary/40 text-app-dark-purple"
                                                    : "border-gray-200 text-app-grey-light"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "flex size-4 items-center justify-center rounded-full border",
                                                    asset === "USDC" ? "border-app-primary bg-app-primary" : "border-gray-300"
                                                )}
                                            >
                                                {asset === "USDC" && <span className="size-1.5 rounded-full bg-white" />}
                                            </span>
                                            USDC (Stellar Fiat)
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-app-dark-purple">Reward Amount</label>
                                    <div className="relative mt-1.5">
                                        <input
                                            value={rewardAmount}
                                            onChange={(event) => setRewardAmount(event.target.value.replace(/[^0-9.]/g, ""))}
                                            className="h-10 w-full rounded-[6px] border border-app-light-primary bg-white px-3.5 pr-14 text-sm text-app-dark-purple outline-none focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                                        />
                                        <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium text-app-grey-light">
                                            {asset}
                                        </span>
                                    </div>
                                    <Text as="p" className="mt-1 text-xs text-app-grey-light">
                                        ≈ ${usdEquivalent} USD (at current market rate: 1 XLM = $0.1254 USD)
                                    </Text>
                                </div>

                                <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
                                    Funds will be safely locked in escrow until the submitted work is reviewed and approved by you. If no deliverables are approved before the expiration, your assets can be claimed back according to the network parameters.
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                                <AppButton variant="outline" color="#111827" onClick={() => setStep(0)}>
                                    Back
                                </AppButton>
                                <AppButton variant="primary" onClick={() => setStep(2)}>
                                    Next: Set Deadline
                                </AppButton>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Text as="h2" className="text-lg font-bold text-app-dark-purple">Set Deadline</Text>
                            <Text as="p" className="mt-1 text-sm text-app-grey-light">
                                Provide a clear timeframe for contributors to deliver code. Once expired, unused funds are returnable.
                            </Text>

                            <div className="mt-4 flex flex-col gap-4 border-t border-gray-100 pt-4">
                                <Calendar
                                    mode="single"
                                    selected={deadlineDate}
                                    onSelect={setDeadlineDate}
                                    className="rounded-xl border border-gray-100 p-3"
                                />

                                <AppInput label="End Time (UTC)" value={endTime} onValueChange={setEndTime} />

                                <div className="flex items-center justify-between rounded-xl border border-gray-100 p-3">
                                    <div>
                                        <Text as="p" className="text-sm font-medium text-app-dark-purple">Allow extensions</Text>
                                        <Text as="p" className="text-xs text-app-grey-light">
                                            Can extend this deadline dynamically later if no satisfactory work is submitted.
                                        </Text>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setAllowExtensions((value) => !value)}
                                        className={cn(
                                            "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                                            allowExtensions ? "bg-app-primary" : "bg-gray-200"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "absolute top-0.5 size-5 rounded-full bg-white transition-transform",
                                                allowExtensions ? "translate-x-5" : "translate-x-0.5"
                                            )}
                                        />
                                    </button>
                                </div>

                                <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
                                    If the deadline passes and you have not selected/approved any submission, the funds locked in escrow become eligible for a full self-reclaim. Auto-refund starts automatically 48 hours post-deadline if no dispute is opened.
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                                <AppButton variant="outline" color="#111827" onClick={() => setStep(1)}>
                                    Back
                                </AppButton>
                                <AppButton variant="primary" onClick={() => setStep(3)}>
                                    Next: Review
                                </AppButton>
                            </div>
                        </>
                    )}

                    {step >= 3 && (
                        <div className={cn(fundModalOpen && "pointer-events-none opacity-40 blur-[1px]")}>
                            <Text as="h2" className="text-lg font-bold text-app-dark-purple">Review Bounty Details</Text>
                            <Text as="p" className="mt-1 text-sm text-app-grey-light">
                                Please verify all requirements, rewards, and deadlines before signing the escrow transaction.
                            </Text>

                            <div className="mt-4 flex flex-col gap-4 border-t border-gray-100 pt-4">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Bounty Title</Text>
                                        <button
                                            type="button"
                                            onClick={() => setStep(0)}
                                            className="text-xs font-medium text-app-primary hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <Text as="p" className="mt-1 text-base font-bold text-app-dark-purple">{title}</Text>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Description</Text>
                                        <button
                                            type="button"
                                            onClick={() => setStep(0)}
                                            className="text-xs font-medium text-app-primary hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <Text as="p" className="mt-1 text-sm text-app-grey-light">{description}</Text>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Key Requirements</Text>
                                        <button
                                            type="button"
                                            onClick={() => setStep(0)}
                                            className="text-xs font-medium text-app-primary hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div className="mt-1 flex flex-col gap-1">
                                        {requirements.map((item, index) => (
                                            <Text as="p" key={item} className="text-sm text-app-dark-purple">
                                                {index + 1}. {item}
                                            </Text>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Guaranteed Reward</Text>
                                        <Text as="p" className="mt-1 text-lg font-bold text-app-primary">
                                            {rewardNumber.toLocaleString()} {asset}
                                        </Text>
                                    </div>
                                    <div className="text-right">
                                        <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Deadline</Text>
                                        <Text as="p" className="mt-1 text-sm font-semibold text-app-dark-purple">
                                            {formattedDeadline} at {endTime} UTC
                                        </Text>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-xs font-medium text-app-primary hover:underline"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                                <AppButton variant="outline" color="#111827" onClick={() => setStep(2)}>
                                    Back
                                </AppButton>
                                <AppButton
                                    variant="primary"
                                    onClick={() => {
                                        setStep(4);
                                        setFundModalOpen(true);
                                    }}
                                >
                                    Fund &amp; Publish Bounty
                                </AppButton>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    {step < 2 && (
                        <MarketplacePreview
                            title={title}
                            tags={skills}
                            reward={step === 0 ? "TBD XLM" : `${rewardNumber.toLocaleString()} ${asset}`}
                        />
                    )}

                    {step === 2 && (
                        <div className="rounded-2xl border border-app-primary/20 bg-app-light-primary/30 p-5">
                            <Text as="h2" className="text-sm font-bold text-app-primary">Escrow Security</Text>
                            <Text as="p" className="mt-2 text-sm text-app-dark-purple/80">
                                All times are managed natively via Stellar ledger timestamps on-chain, eliminating backend centralization risks entirely. Your contributors receive strict real-time clarity.
                            </Text>
                        </div>
                    )}

                    {step >= 3 && (
                        <div className="rounded-2xl border border-gray-100 p-5">
                            <Text as="h2" className="text-sm font-bold text-app-dark-purple">Platform Fees</Text>
                            <div className="mt-3 flex items-center justify-between text-sm">
                                <span className="text-app-grey-light">Platform Service Fee (1%)</span>
                                <span className="font-semibold text-app-dark-purple">{platformFee.toLocaleString()} XLM</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm">
                                <span className="text-app-grey-light">Escrow Security Deposit</span>
                                <span className="font-semibold text-app-dark-purple">{rewardNumber.toLocaleString()} XLM</span>
                            </div>
                            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
                                <span className="font-semibold text-app-dark-purple">Total Required</span>
                                <span className="font-bold text-app-primary">{totalRequired.toLocaleString()} XLM</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FundEscrowModal
                open={fundModalOpen}
                onOpenChange={setFundModalOpen}
                bountyAmount={rewardNumber}
                platformFeePercent={platformFeePercent}
                walletBalance={4520.45}
                escrowAddress="CBSA...8K2L"
            />
        </div>
    );
};

export default CreateBountyForm;
