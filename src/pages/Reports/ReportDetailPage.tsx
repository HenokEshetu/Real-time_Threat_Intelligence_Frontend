import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReport } from '../../hooks/useReports';
import { Button } from '@/components/ui/button';
import ItemIcon from '@/components/ItemIcon';
import { BadgeCheck, Users, CalendarDays, FileText, ExternalLink, UserCircle2, Tag, ListChecks } from "lucide-react";

export const ReportDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { report, loading, error } = useReport(id || '');
  const navigate = useNavigate();

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center py-10">Error loading report.</div>;
  if (!report) return <div className="text-center py-10">Report not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-2xl shadow-lg p-6 flex items-center gap-6 mb-8">
        <div className="flex-shrink-0">
          <div className="rounded-full bg-white/20 p-4 shadow-lg flex items-center justify-center">
            <ItemIcon type="report" size="large" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <FileText className="w-7 h-7 text-white/80" />
            {report.name}
          </h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {report.report_types?.map((type: string) => (
              <span key={type} className="inline-flex items-center gap-1 bg-blue-800/80 text-blue-100 px-2 py-0.5 rounded text-xs font-medium">
                <ListChecks className="w-3 h-3" /> {type}
              </span>
            ))}
            {report.labels?.map((label: string) => (
              <span key={label} className="inline-flex items-center gap-1 bg-white/20 text-white px-2 py-0.5 rounded text-xs">
                <Tag className="w-3 h-3" /> {label}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <Button variant="ghost" onClick={() => navigate('/reports')} className="text-white/80 hover:bg-white/10">
            &larr; Back
          </Button>
          <Button variant="outline" onClick={() => navigate(`/reports/${id}/edit`)} className="border-white/40 text-white/90 hover:bg-white/10">
            Edit
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Description & Authors */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Description */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-lg">Description</span>
            </div>
            <div className="text-zinc-700 dark:text-zinc-200 whitespace-pre-line">{report.description || <span className="italic text-zinc-400">No description provided.</span>}</div>
          </div>
          {/* Authors */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-lg">Authors</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {report.authors && report.authors.length > 0 ? (
                report.authors.map((author: string, idx: number) => (
                  <span key={idx} className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium shadow">
                    <UserCircle2 className="w-4 h-4" /> {author}
                  </span>
                ))
              ) : (
                <span className="italic text-zinc-400">N/A</span>
              )}
            </div>
          </div>
          {/* External References */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-2">
              <ExternalLink className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-lg">External References</span>
            </div>
            {report.external_references && report.external_references.length > 0 ? (
              <ul className="space-y-2">
                {report.external_references.map((ref: any, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-green-500" />
                    <span className="font-semibold">{ref.source_name}</span>
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" /> Link
                      </a>
                    )}
                    {ref.external_id && (
                      <span className="ml-2 text-xs text-zinc-400">[{ref.external_id}]</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="italic text-zinc-400">No external references.</span>
            )}
          </div>
        </div>
        {/* Right: Metadata */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-lg">Metadata</span>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-zinc-600 dark:text-zinc-300">Published:</span>
                <span className="ml-2">{report.published ? new Date(report.published).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div>
                <span className="font-medium text-zinc-600 dark:text-zinc-300">Created:</span>
                <span className="ml-2">{report.created ? new Date(report.created).toLocaleString() : 'N/A'}</span>
              </div>
              <div>
                <span className="font-medium text-zinc-600 dark:text-zinc-300">Modified:</span>
                <span className="ml-2">{report.modified ? new Date(report.modified).toLocaleString() : 'N/A'}</span>
              </div>
              <div>
                <span className="font-medium text-zinc-600 dark:text-zinc-300">Confidence:</span>
                <span className={`ml-2 font-semibold ${report.confidence > 80 ? "text-green-600" : report.confidence > 50 ? "text-yellow-600" : "text-red-600"}`}>
                  {report.confidence ?? 'N/A'}
                </span>
              </div>
              <div>
                <span className="font-medium text-zinc-600 dark:text-zinc-300">ID:</span>
                <span className="ml-2 break-all">{report.id}</span>
              </div>
            </div>
          </div>
          {/* Add more metadata cards if needed */}
        </div>
      </div>
    </div>
  );
};
