"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Clock, FileText, Star, Trash2, UploadCloud } from "lucide-react";
import { AppButton } from "@/components/reuseables/app-button";
import { SubmitWorkModal } from "@/components/reuseables/submit-work-modal";
import { PaymentReceivedModal } from "@/components/reuseables/payment-received-modal";
import { useSubmitBountyWork } from "@/hooks/use-bounties";
import type { Bounty } from "@/lib/bounties";
import { cn } from "cn";
import { Text } from "@/components/reuseables/text";

const pipelineSteps = ["Claimed", "In Progress", "Submitted", "Under Review", "Approved", "Paid"];

type WorkFile = { name: string; size: string; time: string };

type WorkspaceDetailsProps = {
    bounty: Bounty;
};

const WorkspaceDetails = ({ bounty }: WorkspaceDetailsProps) => {
    const [stage, setStage] = useState<"working" | "review" | "paid">("working");
    const [checked, setChecked] = useState<boolean[]>(
        bounty.requirements.map((_, index) => index < 2)
    );
    const [files, setFiles] = useState<WorkFile[]>([
        { name: "wallet_connector_hook.ts", size: "14.2 KB", time: "Today at 10:11" },
        { name: "package.json", size: "1.1 KB", time: "Today at 09:40" },
    ]);
    const [comment, setComment] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const submitWork = useSubmitBountyWork(bounty.id);

    const currentStep = stage === "working" ? 2 : stage === "review" ? 3 : 5;

    const toggleItem = (index: number) => {
        setChecked((prev) => prev.map((value, i) => (i === index ? !value : value)));
    };

    const handleFiles = (fileList: FileList | null) => {
        if (!fileList) return;
        const newFiles: WorkFile[] = Array.from(fileList).map((file) => ({
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            time: `Today at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        }));
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const removeFile = (name: string) => {
        setFiles((prev) => prev.filter((file) => file.name !== name));
    };

    useEffect(() => {
        if (stage !== "review") return;

        // Simulated poster approval — resolves once the review period elapses.
        const timeout = setTimeout(() => setStage("paid"), 4000);
        return () => clearTimeout(timeout);
    }, [stage]);

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2 flex flex-col gap-6">
                <div>
                    <div className="flex items-center justify-between">
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                            {bounty.status === "Open" ? "In Progress" : bounty.status}
                        </span>
                        <span className="text-sm text-app-grey-light">Remaining: {bounty.daysLeft}</span>
                    </div>
                    <Text as="h1" className="mt-3 text-2xl font-bold leading-snug text-app-dark-purple">{bounty.title}</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">{bounty.description[0]}</Text>
                </div>

                {stage === "review" && (
                    <div className="rounded-2xl bg-amber-50 p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-2">
                                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />
                                <div>
                                    <Text as="p" className="text-sm font-semibold text-amber-800">Awaiting Poster Review</Text>
                                    <Text as="p" className="mt-1 text-sm text-amber-700">
                                        The submission is securely locked in escrow. {bounty.poster} is notified and is running verification tests.
                                    </Text>
                                </div>
                            </div>
                            <span className="shrink-0 rounded-lg bg-amber-800 px-3 py-1.5 text-xs font-semibold text-white">
                                Under Review
                            </span>
                        </div>
                    </div>
                )}

                {stage === "paid" && (
                    <div className="rounded-2xl border border-app-green/20 bg-app-green/10 p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-2">
                                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-app-green text-white">
                                    <Check className="size-3.5" />
                                </span>
                                <div>
                                    <Text as="p" className="text-sm font-semibold text-app-green">Bounty Approved &amp; Escrow Released!</Text>
                                    <Text as="p" className="mt-1 text-sm text-app-green/90">
                                        {bounty.reward} has been successfully authorized and sent directly to your configured Stellar wallet.
                                    </Text>
                                </div>
                            </div>
                            <span className="shrink-0 rounded-lg bg-app-green px-3 py-1.5 text-xs font-semibold text-white">
                                Paid
                            </span>
                        </div>
                    </div>
                )}

                <div className="rounded-2xl border border-gray-100 p-6">
                    <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-primary">
                        Soroban Escrow Work Pipeline
                    </Text>
                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-4">
                        {pipelineSteps.map((step, index) => {
                            const isDone = index < currentStep;
                            const isCurrent = index === currentStep;
                            return (
                                <div key={step} className="flex items-center gap-2">
                                    <span
                                        className={cn(
                                            "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                                            isDone && "bg-app-green/10 text-app-green",
                                            isCurrent && "bg-app-primary text-white",
                                            !isDone && !isCurrent && "bg-gray-100 text-app-grey-light"
                                        )}
                                    >
                                        {isDone ? <Check className="size-3.5" /> : index + 1}
                                    </span>
                                    <span className={cn("text-sm", isCurrent ? "font-semibold text-app-dark-purple" : "text-app-grey-light")}>
                                        {step}
                                    </span>
                                    {index < pipelineSteps.length - 1 && <span className="ml-2 h-px w-6 bg-gray-100" />}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {stage === "working" ? (
                    <>
                        <div className="rounded-2xl border border-gray-100 p-6">
                            <Text as="h2" className="text-base font-bold text-app-dark-purple">Technical Deliverable Checklist</Text>
                            <div className="mt-3 flex flex-col gap-3">
                                {bounty.requirements.map((item, index) => (
                                    <label key={item} className="flex items-start gap-2 text-sm text-app-dark-purple">
                                        <input
                                            type="checkbox"
                                            checked={checked[index]}
                                            onChange={() => toggleItem(index)}
                                            className="mt-0.5 size-4 rounded border-gray-300 accent-app-primary"
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 p-6">
                            <Text as="h2" className="text-base font-bold text-app-dark-purple">Attach Deliverables</Text>

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(event) => event.preventDefault()}
                                onDrop={(event) => {
                                    event.preventDefault();
                                    handleFiles(event.dataTransfer.files);
                                }}
                                className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-10 text-center hover:border-app-primary/40"
                            >
                                <UploadCloud className="size-6 text-app-primary" />
                                <Text as="p" className="text-sm font-medium text-app-dark-purple">Drag &amp; drop zip, ts, or json files</Text>
                                <Text as="p" className="text-xs text-app-grey-light">Supported formats: ZIP, TS, JS, JSON (max 50MB)</Text>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={(event) => handleFiles(event.target.files)}
                                />
                            </div>

                            {files.length > 0 && (
                                <div className="mt-4 flex flex-col gap-2">
                                    {files.map((file) => (
                                        <div
                                            key={file.name}
                                            className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FileText className="size-4 text-app-grey-light" />
                                                <div>
                                                    <Text as="p" className="text-sm font-medium text-app-dark-purple">{file.name}</Text>
                                                    <Text as="p" className="text-xs text-app-grey-light">
                                                        {file.size} • {file.time}
                                                    </Text>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(file.name)}
                                                className="text-app-red hover:opacity-70"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="rounded-2xl border border-gray-100 p-6">
                            <Text as="h2" className="text-base font-bold text-app-dark-purple">Submission Comments</Text>
                            <textarea
                                rows={3}
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                                placeholder="Explain what you accomplished, attach Stellar transaction hashes if needed, or link a PR."
                                className="mt-3 w-full rounded-[6px] border border-app-light-primary bg-white px-3.5 py-2.5 text-sm text-app-dark-purple outline-none transition-colors placeholder:text-app-grey-light focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20"
                            />
                            <SubmitWorkModal
                                trigger={
                                    <AppButton variant="primary" className="mt-4">
                                        Submit for Soroban Review
                                    </AppButton>
                                }
                                files={files.map((file) => file.name)}
                                posterName={bounty.poster}
                                onConfirm={async () => {
                                    await submitWork.mutateAsync({
                                        submission_text: comment,
                                        submission_url: files[0]?.name ?? "",
                                    });
                                    setStage("review");
                                }}
                            />
                        </div>
                    </>
                ) : stage === "review" ? (
                    <div className="rounded-2xl border border-gray-100 p-6">
                        <Text as="h2" className="text-base font-bold text-app-dark-purple">Submission Information</Text>

                        <Text as="p" className="mt-4 text-xs font-semibold uppercase tracking-wide text-app-grey-light">Submitted Files</Text>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {files.map((file) => (
                                <span
                                    key={file.name}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-100 px-3 py-1.5 text-xs text-app-dark-purple"
                                >
                                    <FileText className="size-3.5 text-app-grey-light" />
                                    {file.name}
                                </span>
                            ))}
                        </div>

                        <Text as="p" className="mt-4 text-xs font-semibold uppercase tracking-wide text-app-grey-light">Submission Message</Text>
                        <div className="mt-2 rounded-xl bg-gray-50 p-3 text-sm text-app-dark-purple">
                            {comment || "No additional comments were provided."}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-gray-100 p-6">
                        <Text as="h2" className="text-base font-bold text-app-dark-purple">Work Lifecycle Summary</Text>
                        <div className="mt-3 grid grid-cols-3 gap-4">
                            <div>
                                <Text as="p" className="text-[11px] font-semibold uppercase tracking-wide text-app-grey-light">Claimed Date</Text>
                                <Text as="p" className="mt-1 text-sm font-semibold text-app-dark-purple">March 10, 2026</Text>
                            </div>
                            <div>
                                <Text as="p" className="text-[11px] font-semibold uppercase tracking-wide text-app-grey-light">Submitted Date</Text>
                                <Text as="p" className="mt-1 text-sm font-semibold text-app-dark-purple">March 13, 2026</Text>
                            </div>
                            <div>
                                <Text as="p" className="text-[11px] font-semibold uppercase tracking-wide text-app-grey-light">Payment Authorized</Text>
                                <Text as="p" className="mt-1 text-sm font-semibold text-app-dark-purple">March 15, 2026</Text>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Poster's Rating &amp; Review</Text>
                            <div className="mt-2 flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star key={index} className="size-4 fill-amber-400 text-amber-400" />
                                ))}
                                <span className="ml-1 text-sm font-semibold text-app-dark-purple">5.0 • Exceptional Work</span>
                            </div>
                            <Text as="p" className="mt-2 text-sm text-app-grey-light">
                                &quot;Fantastic code structure, excellent test coverage, and Soroban sandbox compliance is spotless. The developer resolved the Albedo browser signature disconnect issue seamlessly. Highly recommended contributor.&quot;
                            </Text>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-6 md:self-start">
                {stage === "review" && (
                    <div className="rounded-2xl border border-gray-100 p-6">
                        <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Review Progress</Text>
                        <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-app-dark-purple">
                            <Clock className="size-4 text-app-grey-light" />
                            ~48 hours remaining
                        </div>
                        <Text as="p" className="mt-1 text-xs text-app-grey-light">Est. decision by March 18, 2026</Text>
                    </div>
                )}

                {stage === "paid" ? (
                    <div className="rounded-2xl border border-gray-100 p-6">
                        <Text as="h2" className="text-sm font-bold text-app-dark-purple">Secure Payout Information</Text>
                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-app-grey-light">Reward Disbursed</span>
                            <span className="font-semibold text-app-dark-purple">{bounty.reward}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-app-grey-light">Gas fee offset</span>
                            <span className="font-semibold text-app-green">+0.05 XLM</span>
                        </div>

                        <PaymentReceivedModal
                            trigger={
                                <AppButton
                                    variant="primary"
                                    className="mt-4 w-full justify-center bg-app-light-primary text-app-primary hover:bg-app-light-primary/70"
                                >
                                    View Payment Details
                                </AppButton>
                            }
                            amount={bounty.reward}
                            fromName={bounty.poster}
                            toAddress="GD7X...4E63"
                            escrowId="s_escrow_84ef2a"
                            txHash="84ef2a...91bc"
                        />
                    </div>
                ) : (
                    <div className="rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-app-green">
                            <span className="size-1.5 rounded-full bg-app-green" />
                            Funded &amp; Secured
                        </span>
                        <span className="text-app-grey-light">Soroban Escrow</span>
                    </div>

                    <Text as="p" className="mt-4 text-xs text-app-grey-light">Guaranteed Reward</Text>
                    <Text as="p" className="mt-1 text-2xl font-bold text-app-dark-purple">{bounty.reward}</Text>
                    <Text as="p" className="mt-1 text-xs font-medium text-app-green">Verified Soroban Lock ID: s_escrow_84ef2a...</Text>

                    <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm">
                        <Clock className="size-4 shrink-0 text-app-grey-light" />
                        <div>
                            <Text as="p" className="font-semibold text-app-dark-purple">
                                {stage === "review" ? "Under Review" : bounty.daysLeft}
                            </Text>
                            <Text as="p" className="text-xs text-app-grey-light">Deadline: {bounty.deadline}</Text>
                        </div>
                    </div>
                </div>
                )}

                <div className="rounded-2xl border border-gray-100 p-6">
                    <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Posted By</Text>
                    <div className="mt-3 flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-app-primary text-sm font-semibold text-white">
                            {bounty.poster.charAt(0)}
                        </span>
                        <div>
                            <Text as="p" className="text-sm font-semibold text-app-dark-purple">{bounty.poster}</Text>
                            <Text as="p" className="text-xs text-app-grey-light">Reputation Score: 99% (Excellent)</Text>
                        </div>
                    </div>
                </div>

                {stage === "working" && (
                    <div className="rounded-2xl border border-gray-100 p-6">
                        <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Workspace History</Text>
                        <div className="mt-3 flex flex-col gap-3">
                            <div className="flex items-start gap-2">
                                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-app-primary" />
                                <div>
                                    <Text as="p" className="text-sm text-app-dark-purple">Claimed workspace assigned</Text>
                                    <Text as="p" className="text-xs text-app-grey-light">3 days ago</Text>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gray-300" />
                                <div>
                                    <Text as="p" className="text-sm text-app-dark-purple">Soroban verification setup completed</Text>
                                    <Text as="p" className="text-xs text-app-grey-light">3 days ago</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkspaceDetails;
