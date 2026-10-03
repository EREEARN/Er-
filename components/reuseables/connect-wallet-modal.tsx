"use client"

import { useState } from "react"
import type { ReactElement } from "react"
import { Text } from "@/components/reuseables/text"
import {
    CircleCheck,
    CircleX,
    Copy,
    Loader2,
    Wallet,
} from "lucide-react"
import Link from "next/link"
import { AppModal } from "@/components/reuseables/app-modal"
import { AppButton } from "@/components/reuseables/app-button"
import { AppInput } from "@/components/reuseables/app-input"
import { cn } from "cn"
import { useAuthChallenge, useVerifyAuth } from "@/hooks/use-auth"
import { getApiErrorMessage } from "@/lib/api/api-error"
import type { UserRole } from "@/lib/api/types"
import { initStellarWalletsKit, isStellarWalletsKitError, StellarWalletsKit } from "@/lib/stellar-wallets-kit"

type Step = "connect" | "verifying" | "connected" | "failed"

type ConnectWalletModalProps = {
    trigger: ReactElement
}

function truncateAddress(address: string) {
    if (address.length <= 12) return address
    return `${address.slice(0, 6)}...${address.slice(-6)}`
}

const ConnectWalletModal = ({ trigger }: ConnectWalletModalProps) => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<Step>("connect")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState<UserRole>("CONTRIBUTOR")
    const [status, setStatus] = useState("")
    const [kitErrorMessage, setKitErrorMessage] = useState<string | null>(null)

    const authChallenge = useAuthChallenge()
    const verifyAuth = useVerifyAuth()

    const reset = () => {
        setStep("connect")
        setUsername("")
        setRole("CONTRIBUTOR")
        setKitErrorMessage(null)
        authChallenge.reset()
        verifyAuth.reset()
    }

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)
        if (!nextOpen) reset()
    }

    const handleConnect = async () => {
        setStep("verifying")
        setKitErrorMessage(null)
        try {
            initStellarWalletsKit()

            setStatus("Connecting to your wallet...")
            const { address } = await StellarWalletsKit.authModal()

            setStatus("Requesting sign-in challenge...")
            const challenge = await authChallenge.mutateAsync(address)

            setStatus("Waiting for signature in your wallet...")
            const { signedMessage } = await StellarWalletsKit.signMessage(challenge.message, { address })

            setStatus("Verifying signature...")
            await verifyAuth.mutateAsync({
                wallet_address: address,
                signature: signedMessage,
                role,
                username: username || null,
            })

            setStep("connected")
        } catch (err) {
            if (isStellarWalletsKitError(err) && err.code === -1) {
                // user closed the wallet-picker modal, just go back
                setStep("connect")
                return
            }
            setKitErrorMessage(isStellarWalletsKitError(err) ? err.message : null)
            setStep("failed")
        }
    }

    return (
        <AppModal trigger={trigger} open={open} onOpenChange={handleOpenChange}>
            {step === "connect" && (
                <div>
                    <Text as="h2" className="text-lg font-bold text-app-dark-purple">Connect Your Wallet</Text>
                    <Text as="p" className="mt-1 text-sm text-app-grey-light">
                        Connect with Freighter, Albedo, xBull, Lobstr and other Stellar wallets.
                    </Text>

                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
                        <span className="size-1.5 shrink-0 rounded-full bg-amber-500" />
                        Currently using Stellar Soroban Testnet Network Only
                    </div>

                    <div className="mt-4 flex flex-col gap-4">
                        <AppInput
                            label="Username (optional, first-time only)"
                            placeholder="alex"
                            value={username}
                            onValueChange={setUsername}
                        />

                        <div>
                            <span className="text-sm font-medium text-app-dark-purple">Role (first-time only)</span>
                            <div className="mt-2 grid grid-cols-2 gap-3">
                                {(["CONTRIBUTOR", "POSTER"] as const).map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setRole(option)}
                                        className={cn(
                                            "rounded-xl border p-3 text-left text-sm font-semibold transition-colors",
                                            role === option
                                                ? "border-app-primary bg-app-light-primary/40 text-app-primary"
                                                : "border-gray-200 text-app-dark-purple"
                                        )}
                                    >
                                        {option === "CONTRIBUTOR" ? "Contributor" : "Poster"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <AppButton
                        variant="primary"
                        className="mt-5 w-full justify-center"
                        onClick={handleConnect}
                    >
                        Connect Wallet
                    </AppButton>
                </div>
            )}

            {step === "verifying" && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-app-light-primary text-app-primary">
                        <Wallet className="size-6" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Connecting Wallet</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">{status}</Text>

                    <div className="mt-5 flex items-center gap-2 rounded-full bg-app-light-primary px-4 py-2 text-sm font-medium text-app-primary">
                        <Loader2 className="size-4 animate-spin" />
                        Please check your wallet
                    </div>
                </div>
            )}

            {step === "connected" && verifyAuth.data && (
                <div className="flex flex-col items-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-app-green/10 text-app-green">
                        <CircleCheck className="size-7" />
                    </span>
                    <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Wallet Connected!</Text>
                    <Text as="p" className="mt-2 text-sm text-app-grey-light">
                        {verifyAuth.data.created ? "Your account has been created." : "You're signed back in."}
                    </Text>

                    <div className="mt-5 w-full rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between px-4 py-3">
                            <span className="text-sm text-app-grey-light">Address</span>
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-app-dark-purple">
                                {truncateAddress(verifyAuth.data.user.wallet_address)}
                                <Copy className="size-3.5 text-app-grey-light" />
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                            <span className="text-sm text-app-grey-light">Network</span>
                            <span className="text-sm font-semibold text-app-green">Stellar Testnet</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                            <span className="text-sm text-app-grey-light">Role</span>
                            <span className="text-sm font-semibold text-app-dark-purple">
                                {verifyAuth.data.user.role === "CONTRIBUTOR" ? "Contributor" : "Poster"}
                            </span>
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
                        We couldn&apos;t connect your wallet. Please check the details below and try again.
                    </Text>

                    <div className="mt-5 w-full rounded-xl bg-gray-50 p-4 text-left">
                        <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Error Details</Text>
                        <Text as="p" className="mt-1 text-sm font-medium text-app-red">
                            {kitErrorMessage ?? getApiErrorMessage(verifyAuth.error ?? authChallenge.error)}
                        </Text>
                    </div>

                    <div className="mt-5 flex w-full flex-col gap-3">
                        <AppButton variant="primary" className="w-full justify-center" onClick={handleConnect}>
                            Try Again
                        </AppButton>
                        <AppButton variant="outline" color="#111827" className="w-full justify-center" onClick={reset}>
                            Cancel
                        </AppButton>
                    </div>
                </div>
            )}
        </AppModal>
    )
}

export { ConnectWalletModal }
export type { ConnectWalletModalProps }


