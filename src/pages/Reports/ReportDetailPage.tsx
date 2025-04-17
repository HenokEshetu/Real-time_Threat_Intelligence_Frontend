import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useReport } from '../../hooks/useReports';
import { Button } from '@/components/ui/button';

export const ReportDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { report, loading, error } = useReport(id || '');
  const navigate = useNavigate();

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center py-10">Error loading report.</div>;
  if (!report) return <div className="text-center py-10">Report not found.</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={() => navigate('/reports')}>
          &larr; Back to Reports
        </Button>
        <Button variant="outline" onClick={() => navigate(`/reports/${id}/edit`)}>
          Edit
        </Button>
      </div>
      <h1 className="text-3xl font-bold mt-2">{report.name}</h1>
      <div className="text-gray-600 dark:text-zinc-300 mt-2">{report.description}</div>
      <div className="flex flex-wrap gap-2 mt-3">
        {report.labels?.map((label: string) => (
          <span key={label} className="bg-gray-200 text-xs px-2 py-0.5 rounded">{label}</span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <strong>Authors:</strong> {report.authors?.join(', ') || 'N/A'}
        </div>
        <div>
          <strong>Published:</strong> {report.published ? new Date(report.published).toLocaleDateString() : 'N/A'}
        </div>
        <div>
          <strong>Report Types:</strong> {report.report_types?.join(', ') || 'N/A'}
        </div>
        <div>
          <strong>Confidence:</strong> {report.confidence ?? 'N/A'}
        </div>
      </div>
      <div className="mt-4">
        <strong>External References:</strong>
        <ul className="list-disc ml-6">
          {report.external_references?.map(
            (
              ref: {
                source_name: string;
                url?: string;
                external_id?: string;
              },
              idx: number
            ) => (
              <li key={idx}>
                <span className="font-medium">{ref.source_name}</span>
                {ref.url && (
                  <>
                    {' '}
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      [link]
                    </a>
                  </>
                )}
                {ref.external_id && <> (ID: {ref.external_id})</>}
              </li>
            )
          )}
        </ul>
      </div>
      {/* Add more fields as needed */}
    </div>
  );
};
