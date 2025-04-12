import { useParams, useNavigate } from 'react-router-dom';
import { useArtifact, useUpdateArtifact } from '../../../hooks/useArtifacts';
import { ArtifactForm } from '../../../components/artifacts/ArtifactForm';
import { Loading } from '../../../components/common/Loading';
import { ErrorMessage } from '../../../components/common/ErrorMessage';
import { UpdateArtifactInput } from '../../../types/artifact';

export const ArtifactEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artifact, loading: loadingArtifact, error: artifactError } = useArtifact(id || '');
  const { updateArtifact, loading: updating, error: updateError } = useUpdateArtifact();

  const handleSubmit = async (values: UpdateArtifactInput) => {
    try {
      if (!id) return;
      await updateArtifact(id, values);
      navigate(`/artifacts/${id}`);
    } catch (err) {
      console.error('Error updating artifact:', err);
    }
  };

  if (loadingArtifact) return <Loading />;
  if (artifactError) return <ErrorMessage message={artifactError.message} />;
  if (!artifact) return <ErrorMessage message="Artifact not found" />;

  return (
    <div className="container">
      <h1>Edit Artifact</h1>
      {updateError && (
        <div className="alert alert-danger">
          Error updating artifact: {updateError.message}
        </div>
      )}
      <ArtifactForm 
        initialValues={artifact} 
        onSubmit={handleSubmit} 
        isSubmitting={updating} 
      />
    </div>
  );
};