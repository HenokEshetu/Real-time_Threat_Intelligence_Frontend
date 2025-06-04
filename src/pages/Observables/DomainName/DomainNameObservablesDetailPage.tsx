import React from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import { DomainOverview } from '@/components/observables/domainoverview';
import { useDomainName } from '@/hooks/observables/useDomains';

export const DomainNameObservablesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { domainName, loading, error } = useDomainName(id);

  const tabs = {
    titles: [
      'overview',
      'knowledge',
      'analysis',
      'sightings',
      'data',
      'history',
    ],
    components: [
      <DomainOverview domain={domainName} />,
      <div>Knowledge content here</div>,
      <div>Analysis content here</div>,
      <div>Sightings content here</div>,
      <div>Data content here</div>,
      <div>History content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!domainName) return <ErrorMessage message="Domain not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {domainName.value}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
