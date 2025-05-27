import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoursesOfAction } from '@/hooks/useCourseOfAction';
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
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  TrendingUp,
} from 'lucide-react';
import type { CourseOfAction } from '@/types/courseofaction';

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
    bg: 'bg-neutral-50',
    border: 'border-neutral-500',
    text: 'text-neutral-600',
  },
  { bg: 'bg-slate-50', border: 'border-slate-500', text: 'text-slate-600' },
  { bg: 'bg-gray-50', border: 'border-gray-500', text: 'text-gray-600' },
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

export const CourseOfActionPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  const { coursesOfAction, loading, error, total } = useCoursesOfAction({
    page: currentPage,
    pageSize,
  });

  const labelColorMap = useRef<Map<string, (typeof tailwindColors)[0]>>(
    new Map(),
  );

  const totalPages = Math.ceil((total || 0) / pageSize);

  const handleViewCOA = (id: string) => navigate(`/courseofaction/${id}`);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  if (loading && coursesOfAction.length === 0) {
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
            Error loading courses of action: {error.message}
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
                Type
              </TableHead>
              <TableHead className="font-bold p-4 text-foreground">
                Name
              </TableHead>
              <TableHead className="font-bold p-4 text-foreground">
                Description
              </TableHead>
              <TableHead className="font-bold p-4 text-foreground">
                Labels
              </TableHead>
              <TableHead className="font-bold p-4 text-foreground">
                Created
              </TableHead>
              <TableHead className="font-bold p-4 text-foreground">
                Modified
              </TableHead>
              <TableHead className="font-bold p-4 text-foreground">
                Revoked
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coursesOfAction.map((coa: CourseOfAction) => {
              const labels = coa.labels || [];
              let uniqueLabels: string[] = [];
              labels.forEach((lbl: string) => {
                if (!uniqueLabels.includes(lbl)) uniqueLabels.push(lbl);
              });
              const displayLabels = uniqueLabels.slice(0, 3);
              const extraCount = uniqueLabels.length - displayLabels.length;

              return (
                <TableRow
                  key={coa.id}
                  onClick={() => handleViewCOA(coa.id)}
                  className="hover:bg-muted bg-background transition-colors border-b border-border cursor-pointer"
                >
                  <TableCell className="p-4">
                    <Badge
                      variant="outline"
                      className="text-fuchsia-500 border-fuchsia-500 bg-fuchsia-50 px-8"
                    >
                      <TrendingUp className="h-5 w-5 text-fuchsia-600" />
                      Course of Action
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground hover:underline max-w-100 truncate">
                    {coa.name || 'Unknown'}
                  </TableCell>
                  <TableCell className="p-4 text-foreground max-w-2xl truncate">
                    {coa.description || '—'}
                  </TableCell>
                  <TableCell className="p-4 max-w-100">
                    <div className="flex flex-wrap gap-1">
                      {displayLabels.length > 0 &&
                      displayLabels.some((l) => l) ? (
                        displayLabels.map((label) => {
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
                        })
                      ) : (
                        <span className="text-2xl text-gray-300 font-bold">
                          —
                        </span>
                      )}
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
                    {coa.created
                      ? new Date(coa.created).toLocaleDateString()
                      : '—'}
                  </TableCell>
                  <TableCell className="p-4 text-foreground">
                    {coa.modified
                      ? new Date(coa.modified).toLocaleDateString()
                      : '—'}
                  </TableCell>
                  <TableCell className="p-4 text-foreground uppercase">
                    {coa.revoked !== undefined && coa.revoked !== null
                      ? coa.revoked
                        ? 'YES'
                        : 'NO'
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
          {Math.min(currentPage * pageSize, total || 0)} of {total || 0} courses
          of action
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

export default CourseOfActionPage;
