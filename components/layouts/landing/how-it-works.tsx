import Image from "next/image";
import { AppImages } from "@/assets/app_images";
import { Text } from "@/components/reuseables/text";

const steps = [
    {
        title: "Post",
        description:
            "Organizations post a bounty and deposit funds in a Stellar smart contract. Work cannot begin until escrow is verified.",
        highlighted: true,
    },
    {
        title: "Claim & Complete",
        description:
            "Freelancers claim the bounty, execute quality milestone deliverables, and upload their work directly to our review portal.",
        highlighted: false,
    },
    {
        title: "Get paid",
        description:
            "Once guidelines are met, escrow immediately releases the funds (USDC/XLM) straight to your designated wallet.",
        highlighted: false,
    },
];

const HowItWorks = () => {
    return (
        <section className="max-w-[1200px] mx-auto px-6 py-20">
            <Text as="h2" variant="h2" className="text-left md:text-center">
                How it works
            </Text>
            <Text as="p" variant="body" className="mt-3 max-w-[600px] text-left text-app-grey-light md:mx-auto md:text-center">
                Stellar smart contracts replace blind trust. Fully funded escrows guarantee you get paid for verified milestone completions.
            </Text>

            <div className="mt-12 flex flex-col gap-10 md:flex-row">
                <div className="relative aspect-[379/419] w-full overflow-hidden rounded-xl md:aspect-auto md:w-[45%]">
                    <Image
                        src={AppImages.rectangle1}
                        alt="Team collaborating"
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="flex flex-1 flex-col gap-6">
                    {steps.map((step) =>
                        step.highlighted ? (
                            <div key={step.title} className="relative">
                                <div className="rounded-2xl bg-app-primary px-6 py-5 text-white">
                                    <Text as="h3" variant="h4" className="text-white">
                                        {step.title}
                                    </Text>
                                    <Text as="p" variant="small" className="mt-2 text-white/80">
                                        {step.description}
                                    </Text>
                                </div>
                                {/* accent bar mirrors the highlighted card style from the design */}
                                <div className="absolute inset-y-3 -right-1.5 w-1.5 rounded-full bg-app-primary/50" />
                            </div>
                        ) : (
                            <div key={step.title} className="rounded-2xl bg-app-light-primary/40 px-6 py-5">
                                <Text as="h3" variant="h4" className="text-app-dark-purple">
                                    {step.title}
                                </Text>
                                <Text as="p" variant="small" className="mt-2 text-app-grey-light">
                                    {step.description}
                                </Text>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
