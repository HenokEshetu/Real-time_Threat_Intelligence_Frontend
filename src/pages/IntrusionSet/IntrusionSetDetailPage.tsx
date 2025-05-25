import React from 'react';
import { useParams } from 'react-router-dom';
import { useIntrusionSetDetail } from '@/hooks/useintrusionSet';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import IntrusionSetDetail from '@/components/common/IntrusionSets/IntrusionSetDetail';

export const IntrusionSetDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { intrusionSet, loading, error } = useIntrusionSetDetail(id);

  const tabs = {
    titles: [
      'Detail',
      'Relationships',
      'Analysis'
    ],
    components: [
      <IntrusionSetDetail />,
      <div>Relationships content here</div>,
      <div>Analysis content here</div>,
      <div></div>,
      <div></div>,
      <div></div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!intrusionSet) return <ErrorMessage message="Intrusion Set not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {intrusionSet.name}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};

export default IntrusionSetDetailPage;
