import React from 'react';
import { useParams } from 'react-router-dom';
import { useReport } from '../../hooks/useReports';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import ReportDetail from '@/components/common/Reports/ReportDetail';

export const ReportDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  // Ensure id is always a string (fallback to empty string if undefined)
  const { report, loading, error } = useReport(id || '');

  const tabs = {
    titles: [
      'Detail',
      'Relationships',
      'Content',
      'Entitities',
      'Observables',
      'Data',
    ],
    components: [
      <ReportDetail />,
      <div>Relationships content here</div>,
      <div>Analysis content here</div>,
      <div></div>,
      <div></div>,
      <div></div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!report) return <ErrorMessage message="Report not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {report.name}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
