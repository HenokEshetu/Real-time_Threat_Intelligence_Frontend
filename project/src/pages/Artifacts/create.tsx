import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateArtifact } from '../../hooks/useArtifacts';
import { ArtifactForm } from '../../components/artifacts/ArtifactForm';
import { CreateArtifactInput, UpdateArtifactInput } from '../../types/artifact'; // Added UpdateArtifactInput

export const ArtifactCreatePage = () => {
  const navigate = useNavigate();
  const { createArtifact, loading, error } = useCreateArtifact();

  const initialValues: CreateArtifactInput = {
    name: '',
    mime_type: '',
    description: '',
    labels: []
  };

  const handleSubmit = async (values: CreateArtifactInput | UpdateArtifactInput) => {
    try {
      // Type assertion since we know we're in create mode
      const createdArtifact = await createArtifact(values as CreateArtifactInput);
      if (createdArtifact) {
        navigate(`/artifacts/${createdArtifact.id}`);
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
      <ArtifactForm 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        isSubmitting={loading} 
      />
    </div>
  );
};