import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAttackPattern } from '@/hooks/observables/useAttackPattern';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronsLeft, ChevronsRight, DatabaseIcon } from 'lucide-react';

// ...tailwindColors and getRandomTailwindColor definitions (same as IndicatorsPage)...

const tailwindColors = [
  { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-600' },
  { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-600' },
  { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-600' },
  { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-600' },
  { bg: 'bg-teal-50', border: 'border-teal-500', text: 'text-teal-600' },
  { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-600' },
  { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-600' },
  { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-600' },
  { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-600' },
  { bg: 'bg-rose-50', border: 'border-rose-500', text: 'text-rose-600' },
  { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-600' },
  { bg: 'bg-lime-50', border: 'border-lime-500', text: 'text-lime-600' },
  {
    bg: 'bg-emerald-50',
    border: 'border-emerald-500',
    text: 'text-emerald-600',
  },
  { bg: 'bg-cyan-50', border: 'border-cyan-500', text: 'text-cyan-600' },
  { bg: 'bg-sky-50', border: 'border-sky-500', text: 'text-sky-600' },
  { bg: 'bg-violet-50', border: 'border-violet-500', text: 'text-violet-600' },
  {
    bg: 'bg-fuchsia-50',
    border: 'border-fuchsia-500',
    text: 'text-fuchsia-600',
  },
  {
    bg: 'bg-neutral-100',
    border: 'border-neutral-500',
    text: 'text-neutral-600',
  },
  { bg: 'bg-slate-100', border: 'border-slate-500', text: 'text-slate-600' },
  { bg: 'bg-gray-100', border: 'border-gray-500', text: 'text-gray-600' },
];

let availableColors = [...tailwindColors];

const getRandomTailwindColor = () => {
  if (availableColors.length === 0) {
    availableColors = [...tailwindColors];
  }
  const idx = Math.floor(Math.random() * availableColors.length);
  const color = availableColors[idx];
  availableColors.splice(idx, 1);
  return color;
};

export const AttackPatternsPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  const { attackPattern, loading, error } = useAttackPattern({
    filters: {},
    page: currentPage,
    pageSize,
  });

  const labelColorMap = React.useRef<Map<string, (typeof tailwindColors)[0]>>(
    new Map(),
  );

  const total = attackPattern?.total || 0;
  const totalPages = attackPattern?.totalPages || 1;
  const results = attackPattern?.results || [];

  const handleViewAttackPattern = (id: string) => navigate(`/attack-patterns/${id}`);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  if (loading && results.length === 0) {
    return (
      <div className="w-full px-4 py-6 space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-6">
        <Alert variant="destructive">
          <AlertDescription>
            Error loading attack patterns: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="overflow-x-auto overflow-y-auto h-[85vh] bg-white rounded-md">
        <Table className="w-full text-sm text-foreground h-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-bold p-4 text-gray-800">
                Type
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Name
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Description
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Aliases
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Labels
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Created
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Modified
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((pattern: any) => {
              const labels = pattern.labels || [];
              const aliases = pattern.aliases || [];
              const displayLabels = labels.slice(0, 3);
              const extraCount = labels.length - displayLabels.length;

              return (
                <TableRow
                  key={pattern.id}
                  onClick={() => handleViewAttackPattern(pattern.id)}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-300 cursor-pointer"
                >
                  <TableCell className="p-4 text-gray-700">
                    <Badge
                      variant="outline"
                      className="text-cyan-500 border-cyan-500 bg-blue-50 px-8"
                    >
                      <DatabaseIcon />
                      {pattern.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-900 hover:underline max-w-100 truncate">
                    {pattern.name || 'Unknown'}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600 max-w-100 truncate">
                    {pattern.description || '—'}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600 max-w-100 truncate">
                    {aliases.length > 0
                      ? aliases.join(', ')
                      : '—'}
                  </TableCell>
                  <TableCell className="p-4 max-w-100">
                    <div className="flex flex-wrap gap-1">
                      {displayLabels.map((label: string) => {
                        if (!labelColorMap.current.has(label)) {
                          labelColorMap.current.set(
                            label,
                            getRandomTailwindColor(),
                          );
                        }
                        const color = labelColorMap.current.get(label)!;
                        return (
                          <Badge
                            key={label}
                            variant="outline"
                            className={`${color.text} ${color.border} ${color.bg}`}
                          >
                            {label}
                          </Badge>
                        );
                      })}
                      {extraCount > 0 && (
                        <Badge
                          variant="outline"
                          className="text-gray-500 border-gray-500 bg-gray-50"
                        >
                          +{extraCount}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
                    {pattern.created
                      ? new Date(pattern.created).toLocaleDateString()
                      : '—'}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
                    {pattern.modified
                      ? new Date(pattern.modified).toLocaleDateString()
                      : '—'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-4 py-2 border-t">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * pageSize + 1} to{' '}
          {Math.min(currentPage * pageSize, total)} of {total} attack patterns
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1 || loading}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <span className="px-2 text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages || loading}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
