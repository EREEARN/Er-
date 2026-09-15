import WorkspaceDetailsContainer from "@/components/layouts/dashboard/workspace-details-container";

export default async function WorkspacePage(props: PageProps<"/dashboard/workspace/[id]">) {
    const { id } = await props.params;

    return <WorkspaceDetailsContainer id={id} />;
}
