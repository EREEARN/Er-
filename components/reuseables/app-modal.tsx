"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "cn"

type AppModalProps = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    trigger?: React.ReactElement
    title?: React.ReactNode
    description?: React.ReactNode
    footer?: React.ReactNode
    children?: React.ReactNode
    className?: string
    showCloseButton?: boolean
}

const AppModal = ({
    open,
    onOpenChange,
    trigger,
    title,
    description,
    footer,
    children,
    className,
    showCloseButton = true,
}: AppModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger render={trigger} />}
            <DialogContent showCloseButton={showCloseButton} className={cn("max-w-md rounded-2xl p-6", className)}>
                {(title || description) && (
                    <DialogHeader>
                        {title && <DialogTitle className="text-lg font-bold text-app-dark-purple">{title}</DialogTitle>}
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                )}

                {children}

                {footer && <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">{footer}</div>}
            </DialogContent>
        </Dialog>
    )
}

export { AppModal }
export type { AppModalProps }
