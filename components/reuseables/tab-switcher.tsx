"use client"

import { cn } from "cn"

type TabSwitcherProps = {
    tabs: string[]
    activeTab: string
    onTabChange: (tab: string) => void
    className?: string
}

const TabSwitcher = ({ tabs, activeTab, onTabChange, className }: TabSwitcherProps) => {
    return (
        <div className={cn("flex items-center gap-8 border-b border-gray-100", className)}>
            {tabs.map((tab) => {
                const isActive = tab === activeTab
                return (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => onTabChange(tab)}
                        className={cn(
                            "relative pb-3 text-sm font-medium transition-colors",
                            isActive ? "font-semibold text-app-primary" : "text-app-grey-light hover:text-app-dark-purple"
                        )}
                    >
                        {tab}
                        {isActive && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-app-primary" />}
                    </button>
                )
            })}
        </div>
    )
}

export { TabSwitcher }
export type { TabSwitcherProps }
