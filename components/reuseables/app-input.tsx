import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

type AppInputProps = InputPrimitive.Props & {
    label?: string
    error?: string
    icon?: React.ReactNode
    rightSlot?: React.ReactNode
}

const AppInput = React.forwardRef<HTMLElement, AppInputProps>(
    ({ label, error, icon, rightSlot, className, id, ...props }, ref) => {
        const inputId = id ?? props.name

        return (
            <div className="flex w-full flex-col gap-1.5">
                {label && (
                    <label htmlFor={inputId} className="text-sm font-medium text-app-dark-purple">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-app-grey-light">
                            {icon}
                        </span>
                    )}
                    <InputPrimitive
                        ref={ref}
                        id={inputId}
                        data-slot="app-input"
                        className={cn(
                            "h-10 w-full rounded-[6px] border border-app-light-primary bg-white px-3.5 text-sm text-app-dark-purple outline-none transition-colors placeholder:text-app-grey-light focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
                            icon && "pl-9",
                            rightSlot && "pr-14",
                            error && "border-app-red focus-visible:border-app-red focus-visible:ring-app-red/20",
                            className
                        )}
                        {...props}
                    />
                    {rightSlot && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</span>
                    )}
                </div>
                {error && <span className="text-xs text-app-red">{error}</span>}
            </div>
        )
    }
)
AppInput.displayName = "AppInput"

export { AppInput }
export type { AppInputProps }
