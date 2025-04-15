import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateArtifact } from '../../hooks/useArtifacts';
import { EntityForm } from '../../components/common/EntityForm/EntityForm';
import { CreateArtifactInput } from '../../types/artifact';

export const ArtifactCreatePage = () => {
  const navigate = useNavigate();
  const { createArtifact, loading, error } = useCreateArtifact();

  const initialValues: CreateArtifactInput = {
    name: '',
    mime_type: '',
    description: '',
    labels: [],
  };

  const handleSubmit = async (values: CreateArtifactInput) => {
    try {
      const { data } = await createArtifact({ variables: { input: values } });
      if (data?.createArtifact?.id) {
        navigate(`/artifacts/${data.createArtifact.id}`);
      }
    } catch (err) {
      console.error('Error creating artifact:', err);
    }
  };

  return (
    <div className="container">
      <h1>Create New Artifact</h1>
      {error && (
        <div className="alert alert-danger">
          Error creating artifact: {error.message}
        </div>
      )}
      <EntityForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={loading}
        fieldConfig={[
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'mime_type', label: 'MIME Type', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'labels', label: 'Labels', type: 'multiselect', options: [] },
        ]}
      />
    </div>
  );
};
