import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIndicators } from '@/hooks/useIndicators';
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
import { Indicator } from '@/types/indicator';
import { Button } from '@/components/ui/button';
import { ChevronsLeft, ChevronsRight, DatabaseIcon } from 'lucide-react';

const tailwindColors = [
  { bg: 'bg-red-200', border: 'border-red-500', text: 'text-red-600' },
  { bg: 'bg-orange-200', border: 'border-orange-500', text: 'text-orange-600' },
  { bg: 'bg-yellow-200', border: 'border-yellow-500', text: 'text-yellow-600' },
  { bg: 'bg-green-200', border: 'border-green-500', text: 'text-green-600' },
  { bg: 'bg-teal-200', border: 'border-teal-500', text: 'text-teal-600' },
  { bg: 'bg-blue-200', border: 'border-blue-500', text: 'text-blue-600' },
  { bg: 'bg-indigo-200', border: 'border-indigo-500', text: 'text-indigo-600' },
  { bg: 'bg-purple-200', border: 'border-purple-500', text: 'text-purple-600' },
  { bg: 'bg-pink-200', border: 'border-pink-500', text: 'text-pink-600' },
  { bg: 'bg-rose-200', border: 'border-rose-500', text: 'text-rose-600' },
  { bg: 'bg-amber-200', border: 'border-amber-500', text: 'text-amber-600' },
  { bg: 'bg-lime-200', border: 'border-lime-500', text: 'text-lime-600' },
  {
    bg: 'bg-emerald-200',
    border: 'border-emerald-500',
    text: 'text-emerald-600',
  },
  { bg: 'bg-cyan-200', border: 'border-cyan-500', text: 'text-cyan-600' },
  { bg: 'bg-sky-200', border: 'border-sky-500', text: 'text-sky-600' },
  { bg: 'bg-violet-200', border: 'border-violet-500', text: 'text-violet-600' },
  {
    bg: 'bg-fuchsia-200',
    border: 'border-fuchsia-500',
    text: 'text-fuchsia-600',
  },
  {
    bg: 'bg-neutral-200',
    border: 'border-neutral-500',
    text: 'text-neutral-600',
  },
  { bg: 'bg-slate-200', border: 'border-slate-500', text: 'text-slate-600' },
  { bg: 'bg-gray-200', border: 'border-gray-500', text: 'text-gray-600' },
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

export const IndicatorsPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  const { indicators, loading, error, total } = useIndicators({
    filters: {},
    page: currentPage,
    pageSize,
  });

  const labelColorMap = React.useRef<Map<string, (typeof tailwindColors)[0]>>(
    new Map(),
  );

  const totalPages = Math.ceil((total || 0) / pageSize);

  const handleViewIndicator = (id: string) => navigate(`/indicators/${id}`);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const getTlpColors = (tlp: string) => {
    switch (tlp?.toUpperCase()) {
      case 'WHITE':
        return 'bg-white text-black border-black';
      case 'GREEN':
        return 'bg-green-200 text-green-800 border-green-800';
      case 'AMBER':
        return 'bg-yellow-200 text-yellow-800 border-yellow-800';
      case 'RED':
        return 'bg-red-200 text-red-800 border-red-800';
      default:
        return 'bg-gray-200 text-gray-800 border-gray-800';
    }
  };

  if (loading && indicators.length === 0) {
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
            Error loading indicators: {error.message}
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
            <TableRow className="bg-muted">
              <TableHead className="font-bold p-4 text-foreground">
                Pattern Type
              </TableHead>
              <TableHead className="font-bold p-4 text-foreground">
                Name
              </TableHead>
              <TableHead className="font-bold p-4 text-foreground">
                Markings
              </TableHead>
              <TableHead className="font-bold p-4 text-foreground">
                Labels
              </TableHead>
              <TableHead className="font-bold p-4 text-foreground">
                Valid From
              </TableHead>
              <TableHead className="font-bold p-4 text-foreground">
                Valid Until
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {indicators.map((indicator: Indicator) => {
              const labels = indicator.labels || [];
              var uniqueLabels: string[] = [];
              var marking = '';

              labels.forEach((lbl) => {
                if (!uniqueLabels.includes(lbl)) uniqueLabels.push(lbl);
                if (lbl.includes('tlp:')) {
                  marking = lbl;
                  uniqueLabels = uniqueLabels.filter((label) => label !== lbl);
                }
              });

              const shortestThree = [...uniqueLabels]
                .sort((a, b) => a.length - b.length)
                .slice(0, 3);
              const shortestSet = new Set(shortestThree);
              const displayLabels = uniqueLabels.filter((lbl) =>
                shortestSet.has(lbl),
              );
              const extraCount = uniqueLabels.length - displayLabels.length;

              return (
                <TableRow
                  key={indicator.id}
                  onClick={() => handleViewIndicator(indicator.id)}
                  className="hover:bg-muted bg-background transition-colors border-b border-border cursor-pointer"
                >
                  <TableCell className="p-4 text-foreground">
                    <Badge
                      variant="outline"
                      className="text-cyan-600 border-cyan-500 bg-blue-200 px-8"
                    >
                      <DatabaseIcon />
                      {indicator.pattern_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground hover:underline max-w-100 truncate">
                    {indicator.name || 'Unknown'}
                  </TableCell>
                  <TableCell className={`p-4 text-foreground`}>
                    <Badge
                      variant="outline"
                      className={`max-w-28 ${
                        marking && typeof marking === 'string'
                          ? getTlpColors(marking.replaceAll('tlp:', ''))
                          : getTlpColors(
                              Array.isArray(indicator.object_marking_refs) &&
                                indicator.object_marking_refs.length > 0 &&
                                typeof indicator.object_marking_refs[0] ===
                                  'string'
                                ? indicator.object_marking_refs[0]
                                : 'clear',
                            )
                      } border-2 uppercase truncate`}
                    >
                      {marking ||
                        `TLP:${
                          Array.isArray(indicator.object_marking_refs) &&
                          indicator.object_marking_refs.length > 0
                            ? indicator.object_marking_refs[0]
                            : 'clear'
                        }`}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4 max-w-100">
                    <div className="flex flex-wrap gap-1">
                      {displayLabels.map((label) => {
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
                          className="text-muted-foreground border-border bg-muted"
                        >
                          +{extraCount}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="p-4 text-foreground">
                    {indicator.valid_from
                      ? new Date(indicator.valid_from).toLocaleDateString()
                      : '—'}
                  </TableCell>
                  <TableCell className="p-4 text-foreground">
                    {indicator.valid_until
                      ? new Date(indicator.valid_until).toLocaleDateString()
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
          {Math.min(currentPage * pageSize, total || 0)} of {total || 0}{' '}
          indicators
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
