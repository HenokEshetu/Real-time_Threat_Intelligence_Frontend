import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReport, useUpdateReport } from '../../hooks/useReports';
import { EntityForm } from '../../components/common/EntityForm/EntityForm';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles } from 'lucide-react';

export const ReportsEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { report, loading, error } = useReport(id || '');
  const [updateReport, { loading: updating, error: updateError }] = useUpdateReport();

  const fieldConfig = [
    { name: 'name', label: 'Report Name', type: 'text', required: true, icon: <FileText /> },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'authors', label: 'Authors', type: 'multiselect', options: [] as string[], required: false },
    { name: 'published', label: 'Published Date', type: 'date', required: false },
    { name: 'report_types', label: 'Report Types', type: 'multiselect', options: [] as string[], required: false },
    { name: 'confidence', label: 'Confidence', type: 'slider', min: 0, max: 100, required: false },
    { name: 'labels', label: 'Labels', type: 'multiselect', options: [] as string[], required: false },
    { name: 'external_references', label: 'External References', type: 'dynamic-list', fields: [
      { name: 'source_name', label: 'Source Name', type: 'text', required: true },
      { name: 'url', label: 'URL', type: 'text', required: false },
      { name: 'external_id', label: 'External ID', type: 'text', required: false },
    ]},
  ];

  const handleSubmit = async (values: any) => {
    try {
      await updateReport({ variables: { id, input: values } });
      navigate(`/reports/${id}`);
    } catch (err) {
      // error handled below
    }
  };

  if (loading) return <div className="text-center py-10">Loading report...</div>;
  if (error) return <div className="text-red-600 text-center py-10">Error loading report.</div>;
  if (!report) return <div className="text-center py-10">Report not found.</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 bg-gradient-to-br from-yellow-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-950 rounded-3xl shadow-2xl animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <span className="bg-yellow-400 text-white rounded-full p-3 shadow-lg">
          <Sparkles className="w-7 h-7" />
        </span>
        <h1 className="text-3xl font-extrabold text-yellow-700 dark:text-yellow-200 tracking-tight flex items-center gap-2">
          Edit Your Amazing Report
        </h1>
      </div>
      {updateError && (
        <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded shadow">
          Error: {updateError.message}
        </div>
      )}
      <EntityForm
        initialValues={report}
        onSubmit={handleSubmit}
        isSubmitting={updating}
        fieldConfig={fieldConfig}
      />
    </div>
  );
};
