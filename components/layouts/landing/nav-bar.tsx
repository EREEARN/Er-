"use client";

import React from "react";
import Image from "next/image";
import { AppImages } from "@/assets/app_images";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { AppButton } from "@/components/reuseables/app-button";
import { ConnectWalletModal } from "@/components/reuseables/connect-wallet-modal";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
    { label: "How It Works", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
];

const NavBar = () => {
    const pathname = usePathname();

    return (
       <div className="sticky top-4 z-50 max-w-[1200px] w-[calc(100%-2rem)] my-4 mx-auto bg-app-light-primary h-[70px] md:h-[80px] rounded-[16px] px-4 md:px-[22px] items-center flex justify-between">
        <Image src={AppImages.logo} alt="EreEarn" width={110} height={52} className="h-auto w-[90px] md:w-[110px]" />

        <nav className="hidden md:block w-fit">
            <ul className="flex gap-8">
                {navLinks.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                            className={
                                pathname === link.href
                                    ? "font-medium text-app-dark-purple hover:text-app-primary"
                                    : "text-app-grey-light hover:text-app-primary"
                            }
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>

        <div className="hidden md:flex gap-3 items-center w-fit">
            <Link href="#login" className="text-app-dark-purple font-semibold hover:text-app-primary">Post Bounty</Link>
            <ConnectWalletModal trigger={<AppButton variant="primary">Connect Wallet</AppButton>} />
        </div>

        <div className="flex md:hidden items-center gap-2">
            <AppButton variant="primary" className="h-8 px-3 text-xs">Post</AppButton>
            <Sheet>
                <SheetTrigger render={
                    <button aria-label="Open menu" className="flex size-8 items-center justify-center text-app-dark-purple">
                        <Menu className="size-5" />
                    </button>
                } />
                <SheetContent side="right">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 px-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={
                                    pathname === link.href
                                        ? "font-medium text-app-dark-purple hover:text-app-primary"
                                        : "text-app-grey-light hover:text-app-primary"
                                }
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="#login" className="font-semibold text-app-dark-purple hover:text-app-primary">Post Bounty</Link>
                        <AppButton variant="primary" className="w-full">Connect Wallet</AppButton>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
       </div>
    );
};

export default NavBar;