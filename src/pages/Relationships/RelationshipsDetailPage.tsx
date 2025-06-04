import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRelationships } from '@/hooks/useRelationships';
import { getRelEssentials } from './RelationshipEssentials';

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

export const RelationshipsDetailPage = () => {
  const navigate = useNavigate();
  // Loads the relationship dynamically based on the id from the URL
  const { id } = useParams<{ id: string }>();
  const { relationships, loading, error } = useRelationships({ filter: { id }, page: 1, pageSize: 1 });
  const relation = relationships[0];

  if (loading) return <div>Loading...</div>;
  if (error || !relation) return <div>Error or not found</div>;

  // Dynamically extract from/to type and name as in RelationshipsPage
  const from_obj = relation?.source;
  const to_obj = relation?.target;
  const from_type = from_obj?.type;
  const from_name = getObjectDisplayName(from_obj);
  const to_type = to_obj?.type;
  const to_name = getObjectDisplayName(to_obj);

  // Get routes for navigation
  const fromRoute = getDetailRoute(from_obj);
  const toRoute = getDetailRoute(to_obj);

  return (
    <div className="flex flex-row items-stretch justify-center gap-8 py-10 w-full h-full">
      {/* Source container (clickable) */}
      <div
        className="flex-1 min-w-0 bg-white rounded-lg shadow p-6 transition hover:ring-2 hover:ring-blue-400"
        onClick={() => fromRoute && navigate(fromRoute)}
        title={fromRoute ? `Go to ${from_type} detail` : undefined}
        style={fromRoute ? { cursor: 'pointer' } : { cursor: 'default' }}
      >
        <div className="text-xs text-gray-400 mb-2">From Type</div>
        <div className="mb-2">
          <span className={`inline-flex items-center px-2 py-1 rounded border text-xs ${getRelEssentials(from_type).style}`}>
            {getRelEssentials(from_type).icon}
            <span className="ml-1">{from_type}</span>
          </span>
        </div>
        <div className="text-xs text-gray-400 mb-2">From Name</div>
        <div className="text-lg font-bold mb-1">{from_name}</div>
        <div className="text-sm text-gray-600">{from_obj?.description || ''}</div>
      </div>

      {/* Relationship type container (bold/interactive) */}
      <div className="flex flex-col items-center justify-center flex-1 min-w-0">
        <button
          className={`transition-all px-8 py-6 rounded-lg border-4 shadow bg-gradient-to-br from-blue-500 to-blue-700 text-white font-extrabold text-xl hover:scale-105 hover:shadow-lg focus:outline-none ${getRelEssentials(relation.relationship_type).style}`}
          title={relation.relationship_type}
          style={{ minWidth: 180 }}
        >
          {getRelEssentials(relation.relationship_type).icon}
          <span className="ml-3">{relation.relationship_type}</span>
        </button>
        <div className="mt-3 text-xs text-gray-400">Relationship</div>
      </div>

      {/* Target container (clickable) */}
      <div
        className="flex-1 min-w-0 bg-white rounded-lg shadow p-6 transition hover:ring-2 hover:ring-blue-400"
        onClick={() => toRoute && navigate(toRoute)}
        title={toRoute ? `Go to ${to_type} detail` : undefined}
        style={toRoute ? { cursor: 'pointer' } : { cursor: 'default' }}
      >
        <div className="text-xs text-gray-400 mb-2">To Type</div>
        <div className="mb-2">
          <span className={`inline-flex items-center px-2 py-1 rounded border text-xs ${getRelEssentials(to_type).style}`}>
            {getRelEssentials(to_type).icon}
            <span className="ml-1">{to_type}</span>
          </span>
        </div>
        <div className="text-xs text-gray-400 mb-2">To Name</div>
        <div className="text-lg font-bold mb-1">{to_name}</div>
        <div className="text-sm text-gray-600">{to_obj?.description || ''}</div>
      </div>
    </div>
  );
};
