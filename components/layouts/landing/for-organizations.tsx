import Image from "next/image";
import { AppImages } from "@/assets/app_images";
import { Text } from "@/components/reuseables/text";

const benefits = [
    "100% Global coverage: pay anyone, instantly",
    "Smart contract security prevents transaction disputes",
    "Review work before escrow locks are unlocked",
    "Lower administrative costs than traditional freelancing networks",
];

const ForOrganizations = () => {
    return (
        <section className="max-w-[1200px] mx-auto px-6 py-20">
            <div className="flex flex-col gap-10 md:flex-row md:items-center">
                <div className="relative aspect-[394/458] w-full overflow-hidden rounded-xl md:aspect-auto md:w-[45%] md:self-stretch">
                    <Image
                        src={AppImages.featureGraphic}
                        alt="Organization using EreEarn"
                        height={458}
                        width={394}
                        className="object-contain"
                    />
                </div>

                <div className="flex-1">
                    <Text as="p" variant="small" className="font-semibold uppercase tracking-wide text-app-dark-purple">
                        For Organizations
                    </Text>
                    <Text as="h2" variant="h2" className="mt-3 text-app-dark-purple">
                        Scale your team with zero payment overhead
                    </Text>
                    <Text as="p" variant="body" className="mt-4 text-app-grey-light">
                        Connect directly with global talent. Eliminate compliance friction, international wiring fees, and constant contract negotiations through automated Stellar smart-escrows.
                    </Text>

                    <ul className="mt-6 flex flex-col gap-3">
                        {benefits.map((benefit) => (
                            <li key={benefit} className="text-sm text-app-dark-purple">
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ForOrganizations;
