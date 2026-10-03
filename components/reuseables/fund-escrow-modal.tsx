"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CircleCheck, CircleX, LoaderCircle, Wallet } from "lucide-react"
import { AppModal } from "@/components/reuseables/app-modal"
import { AppButton } from "@/components/reuseables/app-button"
import { Text } from "@/components/reuseables/text"
import { useCreateBounty, usePrepareFundBounty } from "@/hooks/use-bounties"
import { getApiErrorMessage } from "@/lib/api/api-error"
import type { CreateBountyPayload } from "@/lib/api/types"
import { initStellarWalletsKit, isStellarWalletsKitError, StellarWalletsKit } from "@/lib/stellar-wallets-kit"

type FundEscrowModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    bountyPayload: CreateBountyPayload
    platformFeePercent: number
}

type Stage = "confirm" | "preparing" | "signing" | "publishing" | "published" | "failed"

const FundEscrowModal = ({
    open,
    onOpenChange,
    bountyPayload,
    platformFeePercent,
}: FundEscrowModalProps) => {
    const [stage, setStage] = useState<Stage>("confirm")
    const [kitErrorMessage, setKitErrorMessage] = useState<string | null>(null)

    const prepareFund = usePrepareFundBounty()
    const createBounty = useCreateBounty()

    const bountyAmount = Number(bountyPayload.reward_amount) || 0
    const fee = Math.round(bountyAmount * (platformFeePercent / 100) * 100) / 100
    const total = bountyAmount + fee

    useEffect(() => {
        if (!open) {
            setStage("confirm")
            setKitErrorMessage(null)
            prepareFund.reset()
            createBounty.reset()
        }
    }, [open])

    const handlePrepare = async () => {
        setStage("preparing")
        setKitErrorMessage(null)
        try {
            const prepared = await prepareFund.mutateAsync(bountyPayload)

            setStage("signing")
            initStellarWalletsKit()
            const { address } = await StellarWalletsKit.getAddress()
            const { signedTxXdr } = await StellarWalletsKit.signTransaction(prepared.xdr, {
                networkPassphrase: prepared.network_passphrase,
                address,
            })

            setStage("publishing")
            await createBounty.mutateAsync({ ...bountyPayload, signed_xdr: signedTxXdr })
            setStage("published")
        } catch (err) {
            if (isStellarWalletsKitError(err) && err.code === -1) {
                // user closed/cancelled the wallet's signing prompt
                setStage("confirm")
                return
            }
            setKitErrorMessage(isStellarWalletsKitError(err) ? err.message : null)
            setStage("failed")
        }
    }

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
                            <span className="font-semibold text-app-dark-purple">{bountyAmount.toLocaleString()} {bountyPayload.reward_asset}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-app-grey-light">Platform Service Fee ({platformFeePercent}%)</span>
                            <span className="font-semibold text-app-dark-purple">{fee.toLocaleString()} {bountyPayload.reward_asset}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3">
                            <span className="font-semibold text-app-dark-purple">Total Payable</span>
                            <span className="font-bold text-app-primary">{total.toLocaleString()} {bountyPayload.reward_asset}</span>
                        </div>
                    </div>

                    <div className="mt-4 rounded-xl bg-app-light-primary/50 p-3 text-sm text-app-primary">
                        Locked escrow funds are secure and immutable. They cannot be unilaterally withdrawn by either party while the milestone deadline is active.
                    </div>

                    {prepareFund.isError && (
                        <Text as="p" className="mt-3 text-sm text-app-red">
                            {getApiErrorMessage(prepareFund.error)}
                        </Text>
                    )}

                    <div className="mt-5 flex gap-3">
                        <AppButton
                            variant="outline"
                            color="#111827"
                            className="flex-1 justify-center"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </AppButton>
                        <AppButton
                            variant="primary"
                            className="flex-1 justify-center"
                            disabled={prepareFund.isPending}
                            onClick={handlePrepare}
                        >
                            {prepareFund.isPending ? "Preparing..." : "Confirm & Fund"}
                        </AppButton>
                    </div>
                </div>
            )}

            {stage === "preparing" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-app-light-primary text-app-primary">
                        <LoaderCircle className="size-7 animate-spin" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Preparing Escrow Transaction...</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">
                        Building the Soroban transaction for your bounty. Please do not close this window.
                    </Text>
                </div>
            )}

            {stage === "signing" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-app-light-primary text-app-primary">
                        <Wallet className="size-7" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Confirm in Your Wallet</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">
                        Approve the escrow transaction in your connected wallet to publish your bounty. Please do not close this window.
                    </Text>
                </div>
            )}

            {stage === "publishing" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-app-light-primary text-app-primary">
                        <LoaderCircle className="size-7 animate-spin" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Publishing Bounty...</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">
                        Submitting your signed transaction to the Soroban smart contract. Please do not close this window.
                    </Text>
                </div>
            )}

            {stage === "published" && createBounty.data && (
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
                            <span className="font-semibold text-app-dark-purple">{bountyAmount.toLocaleString()} {bountyPayload.reward_asset}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-app-grey-light">Escrow Tx Hash</span>
                            <span className="font-semibold text-app-primary">{createBounty.data.escrow_tx_hash}</span>
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

            {stage === "failed" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-app-red/10 text-app-red">
                        <CircleX className="size-7" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Something Went Wrong</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">
                        {kitErrorMessage ?? getApiErrorMessage(createBounty.error ?? prepareFund.error)}
                    </Text>

                    <div className="mt-5 flex w-full flex-col gap-3">
                        <AppButton
                            variant="primary"
                            className="w-full justify-center"
                            onClick={handlePrepare}
                        >
                            Try Again
                        </AppButton>
                        <AppButton variant="outline" color="#111827" className="w-full justify-center" onClick={() => onOpenChange(false)}>
                            Cancel
                        </AppButton>
                    </div>
                </div>
            )}
        </AppModal>
    )
}

export { FundEscrowModal }
export type { FundEscrowModalProps }

