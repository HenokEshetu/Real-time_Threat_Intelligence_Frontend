import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { GET_TOOL } from "@/graphql/tool/queries";
import { WrenchIcon } from "lucide-react";

// Mock/fallbacks for missing fields
const mockLabels = ["malware", "reconnaissance"];
const mockRadarData = [
  { feeling: "Strongly Disagree", level: 186 },
  { feeling: "Disagree", level: 305 },
  { feeling: "Neutral", level: 237 },
  { feeling: "Agree", level: 273 },
  { feeling: "Strongly Agree", level: 209 },
];

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_TOOL, { variables: { id } });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }
  if (error || !data?.tool) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-red-500">Failed to load tool.</span>
      </div>
    );
  }

  const tool = data.tool;

  const labels = tool.labels && tool.labels.length > 0 ? tool.labels : mockLabels;
  const createdBy = tool.created_by_ref || "-";
  const lastUpdated = tool.modified
    ? new Date(tool.modified).toLocaleDateString()
    : new Date().toLocaleDateString();
  const created = tool.created
    ? new Date(tool.created).toLocaleString()
    : "-";
  const modified = tool.modified
    ? new Date(tool.modified).toLocaleString()
    : "-";
  const aliases = tool.aliases && tool.aliases.length > 0 ? tool.aliases : [];
  const toolTypes = tool.tool_types && tool.tool_types.length > 0 ? tool.tool_types : [];
  const toolVersion = tool.tool_version || "-";
  const confidence = tool.confidence !== undefined ? tool.confidence : "-";
  const revoked = tool.revoked ? "Yes" : "No";
  const specVersion = tool.spec_version || "-";
  const lang = tool.lang || "-";

  return (
    <div className="w-full flex flex-col gap-8 px-3">
      {/* First row: two containers, each takes half width */}
      <div className="flex flex-row gap-6 w-full items-stretch">
        {/* Left container: Description, Aliases, Tool Types, Version */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col items-stretch">
          <div className="flex flex-col flex-1">
            <div className="flex flex-row gap-6 h-full">
              {/* Description, Aliases, Tool Types, Version */}
              <div className="flex-1 min-w-0 flex flex-col">
                <h2 className="text-base font-semibold text-foreground mb-2">Description</h2>
                <div className="text-md font-normal text-slate-600 mb-4">
                  {tool.description || <span className="text-gray-400">No description.</span>}
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
                  <h2 className="text-base font-semibold text-foreground mb-2">Tool Types</h2>
                  <div className="flex flex-wrap gap-2">
                    {toolTypes.length > 0 ? (
                      toolTypes.map((type: string) => (
                        <span
                          key={type}
                          className="bg-green-50 text-green-900 border-green-200 border rounded p-1 text-xs uppercase"
                        >
                          {type}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">Tool Version</h2>
                  <div className="text-sm text-blue-900 font-mono">
                    {toolVersion}
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
                <h2 className="font-bold text-sm mb-2">Confidence</h2>
                <span className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {confidence}
                </span>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Revoked</h2>
                <span className="bg-gray-100 text-gray-800 border border-gray-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {revoked}
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                {/* Radar chart placeholder */}
                <div className="flex flex-col items-center justify-center h-full">
                  <WrenchIcon className="w-16 h-16 text-blue-400 mb-2" />
                  <div className="text-xs text-gray-500 text-center mt-2">
                    Last updated: {lastUpdated}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-base mb-2">Labels</h2>
                <div className="flex flex-wrap gap-2">
                  {labels.map((label: string) => (
                    <span
                      key={label}
                      className={`px-2 py-1 rounded text-xs font-semibold border ${
                        label === "malware"
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
                <h2 className="font-bold text-base mb-2">Spec Version</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {specVersion}
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
            </div>
          </div>
        </div>
      </div>
      {/* Relationships Section */}
      {tool.relationship && tool.relationship.length > 0 && (
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
              {tool.relationship.map((rel: any, idx: number) => (
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
      {tool.external_references && tool.external_references.length > 0 && (
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
              {tool.external_references.map((ref: any, idx: number) => (
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
        title="Edit Tool"
        onClick={() => {
          if (id) navigate(`/tools/${id}/edit`);
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

export default ToolDetail;
