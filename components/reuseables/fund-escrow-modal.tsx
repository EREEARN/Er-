"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CircleCheck, LoaderCircle } from "lucide-react"
import { AppModal } from "@/components/reuseables/app-modal"
import { AppButton } from "@/components/reuseables/app-button"
import { Text } from "@/components/reuseables/text"

type FundEscrowModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    bountyAmount: number
    platformFeePercent: number
    walletBalance: number
    escrowAddress: string
}

const FundEscrowModal = ({
    open,
    onOpenChange,
    bountyAmount,
    platformFeePercent,
    walletBalance,
    escrowAddress,
}: FundEscrowModalProps) => {
    const [stage, setStage] = useState<"confirm" | "processing" | "published">("confirm")
    const fee = Math.round(bountyAmount * (platformFeePercent / 100) * 100) / 100
    const total = bountyAmount + fee

    useEffect(() => {
        if (!open) {
            setStage("confirm")
        }
    }, [open])

    useEffect(() => {
        if (stage !== "processing") return

        const timeout = setTimeout(() => setStage("published"), 2500)
        return () => clearTimeout(timeout)
    }, [stage])

    return (
        <AppModal open={open} onOpenChange={onOpenChange} showCloseButton={stage === "confirm"}>
            {stage === "confirm" && (
                <div>
                    <Text as="h2" className="text-lg font-bold text-app-dark-purple">Fund Your Bounty</Text>
                    <Text as="p" className="mt-1 text-sm text-app-grey-light">
                        You are locking funds natively in a Stellar smart escrow contract.
                    </Text>

                    <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-app-grey-light">Bounty Escrow Amount</span>
                            <span className="font-semibold text-app-dark-purple">{bountyAmount.toLocaleString()} XLM</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-app-grey-light">Platform Service Fee ({platformFeePercent}%)</span>
                            <span className="font-semibold text-app-dark-purple">{fee.toLocaleString()} XLM</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3">
                            <span className="font-semibold text-app-dark-purple">Total Payable</span>
                            <span className="font-bold text-app-primary">{total.toLocaleString()} XLM</span>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-app-grey-light">Your Wallet Balance</span>
                        <span className="font-semibold text-app-green">{walletBalance.toLocaleString()} XLM</span>
                    </div>

                    <div className="mt-4 rounded-xl bg-app-light-primary/50 p-3 text-sm text-app-primary">
                        Locked escrow funds are secure and immutable. They cannot be unilaterally withdrawn by either party while the milestone deadline is active.
                    </div>

                    <div className="mt-5 flex gap-3">
                        <AppButton
                            variant="outline"
                            color="#111827"
                            className="flex-1 justify-center"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </AppButton>
                        <AppButton variant="primary" className="flex-1 justify-center" onClick={() => setStage("processing")}>
                            Confirm &amp; Fund
                        </AppButton>
                    </div>
                </div>
            )}

            {stage === "processing" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-app-light-primary text-app-primary">
                        <LoaderCircle className="size-7 animate-spin" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Funding Escrow...</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">
                        Transferring {total.toLocaleString()} XLM to the Soroban smart contract. Please do not close this window.
                    </Text>

                    <div className="mt-4 w-full rounded-xl bg-gray-50 p-3 text-left text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-app-grey-light">Network</span>
                            <span className="font-semibold text-amber-600">Stellar Testnet</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-app-grey-light">Tx Hash</span>
                            <span className="font-semibold text-app-primary">fa89...a7e3</span>
                        </div>
                    </div>

                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full w-2/3 rounded-full bg-app-primary" />
                    </div>
                    <div className="mt-2 flex w-full items-center justify-between text-xs text-app-grey-light">
                        <span>Confirming ledger transaction</span>
                        <span className="font-medium text-app-primary">Ledger #45892</span>
                    </div>
                </div>
            )}

            {stage === "published" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-app-green/10 text-app-green">
                        <CircleCheck className="size-7" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Bounty Published!</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">
                        Your bounty is now live on the marketplace. Contributors can view details and start submitting claims.
                    </Text>

                    <div className="mt-5 w-full rounded-xl border border-gray-100 p-4 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-app-grey-light">Escrow Status</span>
                            <span className="font-semibold text-app-green">LOCKED</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-app-grey-light">Amount Funded</span>
                            <span className="font-semibold text-app-dark-purple">{bountyAmount.toLocaleString()} XLM</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-app-grey-light">Stellar Escrow Address</span>
                            <span className="font-semibold text-app-primary">{escrowAddress}</span>
                        </div>
                    </div>

                    <AppButton variant="primary" render={<Link href="/dashboard/my-bounties" />} className="mt-5 w-full justify-center">
                        View Your Bounty
                    </AppButton>
                    <AppButton
                        variant="outline"
                        color="#111827"
                        render={<Link href="/dashboard" />}
                        className="mt-3 w-full justify-center"
                    >
                        Go to Dashboard
                    </AppButton>
                </div>
            )}
        </AppModal>
    )
}

export { FundEscrowModal }
export type { FundEscrowModalProps }
