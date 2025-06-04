import React from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import { URLOverview } from '@/components/observables/urloverview';
import { useURL } from '@/hooks/observables/useURLs';

export const URLObservablesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { url, loading, error } = useURL(id);

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
      url ? <URLOverview url={url} key="overview" /> : null,
      <div key="knowledge">Knowledge content here</div>,
      <div key="enrichment">Enrichment content here</div>,
      <div key="sightings">Sightings content here</div>,
      <div key="data">Data content here</div>,
      <div key="history">History content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!url) return <ErrorMessage message="URL not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {url.value}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
