"use client"

import type { ReactElement } from "react"
import Link from "next/link"
import { CircleCheck, ExternalLink } from "lucide-react"
import { AppModal } from "@/components/reuseables/app-modal"
import { AppButton } from "@/components/reuseables/app-button"
import { Text } from "@/components/reuseables/text"

type PaymentReceivedModalProps = {
    trigger: ReactElement
    amount: string
    fromName: string
    toAddress: string
    escrowId: string
    txHash: string
}

const PaymentReceivedModal = ({ trigger, amount, fromName, toAddress, escrowId, txHash }: PaymentReceivedModalProps) => {
    return (
        <AppModal trigger={trigger}>
            <div className="flex flex-col items-center text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-app-green/10 text-app-green">
                    <CircleCheck className="size-7" />
                </span>
                <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Payment Received!</Text>
                <Text as="p" className="mt-2 text-sm text-app-grey-light">The Soroban smart escrow has released locked funds on-chain.</Text>

                <div className="mt-5 w-full rounded-xl bg-app-green/10 p-4 text-center">
                    <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-green">Total Transferred</Text>
                    <Text as="p" className="mt-1 text-2xl font-bold text-app-green">{amount}</Text>
                    <Text as="p" className="mt-1 text-xs text-app-green">No Network Fees Deducted</Text>
                </div>

                <div className="mt-4 flex w-full flex-col gap-2 text-left text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-app-grey-light">From</span>
                        <span className="font-semibold text-app-dark-purple">{fromName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-app-grey-light">To Wallet Address</span>
                        <span className="font-semibold text-app-primary">{toAddress}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-app-grey-light">On-Chain Escrow ID</span>
                        <span className="font-semibold text-app-dark-purple">{escrowId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-app-grey-light">Transaction Hash</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-app-primary">
                            {txHash}
                            <ExternalLink className="size-3.5" />
                        </span>
                    </div>
                </div>

                <div className="mt-5 flex w-full gap-3">
                    <AppButton variant="outline" color="#111827" className="flex-1 justify-center">
                        View on StellarExpert
                    </AppButton>
                    <AppButton variant="primary" render={<Link href="/dashboard" />} className="flex-1 justify-center">
                        Back to Dashboard
                    </AppButton>
                </div>
            </div>
        </AppModal>
    )
}

export { PaymentReceivedModal }
export type { PaymentReceivedModalProps }
