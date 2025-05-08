import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye } from 'lucide-react';

export interface ReportCardProps {
  report: {
    id: string;
    name: string;
    description?: string;
    authors?: string[];
    published?: string;
    report_types?: string[];
    confidence?: number;
    created?: string;
    modified?: string;
    labels?: string[];
    external_references?: {
      id?: string;
      source_name: string;
      url?: string;
      external_id?: string;
    }[];
  };
  onClick?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-zinc-900 dark:via-blue-950 dark:to-zinc-900 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 cursor-pointer flex flex-col h-full relative overflow-hidden',
        expanded && 'ring-2 ring-blue-400/40',
      )}
      tabIndex={0}
      aria-expanded={expanded}
      role="button"
      onClick={() => {
        setExpanded((v) => !v);
        if (onClick) onClick(report.id);
      }}
    >
      {/* Top-right action buttons */}
      <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition">
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-blue-100 dark:hover:bg-blue-900"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/reports/${report.id}`);
          }}
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-yellow-100 dark:hover:bg-yellow-900"
          onClick={(e) => {
            e.stopPropagation();
            if (onEdit) onEdit(report.id);
            else navigate(`/reports/${report.id}/edit`);
          }}
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-red-100 dark:hover:bg-red-900"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete(report.id);
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center gap-3 p-5">
        <div className="rounded-full bg-blue-200 dark:bg-blue-900 w-14 h-14 flex items-center justify-center text-3xl font-bold text-blue-700 dark:text-blue-200 shadow">
          {/* <ItemIcon type="report" size="large" /> */}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-lg truncate">{report.name}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {report.report_types?.map((type) => (
              <span
                key={type}
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded text-xs font-medium"
              >
                {type}
              </span>
            ))}
            {report.labels?.map((label) => (
              <span
                key={label}
                className="bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 px-2 py-0.5 rounded text-xs"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="px-5 pb-2 text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">
        {report.description}
      </div>
      <div className="px-5 pb-2 text-xs text-zinc-500 dark:text-zinc-400 flex flex-wrap gap-2">
        {report.published && (
          <span>
            Published:{' '}
            <span className="font-semibold">
              {new Date(report.published).toLocaleDateString()}
            </span>
          </span>
        )}
        {report.confidence !== undefined && (
          <span>
            Confidence:{' '}
            <span
              className={
                report.confidence > 80
                  ? 'text-green-600'
                  : report.confidence > 50
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }
            >
              {report.confidence}
            </span>
          </span>
        )}
      </div>
      {expanded && (
        <div className="px-5 pb-5 text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
          {report.authors && (
            <div>
              <span className="font-medium">Authors:</span>{' '}
              {report.authors.join(', ')}
            </div>
          )}
          {report.created && (
            <div>
              <span className="font-medium">Created:</span>{' '}
              {new Date(report.created).toLocaleString()}
            </div>
          )}
          {report.modified && (
            <div>
              <span className="font-medium">Modified:</span>{' '}
              {new Date(report.modified).toLocaleString()}
            </div>
          )}
          {report.external_references &&
            report.external_references.length > 0 && (
              <div>
                <span className="font-medium">External References:</span>
                <ul className="list-disc ml-5">
                  {report.external_references.map((ref, idx) => (
                    <li key={ref.id ?? ref.url ?? ref.source_name ?? idx}>
                      <span className="font-semibold">{ref.source_name}</span>
                      {ref.url && (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 underline text-blue-600 hover:text-blue-800"
                          onClick={(e) => e.stopPropagation()}
                        >
                          (link)
                        </a>
                      )}
                      {ref.external_id && (
                        <span className="ml-1 text-zinc-400">
                          [{ref.external_id}]
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      )}
      <div className="mt-auto px-5 pb-4 text-right">
        <Button
          variant="link"
          size="sm"
          className="text-blue-600 dark:text-blue-300 hover:underline"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((v) => !v);
          }}
        >
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      </div>
      {/* Decorative background */}
      <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none select-none">
        {/* <ItemIcon type="report" size="large" /> */}
      </div>
    </div>
  );
};
