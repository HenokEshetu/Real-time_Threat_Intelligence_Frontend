import React from "react";
import { useParams } from "react-router-dom";
import { useArtifact } from "@/hooks/useArtifacts";
import { Loading } from "@/components/common/Loading/Loading";
import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { TopContainer } from "@/components/common/TopContainer";
import { TabsType, TopTab } from "@/components/common/TopTab";
import ArtifactsDetail from "@/components/common/Artifacts/ArtifactsDetail";

export const ArtifactsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { artifact, loading, error } = useArtifact(id || "");

  const tabs = {
    titles: ["Detail", "Relationships", "Analysis"],
    components: [
      <ArtifactsDetail />,
      <div>Relationships content here</div>,
      <div>Analysis content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!artifact) return <ErrorMessage message="Artifact not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {artifact.url || artifact.id}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};

export default ArtifactsDetailPage;
