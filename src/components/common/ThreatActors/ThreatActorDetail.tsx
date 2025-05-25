import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useThreatActorDetail } from '@/hooks/useThreatActors';
import { Radarchart } from '../RadarChart';
import { Loading } from '../Loading/Loading';

const mockRadarData = [
  { feeling: 'Strongly Disagree', level: 186 },
  { feeling: 'Disagree', level: 305 },
  { feeling: 'Neutral', level: 237 },
  { feeling: 'Agree', level: 273 },
  { feeling: 'Strongly Agree', level: 209 },
];

const ThreatActorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { threatActor, loading, error } = useThreatActorDetail(id || '');

  if (loading) {
    return <Loading />;
  }
  if (error || !threatActor) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-red-500">Failed to load threat actor.</span>
      </div>
    );
  }

  const actor = threatActor;

  const marking =
    actor.object_marking_refs && actor.object_marking_refs.length > 0
      ? actor.object_marking_refs[0]
      : '-';
  const labels = actor.labels && actor.labels.length > 0 ? actor.labels : [];
  const createdBy = actor.created_by_ref || '-';
  const lastUpdated = actor.modified
    ? new Date(actor.modified).toLocaleDateString()
    : new Date().toLocaleDateString();
  const created = actor.created
    ? new Date(actor.created).toLocaleString()
    : '-';
  const modified = actor.modified
    ? new Date(actor.modified).toLocaleString()
    : '-';
  const firstSeen = actor.first_seen
    ? new Date(actor.first_seen).toLocaleString()
    : '-';
  const lastSeen = actor.last_seen
    ? new Date(actor.last_seen).toLocaleString()
    : '-';
  const aliases =
    actor.aliases && actor.aliases.length > 0 ? actor.aliases : [];
  const roles = actor.roles && actor.roles.length > 0 ? actor.roles : [];
  const goals = actor.goals && actor.goals.length > 0 ? actor.goals : [];
  const threatActorTypes =
    actor.threat_actor_types && actor.threat_actor_types.length > 0
      ? actor.threat_actor_types
      : [];
  const sophistication = actor.sophistication || '-';
  const resourceLevel = actor.resource_level || '-';
  const primaryMotivation = actor.primary_motivation || '-';
  const secondaryMotivations =
    actor.secondary_motivations && actor.secondary_motivations.length > 0
      ? actor.secondary_motivations
      : [];
  const personalMotivations = actor.personal_motivations || '-';

  return (
    <div className="w-full flex flex-col gap-8 px-3">
      {/* First row: two containers, each takes half width */}
      <div className="flex flex-row gap-6 w-full items-stretch">
        {/* Left container: Description, Aliases, Goals, First/Last Seen */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col items-stretch">
          <div className="flex flex-col flex-1">
            <div className="flex flex-row gap-6 h-full">
              {/* Description, Aliases, Goals, First/Last Seen */}
              <div className="flex-1 min-w-0 flex flex-col">
                <h2 className="text-base font-semibold text-foreground mb-2">
                  Description
                </h2>
                <div className="text-md font-normal text-slate-600 mb-4">
                  {actor.description || (
                    <span className="text-gray-400">No description.</span>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">
                    Aliases
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {aliases.length > 0 ? (
                      aliases.map((alias: string) => (
                        <span
                          key={alias}
                          className="bg-blue-50 text-blue-900 border-blue-200 border rounded p-1 text-xs"
                        >
                          {alias}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">
                    Goals
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {goals.length > 0 ? (
                      goals.map((goal: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-green-50 text-green-900 border-green-200 border rounded p-1 text-xs"
                        >
                          {goal}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-foreground mb-1">
                      First Seen
                    </h2>
                    <div className="text-xs text-blue-900 font-mono">
                      {firstSeen}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground mb-1">
                      Last Seen
                    </h2>
                    <div className="text-xs text-blue-900 font-mono">
                      {lastSeen}
                    </div>
                  </div>
                </div>
              </div>
              {/* No entity distribution chart here */}
            </div>
          </div>
        </div>
        {/* Right container: Basic Information */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col gap-4 max-w-full items-stretch">
          <h2 className="text-base font-semibold text-foreground mb-2">
            Basic Information
          </h2>
          <div className="space-y-4 p-2 flex-1">
            <div className="flex flex-row gap-4">
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Threat Actor Types</h2>
                <span className="bg-indigo-100 text-indigo-800 border border-indigo-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {threatActorTypes.length > 0
                    ? threatActorTypes.join(', ')
                    : '-'}
                </span>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Marking</h2>
                <span className="bg-gray-100 text-gray-800 border border-gray-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {marking}
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Radarchart
                  title="Distribution of opinions"
                  desc="please give your opinion"
                  footer={
                    <div className="text-xs text-gray-500 text-center mt-2">
                      Last updated: {lastUpdated}
                    </div>
                  }
                  data={mockRadarData}
                />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-base mb-2">Labels</h2>
                <div className="flex flex-wrap gap-2">
                  {labels.map((label: string) => (
                    <span
                      key={label}
                      className={`px-2 py-1 rounded text-xs font-semibold border bg-indigo-100 text-indigo-600 border-indigo-400`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h2 className="font-bold text-base mb-2">Created By</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {createdBy}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-base mb-2">Last Updated</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {lastUpdated}
                </div>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <strong>Created:</strong> {created}
              </div>
              <div>
                <strong>Modified:</strong> {modified}
              </div>
              <div>
                <strong>Roles:</strong>{' '}
                {roles.length > 0 ? roles.join(', ') : '-'}
              </div>
              <div>
                <strong>Sophistication:</strong> {sophistication}
              </div>
              <div>
                <strong>Resource Level:</strong> {resourceLevel}
              </div>
              <div>
                <strong>Primary Motivation:</strong> {primaryMotivation}
              </div>
              <div>
                <strong>Secondary Motivations:</strong>{' '}
                {secondaryMotivations.length > 0
                  ? secondaryMotivations.join(', ')
                  : '-'}
              </div>
              <div>
                <strong>Personal Motivations:</strong> {personalMotivations}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Relationships Section */}
      {actor.relationship && actor.relationship.length > 0 && (
        <div className="mt-2 bg-white rounded-lg p-5 border border-gray-300">
          <h2 className="text-xl font-bold mb-4">Relationships</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Source Ref</th>
                <th className="text-left p-2">Target Ref</th>
                <th className="text-left p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {actor.relationship.map((rel: any, idx: number) => (
                <tr key={idx} className="border-b hover:bg-slate-50">
                  <td className="p-2">{rel.id}</td>
                  <td className="p-2">{rel.source_ref}</td>
                  <td className="p-2">{rel.target_ref}</td>
                  <td className="p-2">{rel.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* External Reference Section */}
      {actor.external_references && actor.external_references.length > 0 && (
        <div className="mt-2 bg-white rounded-lg p-5 border border-gray-300">
          <h2 className="text-xl font-bold mb-4">External References</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Source Name</th>
                <th className="text-left p-2">URL</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {actor.external_references.map((ref: any, idx: number) => (
                <tr key={idx} className="border-b hover:bg-slate-50">
                  <td className="p-2">
                    <span className="bg-blue-50 text-blue-600 border border-blue-400 rounded px-2 py-1 text-xs font-semibold">
                      {ref.source_name}
                    </span>
                  </td>
                  <td className="p-2">
                    {ref.url ? (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 underline break-all"
                      >
                        {ref.url}
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="p-2">
                    {ref.description ? (
                      <span>{ref.description}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Floating Edit Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors group"
        title="Edit Threat Actor"
        onClick={() => {
          if (id) navigate(`/threatactors/${id}/edit`);
        }}
      >
        {/* Pencil-square icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 transition-transform duration-150 group-hover:scale-110 group-active:scale-95"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 3.487a2.1 2.1 0 1 1 2.97 2.97L7.5 18.79l-4 1 1-4 12.362-12.303ZM19 7l-2-2M5 21h14"
          />
        </svg>
      </button>
    </div>
  );
};

export default ThreatActorDetail;
