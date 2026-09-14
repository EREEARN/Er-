import { Text } from "@/components/reuseables/text";
import { AppButton } from "@/components/reuseables/app-button";

const CallToAction = () => {
    return (
        <section className="max-w-[1200px] mx-auto px-6 py-10">
            <div className="rounded-3xl bg-app-primary px-6 py-14 text-center">
                <Text as="h2" variant="h2" className="text-white">
                    Ready to unlock decentralized work?
                </Text>
                <Text as="p" variant="body" className="mx-auto mt-4 max-w-[560px] text-white/70">
                    Whether you want to build high-stakes open-source code or hire elite engineering talent global-scale, EARN has your back.
                </Text>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <AppButton variant="primary" className="bg-white px-6 py-3 text-app-primary hover:bg-white/90">
                        Get Started as Developer
                    </AppButton>
                    <AppButton variant="outline" color="white" className="px-6 py-3">
                        Hire Talent
                    </AppButton>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
