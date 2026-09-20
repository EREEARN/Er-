import type { Metadata } from "next";
import NavBar from "@/components/layouts/landing/nav-bar";
import Footer from "@/components/layouts/landing/footer";
import BountyDetailsContainer from "@/components/layouts/marketplace/bounty-details-container";
import { getBounty } from "@/lib/api/bounties";

export async function generateMetadata(
    props: PageProps<"/marketplace/[id]">
): Promise<Metadata> {
    const { id } = await props.params;

    try {
        const bounty = await getBounty(id);
        const description = bounty.description.slice(0, 160);
        return {
            title: bounty.title,
            description,
            alternates: { canonical: `/marketplace/${id}` },
            openGraph: {
                url: `/marketplace/${id}`,
                title: `${bounty.title} | EreEarn`,
                description,
            },
        };
    } catch {
        return { title: "Bounty Details" };
    }
}

export default async function BountyDetailsPage(props: PageProps<"/marketplace/[id]">) {
    const { id } = await props.params;

    return (
        <div>
            <NavBar />
            <main className="mx-auto max-w-[1200px] px-6 py-8">
                <BountyDetailsContainer id={id} />
            </main>
            <Footer />
        </div>
    );
}
