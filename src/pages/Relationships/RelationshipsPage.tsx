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

  const { loading, error, loadMore, total, relationships } = useRelationships({
    filter: {},
    page: currentPage,
    pageSize: pageSize,
  });

  const totalPages = Math.ceil((total || 0) / pageSize);

  const handleViewRelation = (id: string) => 
    // Navigates to the detail page for the selected relationship
    navigate(`/relationships/${id}`);

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

  // Helper to get a display name from a STIX object
  const getObjectDisplayName = (obj: any) => {
    if (!obj) return 'Unknown';
    return obj.name || obj.value || obj.id || 'Unknown';
  };

  // Helper to generate detail route for a STIX object or observable
  const getDetailRoute = (obj: any) => {
    if (!obj || !obj.type || !obj.id) return null;
    switch (obj.type) {
      // STIX Domain Objects
      case 'indicator':
        return `/indicators/${obj.id}`;
      case 'malware':
        return `/malware/${obj.id}`;
      case 'campaign':
        return `/campaigns/${obj.id}`;
      case 'attack-pattern':
        return `/attack-patterns/${obj.id}`;
      case 'identity':
        return `/identities/${obj.id}`;
      case 'tool':
        return `/tools/${obj.id}`;
      case 'vulnerability':
        return `/vulnerabilities/${obj.id}`;
      case 'course-of-action':
        return `/courseofaction/${obj.id}`;
      case 'intrusion-set':
        return `/intrusionsets/${obj.id}`;
      case 'threat-actor':
        return `/threat-actors/${obj.id}`;
      case 'report':
        return `/reports/${obj.id}`;
      // Observables (SCOs)
      case 'artifact':
        return `/artifacts/${obj.id}`;
      case 'autonomous-system':
        return `/observables/autonomous-systems/${obj.id}`;
      case 'directory':
        return `/observables/directories/${obj.id}`;
      case 'domain-name':
        return `/observables/domain-names/${obj.id}`;
      case 'email-addr':
      case 'email-address':
        return `/observables/email-addresses/${obj.id}`;
      case 'email-message':
        return `/observables/email-messages/${obj.id}`;
      case 'file':
        return `/observables/files/${obj.id}`;
      case 'ipv4-addr':
      case 'ipv4-address':
        return `/observables/ipv4-addresses/${obj.id}`;
      case 'ipv6-addr':
      case 'ipv6-address':
        return `/observables/ipv6-addresses/${obj.id}`;
      case 'mac-addr':
      case 'mac-address':
        return `/observables/mac-addresses/${obj.id}`;
      case 'mutex':
        return `/observables/mutexes/${obj.id}`;
      case 'network-traffic':
        return `/observables/network-traffics/${obj.id}`;
      case 'process':
        return `/observables/processes/${obj.id}`;
      case 'software':
        return `/observables/softwares/${obj.id}`;
      case 'url':
        return `/observables/urls/${obj.id}`;
      case 'user-account':
        return `/observables/user-accounts/${obj.id}`;
      case 'windows-registry-key':
        return `/observables/windows-registry-keys/${obj.id}`;
      case 'x509-certificate':
        return `/observables/x509-certificates/${obj.id}`;
      // Add more as needed
      default:
        return null;
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

              const from_obj = relation?.source;
              const to_obj = relation?.target;
              const rel_from = from_obj?.type;
              const rel_to = to_obj?.type || 'malware';

              const from_name = getObjectDisplayName(from_obj);
              const to_name = getObjectDisplayName(to_obj);

              const fromRoute = getDetailRoute(from_obj);
              const toRoute = getDetailRoute(to_obj);

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
                  {/* From Name clickable */}
                  <TableCell
                    className="p-4 text-gray-600 underline hover:text-blue-600 cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      if (fromRoute) navigate(fromRoute);
                    }}
                    title={fromRoute ? `Go to ${rel_from} detail` : undefined}
                  >
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
                  {/* To Name clickable */}
                  <TableCell
                    className="p-4 text-gray-600 underline hover:text-blue-600 cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      if (toRoute) navigate(toRoute);
                    }}
                    title={toRoute ? `Go to ${rel_to} detail` : undefined}
                  >
                    {to_name}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">{relation.created}</TableCell>
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
          {Math.min(currentPage * pageSize, total || 0)} of {total || 0}{' '}
          relationships
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
