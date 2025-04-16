import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIndicators } from '../../hooks/useIndicators';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
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

export const IndicatorsPage = () => {
  const navigate = useNavigate();
  const { indicators, loading, error, loadMore, hasMore } = useIndicators({
    filters: {},
    page: 1,
    pageSize: 10,
  });

  const handleViewIndicator = (id: string) => navigate(`/indicator/${id}`);

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
    <div className="p-6 w-465 space-y-6 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800">
          Indicators
        </h1>
        <Button asChild>
          <Link to="/indicators/create" className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            New Indicator
          </Link>
        </Button>
      </div>

      {/* Indicators Table */}
      <div className="overflow-x-auto bg-white rounded-md shadow-sm border border-gray-200">
        <Table className="w-full text-sm text-gray-700">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-bold p-4 text-gray-800">
                Name
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Pattern Type
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Labels
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
                className="hover:bg-gray-50 transition-colors border-b border-gray-200 cursor-pointer"
              >
                <TableCell className="p-4 font-medium text-gray-900 hover:underline">
                  {indicator.name || 'Untitled'}
                </TableCell>
                <TableCell className="p-4 text-gray-700">
                  {indicator.pattern_type}
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {indicator.labels?.map((label) => (
                      <Badge
                        key={label}
                        variant="outline"
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {new Date(indicator.valid_from).toLocaleDateString()}
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

      {/* Pagination */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};
