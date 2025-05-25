import React from 'react';
import { useParams } from 'react-router-dom';
import { useObservedData } from '@/hooks/useObservedData';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import ObservedDataDetail from '@/components/common/ObservedData/ObservedDataDetail';

export const ObservedDataDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { observedData, loading, error } = useObservedData(id!);

  const tabs = {
    titles: [
      'Detail',
      'Relationships',
      'Analysis'
    ],
    components: [
      <ObservedDataDetail />,
      <div>Relationships content here</div>,
      <div>Analysis content here</div>,
    ],
  } as TabsType;

  if (loading) return <div className="flex items-center justify-center h-40">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>;
  if (!observedData) return <div className="text-gray-500 p-4">ObservedData not found</div>;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {observedData.id}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};

export default ObservedDataDetailPage;
