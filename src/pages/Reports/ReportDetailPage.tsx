import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReport } from '../../hooks/useReports';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import ReportDetail from '@/components/common/Reports/ReportDetail';
import { Trash2 } from 'lucide-react';

export const ReportDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
        <div className="flex flex-row border border-red-500 w-full items-center justify-between">
          <h1 className="text-2xl max-w-[60%] font-semibold truncate">
            {report.name}
          </h1>
          <button
            className="p-2 rounded-full hover:bg-red-100 active:bg-red-200 transition-colors"
            title="Delete Report"
            onClick={() => {
              if (id) navigate(`/reports/${id}/delete`);
            }}
          >
            <Trash2 className="w-6 h-6 text-red-600 hover:text-red-800" />
          </button>
        </div>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
