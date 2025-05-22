import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { GET_CAMPAIGN } from "@/graphql/campaign/queries";
import { Radarchart } from "../RadarChart"; // <-- import radar chart

// Mock/fallbacks for missing fields
const mockPatternType = "STIX";
const mockMarking = "TLP:MARKING-DEFINITION--F15985A1-8F5E-5969-B76F-25ECC8181911";
const mockLabels = ["misp", "phishing"];
const mockRadarData = [
  { feeling: "Strongly Disagree", level: 186 },
  { feeling: "Disagree", level: 305 },
  { feeling: "Neutral", level: 237 },
  { feeling: "Agree", level: 273 },
  { feeling: "Strongly Agree", level: 209 },
];

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_CAMPAIGN, { variables: { id } });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }
  if (error || !data?.campaign) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-red-500">Failed to load campaign.</span>
      </div>
    );
  }

  const campaign = data.campaign;

  // Use backend data if available, fallback to mock
  const patternType = campaign.pattern_type || mockPatternType;
  const marking =
    (campaign.object_marking_refs && campaign.object_marking_refs.length > 0
      ? campaign.object_marking_refs[0]
      : mockMarking);
  const labels = campaign.labels && campaign.labels.length > 0 ? campaign.labels : mockLabels;
  const createdBy = campaign.created_by_ref || "-";
  const lastUpdated = campaign.modified
    ? new Date(campaign.modified).toLocaleDateString()
    : new Date().toLocaleDateString();
  const created = campaign.created
    ? new Date(campaign.created).toLocaleString()
    : "-";
  const modified = campaign.modified
    ? new Date(campaign.modified).toLocaleString()
    : "-";
  const firstSeen = campaign.first_seen
    ? new Date(campaign.first_seen).toLocaleString()
    : "-";
  const lastSeen = campaign.last_seen
    ? new Date(campaign.last_seen).toLocaleString()
    : "-";
  const aliases = campaign.aliases && campaign.aliases.length > 0 ? campaign.aliases : [];
  const objective = campaign.objective || "-";

  return (
    <div className="w-full flex flex-col gap-8 px-3">
      {/* First row: two containers, each takes half width */}
      <div className="flex flex-row gap-6 w-full items-stretch">
        {/* Left container: Description, Aliases, Objective, First/Last Seen */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col items-stretch">
          <div className="flex flex-col flex-1">
            <div className="flex flex-row gap-6 h-full">
              {/* Description, Aliases, Objective, First/Last Seen */}
              <div className="flex-1 min-w-0 flex flex-col">
                <h2 className="text-base font-semibold text-foreground mb-2">Description</h2>
                <div className="text-md font-normal text-slate-600 mb-4">
                  {campaign.description || <span className="text-gray-400">No description.</span>}
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
                  <h2 className="text-base font-semibold text-foreground mb-2">Objective</h2>
                  <div className="text-sm text-blue-900 font-mono">
                    {objective}
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
              {/* No entity distribution chart here */}
            </div>
          </div>
        </div>
        {/* Right container: Basic Information */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col gap-4 max-w-full items-stretch">
          <h2 className="text-base font-semibold text-foreground mb-2">Basic Information</h2>
          <div className="space-y-4 p-2 flex-1">
            <div className="flex flex-row gap-4">
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Pattern Type</h2>
                <span className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {
                    Array.isArray(patternType)
                      ? patternType.join(', ')
                      : patternType || '-'
                  }
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
                      className={`px-2 py-1 rounded text-xs font-semibold border ${
                        label === "phishing"
                          ? "bg-pink-100 text-pink-600 border-pink-400"
                          : "bg-blue-100 text-blue-600 border-blue-400"
                      }`}
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
                <strong>Created:</strong>{" "}
                {created}
              </div>
              <div>
                <strong>Modified:</strong>{" "}
                {modified}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Relationships Section */}
      {campaign.relationship && campaign.relationship.length > 0 && (
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
              {campaign.relationship.map((rel: any, idx: number) => (
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
      {campaign.external_references && campaign.external_references.length > 0 && (
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
              {campaign.external_references.map((ref: any, idx: number) => (
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
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors group"
        title="Edit Campaign"
        onClick={() => {
          if (id) navigate(`/campaigns/${id}/edit`);
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

export default CampaignDetail;
