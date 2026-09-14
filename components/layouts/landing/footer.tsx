import Image from "next/image";
import Link from "next/link";
import { AppImages } from "@/assets/app_images";
import { CircleX } from "lucide-react";
import { Text } from "@/components/reuseables/text";

const browseLinks = ["Dev Bounties", "Design", "Content & Copy"];
const resourceLinks = ["Stellar Escrow Docs", "Soroban Guide", "Developer SDK"];
const companyLinks = ["How It works", "Privacy Policy"];

const Footer = () => {
    return (
        <footer className="bg-app-dark-purple">
            <div className="max-w-[1200px] mx-auto px-6 py-14">
                <div className="flex flex-col gap-10 md:flex-row md:justify-between">
                    <div className="max-w-[320px]">
                        <Image src={AppImages.group2} alt="EreEarn" width={140} height={66} />
                        <Text as="p" className="mt-4 text-sm text-white/50">
                            The premier decentralized marketplace for funded tech development bounties, secured by Stellar Escrow.
                        </Text>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        <div>
                            <Text as="h3" className="mb-4 text-sm font-semibold text-white">Browse</Text>
                            <ul className="flex flex-col gap-3">
                                {browseLinks.map((label) => (
                                    <li key={label}>
                                        <Link href="#" className="text-sm text-white/50 hover:text-white">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <Text as="h3" className="mb-4 text-sm font-semibold text-white">Resources</Text>
                            <ul className="flex flex-col gap-3">
                                {resourceLinks.map((label) => (
                                    <li key={label}>
                                        <Link href="#" className="text-sm text-white/50 hover:text-white">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <Text as="h3" className="mb-4 text-sm font-semibold text-white">Company</Text>
                            <ul className="flex flex-col gap-3">
                                {companyLinks.map((label) => (
                                    <li key={label}>
                                        <Link href="#" className="text-sm text-white/50 hover:text-white">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <Text as="p" className="text-xs text-white/40">© 2026 ÉreEARN . Powered by Stellar Blockchain.</Text>
                        <div className="flex items-center gap-4 text-white/50">
                            <Link href="#" aria-label="Twitter" className="hover:text-white">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.163-1.227.163-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                                </svg>
                            </Link>
                            <Link href="#" aria-label="GitHub" className="hover:text-white">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                            </Link>
                            <Link href="#" aria-label="More">
                                <CircleX className="size-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
