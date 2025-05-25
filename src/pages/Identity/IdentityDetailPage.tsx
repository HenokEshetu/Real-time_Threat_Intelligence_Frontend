import React from "react";
import { useParams } from "react-router-dom";
import { useIdentityDetail } from "@/hooks/useIdentity";
import { Loading } from "@/components/common/Loading/Loading";
import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { TopContainer } from "@/components/common/TopContainer";
import { TabsType, TopTab } from "@/components/common/TopTab";
import IdentityDetail from "@/components/common/Identity/IdentityDetail";

export const IdentityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { identity, loading, error } = useIdentityDetail(id);

  const detailTabContent = (
    <div className="flex flex-col gap-6">
      <div className="flex-1 min-w-0">
        <IdentityDetail identity={identity} loading={loading} error={error} />
      </div>
    </div>
  );

  const tabs = {
    titles: [
      "Detail",
      "Relationships",
      "Analysis"
    ],
    components: [
      detailTabContent,
      <div>Relationships content here</div>,
      <div>Analysis content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!identity) return <ErrorMessage message="Identity not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29 flex flex-col gap-4">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {identity.name}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};

export default IdentityDetailPage;
