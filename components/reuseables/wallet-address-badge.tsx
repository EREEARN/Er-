import Image from "next/image";
import { AppImages } from "@/assets/app_images";

type WalletAddressBadgeProps = {
    address: string;
    className?: string;
};

const WalletAddressBadge = ({ address, className }: WalletAddressBadgeProps) => {
    return (
        <div className={`flex items-center gap-2 rounded-full bg-app-light-primary px-3 py-1.5 ${className ?? ""}`}>
            <Image src={AppImages.tokenPurse} alt="" width={16} height={16} />
            <span className="text-sm font-medium text-app-dark-purple">{address}</span>
        </div>
    );
};

export default WalletAddressBadge;
export type { WalletAddressBadgeProps };
