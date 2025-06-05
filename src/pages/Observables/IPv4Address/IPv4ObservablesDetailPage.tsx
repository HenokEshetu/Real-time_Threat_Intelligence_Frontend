import React from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import { IPv4Overview } from '@/components/observables/ipv4overview';
import { useIPv4Address } from '@/hooks/observables/useIPv4Adresses';

export const IPv4ObservablesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { ipv4, loading, error } = useIPv4Address(id);

  const tabs = {
    titles: [
      'overview',
      'knowledge',
      'enrichment',
      'sightings',
      'data',
      'history',
    ],
    components: [
      <IPv4Overview ipv4={ipv4} />,
      <div>Knowledge content here</div>,
      <div>Enrichment content here</div>,
      <div>Sightings content here</div>,
      <div>Data content here</div>,
      <div>History content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  // if (!ipv4) return <ErrorMessage message="IPv4 Address not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {ipv4.value ? ipv4.value : ipv4.id}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
