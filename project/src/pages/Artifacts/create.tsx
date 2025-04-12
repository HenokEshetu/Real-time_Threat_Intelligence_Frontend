import { useNavigate } from 'react-router-dom';
import { useCreateArtifact } from '../../hooks/useArtifacts';
import { ArtifactForm } from '../../components/artifacts/ArtifactForm';
import { CreateArtifactInput } from '../../types/artifact';

export const ArtifactCreatePage = () => {
  const navigate = useNavigate();
  const { createArtifact, loading, error } = useCreateArtifact();

  const initialValues: CreateArtifactInput = {
    name: '',
    mime_type: '',
    description: '',
    labels: []
  };

  const handleSubmit = async (values: CreateArtifactInput) => {
    try {
      const createdArtifact = await createArtifact(values);
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