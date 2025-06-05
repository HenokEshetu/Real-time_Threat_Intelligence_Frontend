import React from 'react';
import { useParams } from 'react-router-dom';
import { useIndicator } from '@/hooks/useIndicators';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { IndicatorDetail } from '@/components/indicator/IndicatorDetail';
import IndicatorRelationships from '@/components/indicator/IndicatorRelationship';
import { TabsType, TopTab } from '@/components/common/TopTab';

export const IndicatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { indicator, loading, error } = useIndicator(id);

  const tabs = {
    titles: [
      'Detail',
      'Relationships',
      'Analysis',
      'Content',
    ],
    components: [
      <IndicatorDetail indicator={indicator} />,
      <IndicatorRelationships indicatorId={id} />,
      <div>Analysis content here</div>,
      <div>Content content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!indicator) return <ErrorMessage message="Indicator not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {indicator.name}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
