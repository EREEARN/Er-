import BountyDetailsContainer from "@/components/layouts/marketplace/bounty-details-container";

export default async function DashboardBountyDetailsPage(props: PageProps<"/dashboard/marketplace/[id]">) {
    const { id } = await props.params;

    return <BountyDetailsContainer id={id} marketplaceHref="/dashboard/marketplace" />;
}
