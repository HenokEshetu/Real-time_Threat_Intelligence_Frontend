import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRelationships } from '@/hooks/useRelationships';
import { getRelEssentials } from '@/pages/Relationships/RelationshipEssentials';
import { Badge } from '@/components/ui/badge';
import { StixRelationship } from '@/types/relationship';

interface AttackPatternRelationshipProps {
  attackPatternId?: string;
}

const AttackPatternRelationship: React.FC<AttackPatternRelationshipProps> = ({ attackPatternId }) => {
  const { id: paramId } = useParams<{ id: string }>();
  const id = attackPatternId || paramId;
  const navigate = useNavigate();

  // Fetch relationships where attack-pattern is source
  const {
    relationships: sourceRelationships,
    loading: loadingSource,
    error: errorSource,
  } = useRelationships({
    filter: id ? { source_ref: id } : {},
    page: 1,
    pageSize: 100,
  });

  // Fetch relationships where attack-pattern is target
  const {
    relationships: targetRelationships,
    loading: loadingTarget,
    error: errorTarget,
  } = useRelationships({
    filter: id ? { target_ref: id } : {},
    page: 1,
    pageSize: 100,
  });

  // Merge and deduplicate relationships by id
  const relationships = React.useMemo(() => {
    const all = [...(sourceRelationships || []), ...(targetRelationships || [])];
    const seen = new Set();
    return all.filter(rel => {
      if (seen.has(rel.id)) return false;
      seen.add(rel.id);
      return true;
    });
  }, [sourceRelationships, targetRelationships]);

  const loading = loadingSource || loadingTarget;
  const error = errorSource || errorTarget;

  if (!id) {
    return <div className="p-4 text-red-500">No attack pattern ID provided.</div>;
  }

  if (loading) return <div className="p-4">Loading relationships...</div>;
  if (error) return <div className="p-4 text-red-500">Failed to load relationships.<br/>{error.message}</div>;
  if (!relationships || relationships.length === 0) {
    return <div className="p-4 text-gray-500">No relationships found for this attack pattern.</div>;
  }

  // Helper functions
  const getObjectDisplayName = (obj: any) => {
    if (!obj) return 'Unknown';
    return obj.name || obj.value || obj.id || 'Unknown';
  };

  const getDetailRoute = (obj: any) => {
    if (!obj || !obj.type || !obj.id) return null;
    switch (obj.type) {
      case 'indicator': return `/indicators/${obj.id}`;
      case 'malware': return `/malware/${obj.id}`;
      case 'campaign': return `/campaigns/${obj.id}`;
      case 'attack-pattern': return `/attack-patterns/${obj.id}`;
      case 'identity': return `/identities/${obj.id}`;
      case 'tool': return `/tools/${obj.id}`;
      case 'vulnerability': return `/vulnerabilities/${obj.id}`;
      case 'report': return `/reports/${obj.id}`;
      // Add more as needed
      default: return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">From Type</th>
            <th className="p-2 text-left">From Name</th>
            <th className="p-2 text-left">Relationship</th>
            <th className="p-2 text-left">To Type</th>
            <th className="p-2 text-left">To Name</th>
            <th className="p-2 text-left">Created</th>
          </tr>
        </thead>
        <tbody>
          {relationships.map((rel: StixRelationship) => {
            const from = rel.source;
            const to = rel.target;
            const fromType = from?.type;
            const toType = to?.type;
            const fromName = getObjectDisplayName(from);
            const toName = getObjectDisplayName(to);
            const fromRoute = getDetailRoute(from);
            const toRoute = getDetailRoute(to);

            return (
              <tr key={rel.id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  <Badge variant="outline" className={getRelEssentials(fromType).style}>
                    {getRelEssentials(fromType).icon}
                    {fromType}
                  </Badge>
                </td>
                <td
                  className="p-2 underline text-blue-700 cursor-pointer"
                  onClick={() => fromRoute && navigate(fromRoute)}
                  title={fromRoute ? `Go to ${fromType} detail` : undefined}
                >
                  {fromName}
                </td>
                <td className="p-2">
                  <Badge variant="outline" className={getRelEssentials(rel.relationship_type).style}>
                    {getRelEssentials(rel.relationship_type).icon}
                    {rel.relationship_type}
                  </Badge>
                </td>
                <td className="p-2">
                  <Badge variant="outline" className={getRelEssentials(toType).style}>
                    {getRelEssentials(toType).icon}
                    {toType}
                  </Badge>
                </td>
                <td
                  className="p-2 underline text-blue-700 cursor-pointer"
                  onClick={() => toRoute && navigate(toRoute)}
                  title={toRoute ? `Go to ${toType} detail` : undefined}
                >
                  {toName}
                </td>
                <td className="p-2">{rel.created ? new Date(rel.created).toLocaleString() : '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttackPatternRelationship;
