"use client"

import { X } from "lucide-react"
import { cn } from "cn"

type FilterChipProps = {
    label: string
    selected?: boolean
    onRemove?: () => void
    className?: string
}

const FilterChip = ({ label, selected = false, onRemove, className }: FilterChipProps) => {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium",
                selected
                    ? "border-app-primary bg-white text-app-primary"
                    : "border-transparent bg-gray-100 text-gray-700",
                className
            )}
        >
            {label}
            <button
                type="button"
                onClick={onRemove}
                aria-label={`Remove ${label} filter`}
                className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full",
                    selected ? "bg-app-primary text-white" : "bg-gray-500 text-white"
                )}
            >
                <X className="size-2.5" />
            </button>
        </span>
    )
}

export { FilterChip }
export type { FilterChipProps }
