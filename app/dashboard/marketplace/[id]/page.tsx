import { notFound } from "next/navigation";
import BountyDetails from "@/components/layouts/marketplace/bounty-details";
import { getBountyById } from "@/lib/bounties";

export default async function DashboardBountyDetailsPage(props: PageProps<"/dashboard/marketplace/[id]">) {
    const { id } = await props.params;
    const bounty = getBountyById(id);

    if (!bounty) {
        notFound();
    }

    return <BountyDetails bounty={bounty} />;
}
