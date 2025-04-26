import React, { useRef } from 'react';
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

// utility colors
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
  {
    bg: 'bg-slate-100',
    border: 'border-slate-500',
    text: 'text-slate-600',
  },
  {
    bg: 'bg-gray-100',
    border: 'border-gray-500',
    text: 'text-gray-600',
  },
];

var availableColors = [...tailwindColors];

const getRandomTailwindColor = () => {
  // once we’ve used them all, reset
  if (availableColors.length === 0) {
    availableColors = [...tailwindColors];
  }

  // pick a random index from the remaining colors
  const idx = Math.floor(Math.random() * availableColors.length);
  const color = availableColors[idx];

  // remove it so it can’t be reused until reset
  availableColors.splice(idx, 1);

  return color;
};

export const IndicatorsPage: React.FC = () => {
  const navigate = useNavigate();
  const { indicators, loading, error } = useIndicators({
    filters: {},
    page: 1,
    pageSize: 100,
  });

  // Persistent color map for labels
  const labelColorMap = useRef<Map<string, (typeof tailwindColors)[0]>>(
    new Map(),
  );

  const handleViewIndicator = (id: string) => navigate(`/indicators/${id}`);

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
    <div className="w-full flex flex-col">
      <div className="overflow-x-auto overflow-y-auto h-[90vh] bg-white rounded-md">
        <Table className="w-full text-sm text-foreground">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-bold p-4 text-gray-800">
                Pattern Type
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Name
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Labels
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Language
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Valid From
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Valid Until
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {indicators.map((indicator: Indicator) => {
              const labels = indicator.labels || [];
              // remove duplicates while preserving order
              const uniqueLabels: string[] = [];
              labels.forEach((lbl) => {
                if (!uniqueLabels.includes(lbl)) uniqueLabels.push(lbl);
              });
              // pick the 3 shortest unique labels but display them in original order
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
                  className="hover:bg-gray-50 transition-colors border-b border-gray-300 cursor-pointer"
                >
                  <TableCell className="p-4 text-gray-700">
                    <Badge
                      variant="outline"
                      className="text-blue-500 border-blue-500 bg-blue-50"
                    >
                      {indicator.pattern_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-900 hover:underline max-w-100 truncate">
                    {indicator.name.replace('Indicator: ', '') || 'Unknown'}
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
                          className="text-gray-500 border-gray-500 bg-gray-50"
                        >
                          +{extraCount}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
                    {indicator.lang || 'N/A'}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
                    {indicator.valid_from
                      ? new Date(indicator.valid_from).toLocaleDateString()
                      : '—'}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
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
    </div>
  );
};
