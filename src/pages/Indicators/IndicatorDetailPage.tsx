import React from 'react';
import { useParams } from 'react-router-dom';
import { useIndicator } from '@/hooks/useIndicators';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { IndicatorOverview } from '@/components/indicator/overview';
import { TabsType, TopTab } from '@/components/common/TopTab';

export const IndicatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { indicator, loading, error } = useIndicator(id);
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
      <IndicatorOverview indicator={indicator} />,
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
  if (!indicator) return <ErrorMessage message="Indicator not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {indicator.name.replace('Indicator: ', '')}
        </h1>
      </TopContainer>

      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
