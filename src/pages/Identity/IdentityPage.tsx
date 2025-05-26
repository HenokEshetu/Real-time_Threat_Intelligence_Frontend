import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdentities } from "@/hooks/useIdentity";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight, UserCircle2 } from "lucide-react";
import type { Identity } from "@/types/identity";

// Helper for TLP/marking color
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

export const IdentityPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const { identities, loading, error } = useIdentities({
    filters: undefined,
    page: currentPage,
    pageSize,
  });

  const total = identities?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const handleViewIdentity = (id: string) => navigate(`/identities/${id}`);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  if (loading && (!identities || !identities.results)) {
    return (
      <div className="w-full px-4 py-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
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
            Error loading identities: {error.message || "Unknown error"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const results: Identity[] = Array.isArray(identities?.results) ? identities.results : [];

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="overflow-x-auto overflow-y-auto h-[85vh] bg-white rounded-md">
        <Table className="w-full text-sm text-foreground h-full">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="font-bold p-4 w-12"></TableHead>
              <TableHead className="font-bold p-4">Name</TableHead>
              <TableHead className="font-bold p-4">Identity Class</TableHead>
              <TableHead className="font-bold p-4">Markings</TableHead>
              <TableHead className="font-bold p-4">Labels</TableHead>
              <TableHead className="font-bold p-4">Sectors</TableHead>
              <TableHead className="font-bold p-4">Created</TableHead>
              <TableHead className="font-bold p-4">Modified</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((identity: Identity, idx: number) => {
              const labels = Array.isArray(identity.labels) ? identity.labels.filter(Boolean) : [];
              const sectors = Array.isArray(identity.sectors) ? identity.sectors.filter(Boolean) : [];
              const markings = Array.isArray(identity.object_marking_refs) ? identity.object_marking_refs.filter(Boolean) : [];
              // Marking logic: prefer TLP label if present, else first marking ref
              let marking = '';
              labels.forEach((lbl) => {
                if (typeof lbl === "string" && lbl.toLowerCase().startsWith('tlp:')) {
                  marking = lbl;
                }
              });
              if (!marking && markings.length > 0 && typeof markings[0] === "string") {
                marking = markings[0];
              }
              return (
                <TableRow
                  key={identity.id || idx}
                  onClick={() => identity.id && handleViewIdentity(identity.id)}
                  className="hover:bg-muted bg-background transition-colors border-b border-border cursor-pointer"
                >
                  <TableCell className="p-4">
                    <div className="rounded-full bg-gradient-to-br from-blue-200 to-blue-400 shadow w-8 h-8 flex items-center justify-center border-2 border-white">
                      {identity.name && typeof identity.name === "string" && identity.name.length > 0 ? (
                        <span className="text-base font-bold text-white">{identity.name[0].toUpperCase()}</span>
                      ) : (
                        <UserCircle2 className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="p-4 font-medium hover:underline max-w-100 truncate">
                    {identity.name && typeof identity.name === "string" && identity.name.length > 0
                      ? identity.name
                      : <span className="text-gray-400">Unnamed</span>}
                  </TableCell>
                  <TableCell className="p-4">
                    <Badge
                      variant="outline"
                      className="px-3 py-1 text-xs font-semibold uppercase border-2 border-blue-400 bg-blue-50 text-blue-700 tracking-wide shadow-sm"
                    >
                      {identity.identity_class && typeof identity.identity_class === "string"
                        ? identity.identity_class
                        : "—"}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4">
                    <Badge
                      variant="outline"
                      className={`max-w-28 ${
                        marking && typeof marking === 'string'
                          ? getTlpColors(marking.replace(/^tlp:/i, '').replace(/^marking-definition--/i, ''))
                          : getTlpColors('clear')
                      } border-2 uppercase truncate`}
                    >
                      {marking && typeof marking === "string"
                        ? marking.toUpperCase()
                        : '—'}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4 max-w-100">
                    <div className="flex flex-wrap gap-1">
                      {labels.length > 0 ? labels.slice(0, 3).map((label) => (
                        <Badge key={label} variant="outline" className="border-blue-400 bg-blue-50 text-blue-700">
                          {label}
                        </Badge>
                      )) : <span className="text-muted-foreground">—</span>}
                      {labels.length > 3 && (
                        <Badge variant="outline" className="text-muted-foreground border-border bg-muted">
                          +{labels.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="p-4 max-w-100">
                    <div className="flex flex-wrap gap-1">
                      {sectors.length > 0 ? sectors.slice(0, 3).map((sector) => (
                        <Badge key={sector} variant="outline" className="border-green-400 bg-green-50 text-green-700">
                          {sector}
                        </Badge>
                      )) : <span className="text-muted-foreground">—</span>}
                      {sectors.length > 3 && (
                        <Badge variant="outline" className="text-muted-foreground border-border bg-muted">
                          +{sectors.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="p-4">
                    {identity.created
                      ? (() => { try { return new Date(identity.created).toLocaleDateString(); } catch { return "—"; } })()
                      : "—"}
                  </TableCell>
                  <TableCell className="p-4">
                    {identity.modified
                      ? (() => { try { return new Date(identity.modified).toLocaleDateString(); } catch { return "—"; } })()
                      : "—"}
                  </TableCell>
                </TableRow>
              );
            })}
            {results.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No identities found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-4 py-2 border-t">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, total)} of {total} identities
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

export { IdentityPage as IdentityListPage };