import { useParams } from 'react-router-dom';
import { useArtifact } from '../../hooks/useArtifacts';
import { ArtifactDetail } from '../../components/artifacts/ArtifactDetail';
import { Loading } from '../../components/common/Loading/Loading';
import { ErrorMessage } from '../../components/common/ErrorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

export const ArtifactDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { artifact, loading, error } = useArtifact(id || '');

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!artifact) return <ErrorMessage message="Artifact not found" />;

  return (
    <div className="container">
      <div className="mb-3">
        <Link to="/artifacts" className="btn btn-outline-secondary">
          Back to List
        </Link>
        <Link 
          to={`/artifacts/${id}/edit`} 
          className="btn btn-primary ms-2"
        >
          Edit
        </Link>
      </div>
      
      <ArtifactDetail artifact={artifact} />
    </div>
  );
};