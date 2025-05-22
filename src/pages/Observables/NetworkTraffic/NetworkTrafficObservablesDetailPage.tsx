import React from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import { NetworkTrafficOverview } from '@/components/observables/networktrafficoverview';
import { useNetworkTrafficById } from '@/hooks/observables/useNetworkTraffic';

export const NetworkTrafficObservablesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { networkTraffic, loading, error } = useNetworkTrafficById(id!);

  const tabs = {
    titles: [
      'overview',
      'knowledge',
      'content',
      'analysis',
      'sightings',
      'data',
      'history',
    ],
    comoponents: [
      <NetworkTrafficOverview networkTraffic={networkTraffic} />,
      <div>Knowledge content here</div>,
      <div>Content content here</div>,
      <div>Analysis content here</div>,
      <div>Sightings content here</div>,
      <div>Data content here</div>,
      <div>History content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!networkTraffic) return <ErrorMessage message="Network Traffic not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {networkTraffic.id}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
