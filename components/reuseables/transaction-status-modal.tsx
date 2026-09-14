"use client"

import Link from "next/link"
import { CircleCheck, Clock, Copy, ExternalLink, Loader2, TriangleAlert } from "lucide-react"
import { AppModal } from "@/components/reuseables/app-modal"
import { AppButton } from "@/components/reuseables/app-button"
import { cn } from "cn"
import { Text } from "@/components/reuseables/text"

type TransactionStatus = "pending" | "success" | "failed"

type TransactionStatusModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    variant?: "large" | "compact"
    status: TransactionStatus
    title: string
    description: string
    hash?: string
    estimatedTime?: string
    reason?: string
    explorerHref?: string
    dashboardHref?: string
    onRetry?: () => void
}

const iconByStatus = {
    pending: Loader2,
    success: CircleCheck,
    failed: TriangleAlert,
}

const circleClassByStatus: Record<TransactionStatus, string> = {
    pending: "bg-app-light-primary text-app-primary",
    success: "bg-app-green/10 text-app-green",
    failed: "bg-app-red/10 text-app-red",
}

const subtitleClassByStatus: Record<TransactionStatus, string> = {
    pending: "text-amber-600",
    success: "text-app-green",
    failed: "text-app-red",
}

const defaultSubtitleByStatus: Record<TransactionStatus, string> = {
    pending: "Awaiting ledger consensus",
    success: "Escrow Confirmed",
    failed: "Ledger Refusal",
}

const TransactionStatusModal = ({
    open,
    onOpenChange,
    variant = "compact",
    status,
    title,
    description,
    hash,
    estimatedTime,
    reason,
    explorerHref = "#",
    dashboardHref = "/dashboard",
    onRetry,
}: TransactionStatusModalProps) => {
    const Icon = iconByStatus[status]

    if (variant === "large") {
        return (
            <AppModal open={open} onOpenChange={onOpenChange}>
                <div className="flex flex-col items-center text-center">
                    <span className={cn("flex size-16 items-center justify-center rounded-full", circleClassByStatus[status])}>
                        <Icon className={cn("size-7", status === "pending" && "animate-spin")} />
                    </span>
                    <Text as="h2" className="mt-4 text-2xl font-bold text-app-dark-purple">{title}</Text>
                    <Text as="p" className="mt-2 max-w-sm text-sm text-app-grey-light">{description}</Text>

                    {(hash || estimatedTime) && (
                        <div className="mt-5 w-full divide-y divide-gray-100 rounded-xl bg-gray-50">
                            {hash && (
                                <div className="flex items-center justify-between px-4 py-3 text-sm">
                                    <span className="text-app-grey-light">Transaction Hash</span>
                                    <span className="inline-flex items-center gap-1.5 font-semibold text-app-dark-purple">
                                        {hash}
                                        <Copy className="size-3.5 text-app-grey-light" />
                                    </span>
                                </div>
                            )}
                            {estimatedTime && (
                                <div className="flex items-center justify-between px-4 py-3 text-sm">
                                    <span className="text-app-grey-light">Estimated Time</span>
                                    <span className="inline-flex items-center gap-1.5 font-semibold text-amber-600">
                                        <Clock className="size-3.5" />
                                        {estimatedTime}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <AppButton
                        variant="outline"
                        color="#111827"
                        render={<a href={explorerHref} target="_blank" rel="noreferrer" />}
                        className="mt-5 gap-1.5"
                    >
                        View on Stellar Explorer
                        <ExternalLink className="size-3.5" />
                    </AppButton>

                    <Text as="p" className="mt-3 text-sm text-app-grey-light">
                        Or go back to{" "}
                        <Link href={dashboardHref} className="font-semibold text-app-primary hover:underline">
                            Dashboard
                        </Link>
                    </Text>
                </div>
            </AppModal>
        )
    }

    return (
        <AppModal open={open} onOpenChange={onOpenChange}>
            <div className="flex items-start gap-3">
                <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full", circleClassByStatus[status])}>
                    <Icon className={cn("size-5", status === "pending" && "animate-spin")} />
                </span>
                <div>
                    <Text as="h2" className="text-base font-bold text-app-dark-purple">{title}</Text>
                    <Text as="p" className={cn("text-xs font-semibold", subtitleClassByStatus[status])}>
                        {status === "pending" && estimatedTime ? `Estimated time: ${estimatedTime}` : defaultSubtitleByStatus[status]}
                    </Text>
                </div>
            </div>

            <Text as="p" className="mt-3 text-sm text-app-grey-light">{description}</Text>

            {status === "failed" ? (
                <div className="mt-3 rounded-lg bg-app-red/10 px-3 py-2 text-sm font-medium text-app-red">Reason: {reason}</div>
            ) : (
                hash && (
                    <div className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-sm">
                        <span className="text-app-grey-light">Hash: </span>
                        <span className="font-semibold text-app-dark-purple">{hash}</span>
                    </div>
                )
            )}

            <div className="mt-4 flex items-center justify-between">
                <a href={status === "failed" ? "#" : explorerHref} className="text-sm font-medium text-app-primary hover:underline">
                    {status === "failed" ? "Contact Support" : "View on Explorer"}
                </a>

                {status === "success" && (
                    <AppButton variant="primary" render={<Link href={dashboardHref} />}>
                        Back to Dashboard
                    </AppButton>
                )}

                {status === "failed" && (
                    <AppButton variant="primary" className="bg-app-red hover:bg-app-red/90" onClick={onRetry}>
                        Retry Deposit
                    </AppButton>
                )}
            </div>
        </AppModal>
    )
}

export { TransactionStatusModal }
export type { TransactionStatusModalProps, TransactionStatus }
