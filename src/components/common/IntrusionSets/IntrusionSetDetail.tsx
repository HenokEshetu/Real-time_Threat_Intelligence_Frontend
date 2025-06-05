import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { INTRUSIONSET_QUERY } from "@/graphql/intrusionset/queries";

// Mock/fallbacks for missing fields
const mockLabels: string[] = ["apt", "threat-actor"];
const mockAliases: string[] = ["Fancy Bear", "Cozy Bear"];
const mockKillChainPhases: { kill_chain_name?: string; phase_name?: string; id?: string }[] = [];
const mockGoals: string[] = [];
const mockMarkings: string[] = ["TLP:CLEAR"];

const IntrusionSetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(INTRUSIONSET_QUERY, { variables: { id } });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }
  if (error || !data?.intrusionSet) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-red-500">Failed to load intrusion set.</span>
      </div>
    );
  }

  const intrusionSet = data.intrusionSet;

  // Use backend data if available, fallback to mock
  const name = intrusionSet.name || "-";
  const description = intrusionSet.description || "-";
  const labels = intrusionSet.labels && intrusionSet.labels.length > 0 ? intrusionSet.labels : mockLabels;
  const aliases = intrusionSet.aliases && intrusionSet.aliases.length > 0 ? intrusionSet.aliases : mockAliases;
  const confidence = intrusionSet.confidence ?? "-";
  const createdBy = intrusionSet.created_by_ref || "-";
  const created = intrusionSet.created ? new Date(intrusionSet.created).toLocaleString() : "-";
  const modified = intrusionSet.modified ? new Date(intrusionSet.modified).toLocaleString() : "-";
  const firstSeen = intrusionSet.first_seen ? new Date(intrusionSet.first_seen).toLocaleString() : "-";
  const lastSeen = intrusionSet.last_seen ? new Date(intrusionSet.last_seen).toLocaleString() : "-";
  const killChainPhases = intrusionSet.kill_chain_phases && intrusionSet.kill_chain_phases.length > 0 ? intrusionSet.kill_chain_phases : mockKillChainPhases;
  const goals = intrusionSet.goals && intrusionSet.goals.length > 0 ? intrusionSet.goals : mockGoals;
  const markings = intrusionSet.object_marking_refs && intrusionSet.object_marking_refs.length > 0 ? intrusionSet.object_marking_refs : mockMarkings;
  const revoked = intrusionSet.revoked ? "Yes" : "No";
  const lang = intrusionSet.lang || "-";
  const extensions = intrusionSet.extensions || "-";
  const relationships = intrusionSet.relationship || [];
  const externalReferences = intrusionSet.external_references || [];
  const primaryMotivation = intrusionSet.primary_motivation || "-";
  const secondaryMotivations = intrusionSet.secondary_motivations && intrusionSet.secondary_motivations.length > 0 ? intrusionSet.secondary_motivations : [];
  const resourceLevel = intrusionSet.resource_level || "-";

  return (
    <div className="w-full flex flex-col gap-8 px-3">
      {/* First row: two containers, each takes half width */}
      <div className="flex flex-row gap-6 w-full items-stretch">
        {/* Left container: Description, Aliases, Goals, First/Last Seen */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col items-stretch">
          <div className="flex flex-col flex-1">
            <div className="flex flex-row gap-6 h-full">
              <div className="flex-1 min-w-0 flex flex-col">
                <h2 className="text-base font-semibold text-foreground mb-2">Description</h2>
                <div className="text-md font-normal text-slate-600 mb-4">
                  {description || <span className="text-gray-400">No description.</span>}
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">Aliases</h2>
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
                  <h2 className="text-base font-semibold text-foreground mb-2">Goals</h2>
                  <div className="flex flex-wrap gap-2">
                    {goals.length > 0 ? goals.map((goal: string) => (
                      <span
                        key={goal}
                        className="bg-green-100 text-green-800 border border-green-400 rounded p-1 text-xs"
                      >
                        {goal}
                      </span>
                    )) : <span className="text-gray-400 text-xs">-</span>}
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-foreground mb-1">First Seen</h2>
                    <div className="text-xs text-blue-900 font-mono">{firstSeen}</div>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground mb-1">Last Seen</h2>
                    <div className="text-xs text-blue-900 font-mono">{lastSeen}</div>
                  </div>
                </div>
              </div>
              {/* No chart here */}
            </div>
          </div>
        </div>
        {/* Right container: Basic Information, Labels */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col gap-4 max-w-full items-stretch">
          <h2 className="text-base font-semibold text-foreground mb-2">Basic Information</h2>
          <div className="space-y-4 p-2 flex-1">
            <div className="flex flex-row gap-4">
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Primary Motivation</h2>
                <span className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {primaryMotivation}
                </span>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Resource Level</h2>
                <span className="bg-gray-100 text-gray-800 border border-gray-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {resourceLevel}
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h2 className="font-semibold text-base mb-2">Labels</h2>
                <div className="flex flex-wrap gap-2">
                  {labels.map((label: string) => (
                    <span
                      key={label}
                      className={`px-2 py-1 rounded text-xs font-semibold border bg-blue-100 text-blue-600 border-blue-400`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-base mb-2">Secondary Motivations</h2>
                <div className="flex flex-wrap gap-2">
                  {secondaryMotivations.length > 0 ? secondaryMotivations.map((mot: string) => (
                    <span
                      key={mot}
                      className="bg-yellow-100 text-yellow-800 border border-yellow-400 rounded p-1 text-xs"
                    >
                      {mot}
                    </span>
                  )) : <span className="text-gray-400 text-xs">-</span>}
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
                <h2 className="font-bold text-base mb-2">Revoked</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {revoked}
                </div>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <strong>Created:</strong>{" "}
                {created}
              </div>
              <div>
                <strong>Modified:</strong>{" "}
                {modified}
              </div>
              <div>
                <strong>Language:</strong>{" "}
                {lang}
              </div>
              <div>
                <strong>Extensions:</strong>{" "}
                {typeof extensions === "string" ? extensions : JSON.stringify(extensions)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Kill Chain Phases */}
      {killChainPhases.length > 0 && (
        <div className="mt-2 bg-white rounded-lg p-5 border border-gray-300">
          <h2 className="text-xl font-bold mb-4">Kill Chain Phases</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Kill Chain Name</th>
                <th className="text-left p-2">Phase Name</th>
              </tr>
            </thead>
            <tbody>
              {killChainPhases.map((phase: any, idx: number) => (
                <tr key={idx} className="border-b hover:bg-slate-50">
                  <td className="p-2">{phase.kill_chain_name}</td>
                  <td className="p-2">{phase.phase_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Relationships Section */}
      {relationships.length > 0 && (
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
              {relationships.map((rel: any, idx: number) => (
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
      {externalReferences.length > 0 && (
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
              {externalReferences.map((ref: any, idx: number) => (
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
      {/* <button
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors group"
        title="Edit Intrusion Set"
        onClick={() => {
          if (id) navigate(`/intrusionset/${id}/edit`);
        }}
      >
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
      </button> */}
    </div>
  );
};

export default IntrusionSetDetail;
