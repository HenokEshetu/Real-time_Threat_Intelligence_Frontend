import React from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import { IPv6Overview } from '@/components/observables/ipv6overview';
import { useIPv6Address } from '@/hooks/observables/useIPv6Address';

export const IPv6ObservablesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { ipv6Address, loading, error } = useIPv6Address(id);

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
      <IPv6Overview ipv6={ipv6Address} />,
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
  if (!ipv6Address) return <ErrorMessage message="IPv6 Address not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {ipv6Address.value}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
