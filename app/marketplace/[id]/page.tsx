import NavBar from "@/components/layouts/landing/nav-bar";
import Footer from "@/components/layouts/landing/footer";
import BountyDetailsContainer from "@/components/layouts/marketplace/bounty-details-container";

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
