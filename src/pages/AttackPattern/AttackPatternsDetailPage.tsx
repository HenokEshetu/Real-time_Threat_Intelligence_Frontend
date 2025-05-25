import React from 'react';
import { useParams } from 'react-router-dom';
import { useAttackPatternDetail } from '@/hooks/observables/useAttackPattern';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
// You may want to implement this component for details:
import { AttackPatternDetail } from '@/components/common/AttackPatterns/AttackPatternDetail';

export const AttackPatternsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { attackPattern, loading, error } = useAttackPatternDetail(id);

  const tabs = {
    titles: ['Detail', 'Relationships', 'Analysis'],
    components: [
      <AttackPatternDetail attackPattern={attackPattern} />,
      <div>Knowledge content here</div>,
      <div>Analysis content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!attackPattern)
    return <ErrorMessage message="Attack Pattern not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {attackPattern.name}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
