import React from 'react';
import { useReports } from '../../hooks/useReports';
import { ReportCard } from '../../components/common/Reports/ReportCard';
import { Report } from '../../types/report';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const ReportsPage = () => {
  const { reports, loading, error, loadMore, hasMore } = useReports({});
  const navigate = useNavigate();

  if (loading) return <div className="text-center py-10">Loading reports...</div>;
  if (error) return <div className="text-red-600 text-center py-10">Error loading reports.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Button asChild>
          <Link to="/reports/create" className="flex items-center gap-2">
            + New Report
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {reports.map((report: Report) => (
          <ReportCard
            key={report.id}
            report={report}
            onClick={id => navigate(`/reports/${id}`)}
            onEdit={id => navigate(`/reports/${id}/edit`)}
            // onDelete={id => ...} // Add delete logic if needed
          />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button onClick={loadMore} className="bg-blue-600 text-white px-4 py-2 rounded">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
