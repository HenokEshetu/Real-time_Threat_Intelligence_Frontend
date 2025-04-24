import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateReport } from '../../hooks/useReports';
import { EntityForm } from '../../components/common/EntityForm/EntityForm';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles } from 'lucide-react';

export const ReportsCreatePage = () => {
  const navigate = useNavigate();
  const [createReport, { loading, error }] = useCreateReport();

  const initialValues = {
    name: '',
    description: '',
    authors: [] as string[],
    published: '',
    report_types: [] as string[],
    confidence: 50,
    labels: [] as string[],
    external_references: [] as {
      source_name: string;
      url?: string;
      external_id?: string;
    }[],
  };

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
      const { data } = await createReport({ variables: { input: values } });
      if (data?.createReport?.id) {
        navigate(`/reports/${data.createReport.id}`);
      }
    } catch (err) {
      // error handled below
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-950 rounded-3xl shadow-2xl animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <span className="bg-blue-600 text-white rounded-full p-3 shadow-lg">
          <Sparkles className="w-7 h-7" />
        </span>
        <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-200 tracking-tight flex items-center gap-2">
          Create a Fantastic Report
        </h1>
      </div>
      {error && (
        <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded shadow">
          Error: {error.message}
        </div>
      )}
      <EntityForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={loading}
        fieldConfig={fieldConfig}
      />
    </div>
  );
};
