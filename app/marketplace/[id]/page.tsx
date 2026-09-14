import { notFound } from "next/navigation";
import NavBar from "@/components/layouts/landing/nav-bar";
import Footer from "@/components/layouts/landing/footer";
import BountyDetails from "@/components/layouts/marketplace/bounty-details";
import { getBountyById } from "@/lib/bounties";

export default async function BountyDetailsPage(props: PageProps<"/marketplace/[id]">) {
    const { id } = await props.params;
    const bounty = getBountyById(id);

    if (!bounty) {
        notFound();
    }

    return (
        <div>
            <NavBar />
            <main className="mx-auto max-w-[1200px] px-6 py-8">
                <BountyDetails bounty={bounty} />
            </main>
            <Footer />
        </div>
    );
}
