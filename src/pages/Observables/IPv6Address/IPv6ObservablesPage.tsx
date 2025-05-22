import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useIPv6Addresses } from '@/hooks/observables/useIPv6Address';
import { IPv6Address } from '@/types/observables/ipv6';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  NetworkIcon,
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tailwindColors = [
  { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-600' },
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

export const IPv6ObservablesPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  const { loading, error, ipv6Addresses, total } = useIPv6Addresses({
    filter: {},
    page: currentPage,
    pageSize,
  });

  const labelColorMap = React.useRef<Map<string, (typeof tailwindColors)[0]>>(
    new Map(),
  );

  const totalPages = Math.ceil((total || 0) / pageSize);

  const handleViewIPv6 = (id: string) => navigate(`/observables/ipv6/${id}`);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const getTlpColors = (tlp: string) => {
    switch (tlp?.toUpperCase()) {
      case 'WHITE':
        return 'bg-white text-black border-black';
      case 'GREEN':
        return 'bg-green-100 text-green-800 border-green-800';
      case 'AMBER':
        return 'bg-yellow-100 text-yellow-800 border-yellow-800';
      case 'RED':
        return 'bg-red-100 text-red-800 border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-800';
    }
  };

  if (loading && ipv6Addresses.length === 0) {
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
            Error loading IPv6 addresses: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="overflow-x-auto overflow-y-auto h-[81vh] bg-white rounded-md">
        <Table className="w-full text-sm text-foreground h-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-bold p-4 text-gray-800">
                Type
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Value
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Marking
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
            {ipv6Addresses.map((ipv6: IPv6Address) => {
              const labels = ipv6.labels || [];
              let uniqueLabels: string[] = [];
              let marking = '';

              labels.forEach((lbl) => {
                if (!uniqueLabels.includes(lbl)) uniqueLabels.push(lbl);
                if (lbl.toLowerCase().includes('tlp:')) {
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
                  key={ipv6.id}
                  onClick={() => handleViewIPv6(ipv6.id)}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-300 cursor-pointer"
                >
                  <TableCell className="p-4 text-gray-700">
                    <Badge
                      variant="outline"
                      className="text-blue-600 border-blue-500 bg-blue-50 capitalize px-8"
                    >
                      <NetworkIcon />
                      {ipv6.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-900 hover:underline max-w-100 truncate">
                    {ipv6.value}
                  </TableCell>
                  <TableCell className={`p-4 text-gray-600`}>
                    <Badge
                      variant="outline"
                      className={`max-w-28 ${getTlpColors(
                        marking.replaceAll('tlp:', '') ||
                          ipv6.object_marking_refs?.[0],
                      )} border-2 uppercase truncate`}
                    >
                      {marking || `TLP:${ipv6.object_marking_refs?.[0] || 'clear'}`}
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
                          className="text-gray-500 border-gray-500 bg-gray-50"
                        >
                          +{extraCount}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
                    {ipv6.created
                      ? new Date(ipv6.created).toLocaleDateString()
                      : '—'}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
                    {ipv6.modified
                      ? new Date(ipv6.modified).toLocaleDateString()
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
          {Math.min(currentPage * pageSize, total || 0)} of {total || 0} IPv6 addresses
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
            <ChevronLeft className="h-4 w-4" />
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
            <ChevronRight className="h-4 w-4" />
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
