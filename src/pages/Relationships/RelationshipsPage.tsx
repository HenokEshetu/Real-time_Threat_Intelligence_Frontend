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
import { useURLs } from '@/hooks/observables/useURLs';
import {
  useRelationshipObjects,
  useRelationships,
} from '@/hooks/useRelationships';
import { tailwindColors } from '@/lib/tailwindcolors';
import { URL } from '@/types/observables/url';
import { StixRelationship } from '@/types/relationship';
import {
  CableIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRelEssentials } from './RelationshipEssentials';

export const RelationshipsPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  const { loading, error, loadMore, total, relationships, all_objects } =
    useRelationships({
      filter: { },
      page: currentPage,
      pageSize: pageSize,
    });

  const totalPages = Math.ceil((total || 0) / pageSize);

  const handleViewRelation = (id: string) => navigate(`/relationships/${id}`);

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

  if (loading && relationships.length === 0) {
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
            Error loading relationships: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="overflow-x-auto overflow-y-auto h-[86vh] bg-white rounded-md">
        <Table className="w-full text-sm text-foreground h-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-bold p-4 text-gray-800"></TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                From Type
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                From Name
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Type
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                To Type
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                To Name
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Created
              </TableHead>
              <TableHead className="font-bold p-4 text-gray-800">
                Marking
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {relationships.map((relation: StixRelationship, ind) => {
              const labels = relation.labels || [];
              var uniqueLabels: string[] = [];
              var marking = '';

              labels.forEach((lbl) => {
                if (!uniqueLabels.includes(lbl)) uniqueLabels.push(lbl);
                if (lbl.includes('tlp:')) {
                  marking = lbl;
                  uniqueLabels = uniqueLabels.filter((label) => label !== lbl);
                }
              });

              const rel_from = relation.source.type;
              const rel_to = relation?.target?.type || 'malware';

              const from_name = relation?.source?.name || 'Unknown';
              const to_name = relation?.target?.name || 'Unknown';

              return (
                <TableRow
                  key={relation.id}
                  onClick={() => handleViewRelation(relation.id)}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-300 cursor-pointer"
                >
                  <TableCell className="p-4 text-gray-500">
                    <div className="pl-5">
                      <CableIcon />
                    </div>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-900 hover:underline max-w-100 truncate">
                    <Badge
                      variant="outline"
                      className={`max-w-28 ${getRelEssentials(rel_from).style}`}
                    >
                      {getRelEssentials(rel_from).icon}
                      {rel_from}
                    </Badge>
                  </TableCell>
                  <TableCell className={`p-4 text-gray-600`}>
                    {from_name}
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-900 hover:underline max-w-100 truncate">
                    <Badge
                      variant="outline"
                      className={`max-w-28 ${
                        getRelEssentials(relation.relationship_type).style
                      }`}
                    >
                      {getRelEssentials(relation.relationship_type).icon}
                      {relation.relationship_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-900 hover:underline max-w-100 truncate">
                    <Badge
                      variant="outline"
                      className={`max-w-28 ${getRelEssentials(rel_to).style}`}
                    >
                      {getRelEssentials(rel_to).icon}
                      {rel_to}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
                    {to_name}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
                    {relation.created}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
                    {/*{realtion.marking}*/}
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
          {Math.min(currentPage * pageSize, total || 0)} of {total || 0} relationships
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
