import React from 'react';
import { useParams } from 'react-router-dom';
import { useThreatActorDetail } from '@/hooks/useThreatActors';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import ThreatActorDetail from '@/components/common/ThreatActors/ThreatActorDetail';

export const ThreatActorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { threatActor, loading, error } = useThreatActorDetail(id || '');

  const tabs = {
    titles: [
      'Detail',
      'Relationships',
      'Analysis'
    ],
    components: [
      <ThreatActorDetail />,
      <div>Relationships content here</div>,
      <div>Analysis content here</div>,
      <div></div>,
      <div></div>,
      <div></div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!threatActor) return <ErrorMessage message="Threat Actor not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {threatActor.name}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};

export default ThreatActorDetailPage;
