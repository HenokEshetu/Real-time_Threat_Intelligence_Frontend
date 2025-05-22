import React from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import { MACAddressOverview } from '@/components/observables/macaddressoverview';
import { useMacAddress } from '@/hooks/observables/useMacAddress';

export const MACObservablesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { macAddress, loading, error } = useMacAddress(id);

  const tabs = {
    titles: [
      'overview',
      'knowledge',
      'enrichment',
      'analysis',
      'sightings',
      'data',
      'history',
    ],
    comoponents: [
      <MACAddressOverview mac={macAddress} />,
      <div>Knowledge content here</div>,
      <div>Enrichment content here</div>,
      <div>Analysis content here</div>,
      <div>Sightings content here</div>,
      <div>Data content here</div>,
      <div>History content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!macAddress) return <ErrorMessage message="MAC Address not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {macAddress.value}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
