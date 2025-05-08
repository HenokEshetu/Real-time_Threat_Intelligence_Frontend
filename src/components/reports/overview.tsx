import React from 'react';

export const ReportOverview = ({ report }: { report: any }) => {
  if (!report) return null;
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Overview</h2>
      <div>
        <strong>Name:</strong> {report.name}
      </div>
      <div>
        <strong>Description:</strong> {report.description}
      </div>
      {/* Add more fields as needed */}
    </div>
  );
};
