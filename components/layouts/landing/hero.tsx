import { Text } from "@/components/reuseables/text";
import Image from "next/image";
import { AppImages } from "@/assets/app_images";
import React from "react";
import { AppButton } from "@/components/reuseables/app-button";

const Hero = () => {
    return (
        <div className="mx-auto flex max-w-[1200px] flex-col items-start px-6 py-16 md:h-[90vh] md:items-center md:justify-center md:py-0">
           <Text
               as="h1"
               variant="h1"
               className="mb-4 text-left text-4xl font-bold md:text-center md:text-[48px]"
           >
               Complete Work and <br/> <span className='text-app-primary'>Get Paid</span>
           </Text>
           <Text as="p" variant="body" className="mb-8 w-full max-w-[447px] text-left md:mx-auto md:text-center">
               Find fully-funded technical and creative bounties. Work from anywhere, complete milestone submissions, and receive automatic payouts backed by Stellar smart-contracts.
           </Text>
           <div className='flex flex-wrap gap-3'>
            <AppButton
                variant="primary"
                className="px-6 py-3"

            >
                Browse Open Bounties
            </AppButton>
            <AppButton
                variant="outline"
                className="px-6 py-3"

            >
                Post a Bounty
            </AppButton>
           </div>
            <Image
                src={AppImages.macBook}
                alt="MacBook Pro 16"
                width={1000}
                height={800}
                className="mt-10 h-auto w-full max-w-[1000px]"
            /> 
        </div>
    );
};

export default Hero;