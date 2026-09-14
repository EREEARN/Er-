"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "cn"

type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

const Pagination = ({ currentPage, totalPages, onPageChange, className }: PaginationProps) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="flex size-8 items-center justify-center rounded-full border border-gray-200 text-app-dark-purple disabled:opacity-40"
            >
                <ArrowLeft className="size-4" />
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={cn(
                        "flex size-8 items-center justify-center rounded-lg text-sm font-medium",
                        page === currentPage
                            ? "bg-app-primary text-white"
                            : "border border-gray-200 text-app-dark-purple"
                    )}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="flex size-8 items-center justify-center rounded-full border border-gray-200 text-app-dark-purple disabled:opacity-40"
            >
                <ArrowRight className="size-4" />
            </button>
        </div>
    )
}

export { Pagination }
export type { PaginationProps }
