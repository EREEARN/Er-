"use client"

import { useEffect, useState } from "react"
import type { ReactElement } from "react"
import Link from "next/link"
import { AlertTriangle, CircleCheck, LoaderCircle } from "lucide-react"
import { AppModal } from "@/components/reuseables/app-modal"
import { AppButton } from "@/components/reuseables/app-button"
import { Text } from "@/components/reuseables/text"
import { useClaimBounty } from "@/hooks/use-bounties"
import { useAuthStore } from "@/lib/auth-store"
import type { Bounty } from "@/lib/bounties"

type Step = "network" | "confirm" | "processing" | "claimed"

type ClaimBountyModalProps = {
    trigger: ReactElement
    bounty: Bounty
}

const ClaimBountyModal = ({ trigger, bounty }: ClaimBountyModalProps) => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<Step>("network")
    const [agreed, setAgreed] = useState(false)
    const [claimError, setClaimError] = useState<string | null>(null)
    const claimBounty = useClaimBounty()
    const walletAddress = useAuthStore((state) => state.user?.wallet_address)

    const reset = () => {
        setStep("network")
        setAgreed(false)
        setClaimError(null)
    }

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)
        if (!nextOpen) {
            reset()
        }
    }

    useEffect(() => {
        if (step !== "processing") return

        claimBounty.mutate(bounty.id, {
            onSuccess: () => setStep("claimed"),
            onError: (error) => {
                setClaimError(error instanceof Error ? error.message : "Unable to claim this bounty. Please try again.")
                setStep("confirm")
            },
        })
        // Only re-run when the step transitions into "processing".
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step])

    return (
        <AppModal trigger={trigger} open={open} onOpenChange={handleOpenChange} showCloseButton={step === "confirm"}>
            {step === "network" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                        <AlertTriangle className="size-6" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Wrong Network</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">
                        ÉreEARN operates securely on the Stellar Testnet using Soroban smart contracts. Please switch your wallet network to continue.
                    </Text>

                    <div className="mt-5 grid w-full grid-cols-2 gap-3">
                        <div className="rounded-xl bg-gray-50 p-3 text-left">
                            <Text as="p" className="text-xs text-app-grey-light">Current</Text>
                            <span className="mt-1 inline-block rounded-full bg-app-red/10 px-2.5 py-1 text-xs font-semibold text-app-red">
                                Mainnet
                            </span>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-3 text-left">
                            <Text as="p" className="text-xs text-app-grey-light">Required</Text>
                            <span className="mt-1 inline-block rounded-full bg-app-green/10 px-2.5 py-1 text-xs font-semibold text-app-green">
                                Soroban Testnet
                            </span>
                        </div>
                    </div>

                    <AppButton variant="primary" className="mt-5 w-full justify-center" onClick={() => setStep("confirm")}>
                        Switch to Testnet
                    </AppButton>
                    <a href="#" className="mt-3 text-sm font-medium text-app-primary hover:underline">
                        How to configure Soroban Testnet? ↗
                    </a>
                </div>
            )}

            {step === "confirm" && (
                <div>
                    <Text as="h2" className="text-lg font-bold text-app-dark-purple">Claim This Bounty?</Text>
                    <div className="mt-4 -mx-6 border-t border-gray-100" />

                    <div className="mt-4 rounded-xl bg-gray-50 p-4">
                        <Text as="p" className="text-sm font-bold text-app-dark-purple">{bounty.title}</Text>
                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-app-grey-light">Guaranteed Reward:</span>
                            <span className="font-semibold text-app-dark-purple">{bounty.reward}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-app-grey-light">Deadline:</span>
                            <span className="font-semibold text-app-red">{bounty.deadline}</span>
                        </div>
                    </div>

                    <Text as="p" className="mt-4 text-xs font-semibold uppercase tracking-wide text-app-grey-light">
                        Requirements Commitments
                    </Text>
                    <label className="mt-2 flex items-start gap-2 text-sm text-app-dark-purple">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(event) => setAgreed(event.target.checked)}
                            className="mt-0.5 size-4 rounded border-gray-300 accent-app-primary"
                        />
                        {bounty.requirements[0]}
                    </label>

                    <div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
                        By claiming, you commit to completing this bounty by the deadline. Failure to deliver may affect your reputation score.
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-app-grey-light">Stellar Account Address:</span>
                        <span className="font-semibold text-app-primary">{walletAddress ?? "Not connected"}</span>
                    </div>

                    {claimError && (
                        <div className="mt-4 rounded-xl bg-app-red/10 p-3 text-sm font-medium text-app-red">{claimError}</div>
                    )}

                    <div className="mt-5 flex gap-3">
                        <AppButton
                            variant="outline"
                            color="#111827"
                            className="flex-1 justify-center"
                            onClick={() => handleOpenChange(false)}
                        >
                            Cancel
                        </AppButton>
                        <AppButton
                            variant="primary"
                            className="flex-1 justify-center"
                            disabled={!agreed}
                            onClick={() => setStep("processing")}
                        >
                            Confirm Claim
                        </AppButton>
                    </div>
                </div>
            )}

            {step === "processing" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-app-light-primary text-app-primary">
                        <LoaderCircle className="size-7 animate-spin" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Processing Claim...</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">Recording your claim on Stellar Testnet Ledger</Text>

                    <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full w-2/5 rounded-full bg-app-primary" />
                    </div>

                    <div className="mt-4 w-full rounded-lg bg-gray-50 py-2 text-center text-sm text-app-grey-light">
                        Tx Hash: 0x8ef2...74a2b
                    </div>
                </div>
            )}

            {step === "claimed" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-app-green/10 text-app-green">
                        <CircleCheck className="size-7" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Bounty Claimed!</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">
                        You have successfully claimed this bounty on ÉreEARN testnet. Your developer workspace is now active.
                    </Text>

                    <div className="mt-5 w-full rounded-xl border border-gray-100 p-4 text-left">
                        <Text as="p" className="text-sm font-bold text-app-dark-purple">{bounty.title}</Text>
                        <Text as="p" className="mt-1 text-sm font-semibold text-app-red">
                            Deadline: {bounty.deadline} ({bounty.daysLeft.replace("left", "remaining")})
                        </Text>
                    </div>

                    <AppButton
                        variant="primary"
                        render={<Link href="/dashboard/wallet" />}
                        className="mt-5 w-full justify-center"
                        onClick={() => handleOpenChange(false)}
                    >
                        Go to Workspace
                    </AppButton>
                    <AppButton variant="outline" color="#111827" className="mt-3 w-full justify-center">
                        View on Explorer
                    </AppButton>
                </div>
            )}
        </AppModal>
    )
}

export { ClaimBountyModal }
export type { ClaimBountyModalProps }
