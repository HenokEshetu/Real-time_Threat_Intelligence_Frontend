import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { GET_REPORT } from "@/graphql/report";
import { EntityDistributionChart } from "../HorizontalBarChart";
import { Radarchart } from "../RadarChart";

const mockEntityDistribution = [
  { label: "Attack Pattern", value: 17 },
  { label: "Malware", value: 6 },
];

const mockPatternType = "STIX";
const mockMarking = "TLP:MARKING-DEFINITION--F15985A1-8F5E-5969-B76F-25ECC8181911";
const mockLabels = ["network activity", "misp-attribute"]; // <-- add this line
const mockRadarData = [
  { feeling: "Strongly Disagree", level: 186 },
  { feeling: "Disagree", level: 305 },
  { feeling: "Neutral", level: 237 },
  { feeling: "Agree", level: 273 },
  { feeling: "Strongly Agree", level: 209 },
];

const ReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_REPORT, { variables: { id } });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }
  if (error || !data?.report) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-red-500">Failed to load report.</span>
      </div>
    );
  }

  const report = data.report;

  // Use backend data if available, fallback to mock
  const patternType = report.pattern_type || mockPatternType;
  const marking =
    (report.object_marking_refs && report.object_marking_refs.length > 0
      ? report.object_marking_refs[0]
      : mockMarking);
  const labels = report.labels && report.labels.length > 0 ? report.labels : mockLabels;
  const createdBy = report.created_by_ref || "-";
  const lastUpdated = report.modified
    ? new Date(report.modified).toLocaleDateString()
    : new Date().toLocaleDateString();
  const created = report.created
    ? new Date(report.created).toLocaleString()
    : "-";
  const modified = report.modified
    ? new Date(report.modified).toLocaleString()
    : "-";

  return (
    <div className="w-full flex flex-col gap-8 px-3">
      {/* First row: two containers, each takes half width */}
      <div className="flex flex-row gap-6 w-full items-stretch">
        {/* Left container: Description, Report types, Publication date, Entity Distribution */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col items-stretch">
          <div className="flex flex-col flex-1">
            <div className="flex flex-row gap-6 h-full">
              {/* Description, Report types, Publication date */}
              <div className="flex-1 min-w-0 flex flex-col">
                <h2 className="text-base font-semibold text-foreground mb-2">Description</h2>
                <div className="text-md font-normal text-slate-600 mb-4">
                  {report.description || <span className="text-gray-400">No description.</span>}
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">Report types</h2>
                  <div className="flex flex-wrap gap-2">
                    {report.report_types && report.report_types.length > 0 ? (
                      report.report_types.map((type: string) => (
                        <span
                          key={type}
                          className="bg-blue-50 text-blue-900 border-blue-200 border rounded p-1 text-xs"
                        >
                          {type}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground mb-1">Publication date</h2>
                  <div className="text-xs text-blue-900 font-mono">
                    {report.published
                      ? new Date(report.published).toLocaleString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      : "-"}
                  </div>
                </div>
              </div>
              {/* Entity Distribution Chart */}
              <div className="flex-1 flex flex-col">
                <h2 className="text-base font-semibold text-foreground mb-2">Entities Distribution</h2> 
                <div className="flex-1 flex items-center">
                  <EntityDistributionChart data={mockEntityDistribution} height={180} title="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right container: Basic Information with radar chart and labels */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col gap-4 max-w-full items-stretch">
            <h2 className="text-base font-semibold text-foreground mb-2">Basic Information</h2>
          <div className="space-y-4 p-2 flex-1">
            <div className="flex flex-row gap-4">
              {/* Pattern Type column (like IndicatorDetail) */}
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
                        label === "network activity"
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
      {/* External Reference Section */}
      {report.external_references && report.external_references.length > 0 && (
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
              {report.external_references.map((ref: any, idx: number) => (
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
        title="Edit Report"
        onClick={() => {
          if (id) navigate(`/reports/${id}/edit`);
        }}
      >
        {/* Modern interactive pencil-square icon (Heroicons style) */}
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

export default ReportDetail;
