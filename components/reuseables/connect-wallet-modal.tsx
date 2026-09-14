"use client"

import { useEffect, useState } from "react"
import type { ReactElement } from "react"
import { Text } from "@/components/reuseables/text"
import {
    ArrowUpRight,
    ChevronRight,
    CircleCheck,
    CircleX,
    Copy,
    Loader2,
    Signature,
    Wallet,
    Zap,
} from "lucide-react"
import Link from "next/link"
import { AppModal } from "@/components/reuseables/app-modal"
import { AppButton } from "@/components/reuseables/app-button"

const walletOptions = [
    { name: "Freighter Wallet", description: "Secure Stellar browser extension", icon: Wallet, recommended: true },
    { name: "Albedo Client", description: "Seamless keyless web-based signer", icon: Signature, recommended: false },
    { name: "Rabet Extension", description: "Fast & intuitive Soroban portal", icon: Zap, recommended: false },
]

type Step = "select" | "approving" | "connected" | "failed"

type ConnectWalletModalProps = {
    trigger: ReactElement
}

const ConnectWalletModal = ({ trigger }: ConnectWalletModalProps) => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<Step>("select")
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

    const reset = () => {
        setStep("select")
        setSelectedWallet(null)
    }

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)
        if (!nextOpen) {
            reset()
        }
    }

    const handleSelectWallet = (name: string) => {
        setSelectedWallet(name)
        setStep("approving")
    }

    useEffect(() => {
        if (step !== "approving") return

        // Simulated wallet handshake — resolves to either the success or failure screen.
        const timeout = setTimeout(() => {
            setStep(Math.random() > 0.3 ? "connected" : "failed")
        }, 2000)

        return () => clearTimeout(timeout)
    }, [step])

    return (
        <AppModal trigger={trigger} open={open} onOpenChange={handleOpenChange}>
            {step === "select" && (
                <div>
                    <Text as="h2" className="text-lg font-bold text-app-dark-purple">Connect Your Wallet</Text>
                    <Text as="p" className="mt-1 text-sm text-app-grey-light">Choose a wallet to connect to ÉreEARN on Stellar Testnet</Text>

                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
                        <span className="size-1.5 shrink-0 rounded-full bg-amber-500" />
                        Currently using Stellar Soroban Testnet Network Only
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                        {walletOptions.map((wallet) => (
                            <button
                                key={wallet.name}
                                type="button"
                                onClick={() => handleSelectWallet(wallet.name)}
                                className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 text-left transition-colors hover:border-app-primary/40"
                            >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-app-light-primary text-app-primary">
                                    <wallet.icon className="size-5" />
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <Text as="p" className="text-sm font-semibold text-app-dark-purple">{wallet.name}</Text>
                                        {wallet.recommended && (
                                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
                                                Recommended
                                            </span>
                                        )}
                                    </div>
                                    <Text as="p" className="text-xs text-app-grey-light">{wallet.description}</Text>
                                </div>
                                <ChevronRight className="size-4 shrink-0 text-app-grey-light" />
                            </button>
                        ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
                        <span className="text-app-grey-light">New to Stellar Soroban?</span>
                        <a href="#" className="inline-flex items-center gap-1 font-medium text-app-primary hover:underline">
                            What is a wallet? <ArrowUpRight className="size-3.5" />
                        </a>
                    </div>
                </div>
            )}

            {step === "approving" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-app-light-primary text-app-primary">
                        <Wallet className="size-6" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Approve Connection</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">
                        Please approve the connection in your {selectedWallet} extension. This allows ÉreEARN to interact with Soroban contract escrows.
                    </Text>

                    <div className="mt-5 flex items-center gap-2 rounded-full bg-app-light-primary px-4 py-2 text-sm font-medium text-app-primary">
                        <Loader2 className="size-4 animate-spin" />
                        Waiting for approval...
                    </div>

                    <div className="mt-5 w-full border-t border-gray-100 pt-4">
                        <AppButton variant="outline" color="#111827" className="w-full justify-center" onClick={reset}>
                            Cancel Connection
                        </AppButton>
                    </div>
                </div>
            )}

            {step === "connected" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-app-green/10 text-app-green">
                        <CircleCheck className="size-7" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Wallet Connected!</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">Your {selectedWallet} is authenticated.</Text>

                    <div className="mt-5 w-full rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between px-4 py-3">
                            <span className="text-sm text-app-grey-light">Address</span>
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-app-dark-purple">
                                GD7S...6XYZQ
                                <Copy className="size-3.5 text-app-grey-light" />
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                            <span className="text-sm text-app-grey-light">Network</span>
                            <span className="text-sm font-semibold text-app-green">Stellar Testnet</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                            <span className="text-sm text-app-grey-light">Balance</span>
                            <span className="text-sm font-semibold text-app-dark-purple">1,250.00 XLM</span>
                        </div>
                    </div>

                    <AppButton
                        variant="primary"
                        render={<Link href="/dashboard" />}
                        className="mt-5 w-full justify-center"
                        onClick={() => handleOpenChange(false)}
                    >
                        Continue to Dashboard
                    </AppButton>
                </div>
            )}

            {step === "failed" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-app-red/10 text-app-red">
                        <CircleX className="size-7" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Connection Failed</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">
                        Unable to connect to your wallet. Please make sure your extension is unlocked and try again.
                    </Text>

                    <div className="mt-5 w-full rounded-xl bg-gray-50 p-4 text-left">
                        <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Error Details</Text>
                        <Text as="p" className="mt-1 text-sm font-medium text-app-red">User rejected the request (0x4001)</Text>
                    </div>

                    <div className="mt-5 flex w-full flex-col gap-3">
                        <AppButton variant="primary" className="w-full justify-center" onClick={() => setStep("approving")}>
                            Try Again
                        </AppButton>
                        <AppButton variant="outline" color="#111827" className="w-full justify-center" onClick={reset}>
                            Use Different Wallet
                        </AppButton>
                    </div>
                </div>
            )}
        </AppModal>
    )
}

export { ConnectWalletModal }
export type { ConnectWalletModalProps }

