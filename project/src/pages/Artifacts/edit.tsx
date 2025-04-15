import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArtifact, useUpdateArtifact } from '../../hooks/useArtifacts';
import { EntityForm } from '../../components/common/EntityForm/EntityForm';
import { UpdateArtifactInput } from '../../types/artifact';

export const ArtifactEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artifact, loading: loadingArtifact, error: artifactError } = useArtifact(id || '');
  const { updateArtifact, loading: updating, error: updateError } = useUpdateArtifact();

  const handleSubmit = async (values: UpdateArtifactInput) => {
    try {
      if (!id) return;
      await updateArtifact({ variables: { id, input: values } });
      navigate(`/artifacts/${id}`);
    } catch (err) {
      console.error('Error updating artifact:', err);
    }
  };

  if (loadingArtifact) return <div>Loading...</div>;
  if (artifactError) return <div>Error: {artifactError.message}</div>;
  if (!artifact) return <div>Artifact not found</div>;

  return (
    <div className="container">
      <h1>Edit Artifact</h1>
      {updateError && (
        <div className="alert alert-danger">
          Error updating artifact: {updateError.message}
        </div>
      )}
      <EntityForm
        initialValues={artifact}
        onSubmit={handleSubmit}
        isSubmitting={updating}
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
