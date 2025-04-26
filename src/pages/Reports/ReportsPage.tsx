import React from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_REPORTS } from '@/graphql/report';
import { Link, useNavigate } from 'react-router-dom';
import { ReportCard } from '@/components/common/Reports/ReportCard';
import { useReports } from '@/hooks/useReports';

export const ReportsPage = () => {
  const navigate = useNavigate();
  const { reports, loading, error } = useReports({
    filters: {},
    page: 1,
    pageSize: 10,
  });

  if (loading) return <div>Loading reports...</div>;
  if (error) return <div>Error loading reports: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Link
          to="/reports/create"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Create New Report
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report: any) => (
          <div key={report.id} className="h-full">
            <ReportCard
              report={report}
              onClick={(id) => navigate(`/reports/${id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
