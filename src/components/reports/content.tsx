import React from 'react';

export const ReportContent = ({ report }: { report: any }) => {
  if (!report) return null;
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Content</h2>
      {/* Implement content display here */}
      <div>No content available.</div>
    </div>
  );
};
