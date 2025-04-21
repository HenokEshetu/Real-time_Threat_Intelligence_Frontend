import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useIndicators } from '../../hooks/useIndicators';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SearchIcon, PlusIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Indicator } from '../../types/indicator';
import { ScrollArea } from '@/components/ui/scroll-area';

export const IndicatorsPage = () => {
  const navigate = useNavigate();
  const { indicators, loading, error, loadMore, hasMore } = useIndicators({
    filters: {},
    page: 1,
    pageSize: 100,
  });

  // utils/useRandomTailwindColor.ts
  const tailwindColors = [
    { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-500' },
    {
      bg: 'bg-orange-50',
      border: 'border-orange-500',
      text: 'text-orange-500',
    },
    {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-500',
    },
    { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-500' },
    { bg: 'bg-teal-50', border: 'border-teal-500', text: 'text-teal-500' },
    { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-500' },
    {
      bg: 'bg-indigo-50',
      border: 'border-indigo-500',
      text: 'text-indigo-500',
    },
    {
      bg: 'bg-purple-50',
      border: 'border-purple-500',
      text: 'text-purple-500',
    },
    { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-500' },
    { bg: 'bg-rose-50', border: 'border-rose-500', text: 'text-rose-500' },
    { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-500' },
    { bg: 'bg-lime-50', border: 'border-lime-500', text: 'text-lime-500' },
    {
      bg: 'bg-emerald-50',
      border: 'border-emerald-500',
      text: 'text-emerald-500',
    },
    { bg: 'bg-cyan-50', border: 'border-cyan-500', text: 'text-cyan-500' },
    { bg: 'bg-sky-50', border: 'border-sky-500', text: 'text-sky-500' },
    {
      bg: 'bg-violet-50',
      border: 'border-violet-500',
      text: 'text-violet-500',
    },
    {
      bg: 'bg-fuchsia-50',
      border: 'border-fuchsia-500',
      text: 'text-fuchsia-500',
    },
  ];

  const [labelColorMap] = useState(
    () => new Map<string, (typeof tailwindColors)[number]>(),
  );

  const getRandomTailwindColor = () => {
    const randomIndex = Math.floor(Math.random() * tailwindColors.length);
    return tailwindColors[randomIndex];
  };

  const handleViewIndicator = (id: string) => navigate(`/indicators/${id}`);

  if (loading && indicators.length === 0) {
    return (
      <div className="container py-6 space-y-4">
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
      {/* Header */}

      {/* Indicators Table */}
      <div className="sticky top-100 overflow-x-auto overflow-y-auto h-[90vh] bg-white rounded-md">
        <Table className="w-full text-sm text-foreground">
          <TableHeader className="">
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
            {indicators.map((indicator: Indicator) => (
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
                <TableCell className="p-4 font-medium text-gray-900 hover:underline">
                  {indicator.name.replace('Indicator: ', '') || 'Untitled'}
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {indicator.labels?.map((label) => {
                      if (!labelColorMap.has(label)) {
                        labelColorMap.set(label, getRandomTailwindColor());
                      }
                      const color = labelColorMap.get(label)!;
                      return (
                        <Badge
                          variant="outline"
                          className={`${color.text} ${color.border} ${color.bg}`}
                        >
                          {label}
                        </Badge>
                      );
                    })}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
