import { notFound } from "next/navigation";
import WorkspaceDetails from "@/components/layouts/dashboard/workspace-details";
import { getBountyById } from "@/lib/bounties";

export default async function WorkspacePage(props: PageProps<"/dashboard/workspace/[id]">) {
    const { id } = await props.params;
    const bounty = getBountyById(id);

    if (!bounty) {
        notFound();
    }

    return <WorkspaceDetails bounty={bounty} />;
}
