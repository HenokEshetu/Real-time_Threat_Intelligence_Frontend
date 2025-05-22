import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useURL, useDeleteURL } from '@/hooks/observables/useURLs';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';

const URLObservablesDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { url, loading, error } = useURL(id || '');
  const [deleteURL, { loading: deleting, error: deleteError }] = useDeleteURL();

  const handleDelete = async () => {
    if (!id) return;
    await deleteURL({ variables: { id } });
    navigate('/observables/urls');
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!url) return <ErrorMessage message="URL not found." />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="bg-background rounded-xl shadow p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4 text-destructive">Delete URL Observable</h1>
        <p className="mb-6 text-center">
          Are you sure you want to delete the URL <span className="font-semibold">{url.value || url.id}</span>?
          <br />
          This action cannot be undone.
        </p>
        {deleteError && (
          <div className="text-destructive text-sm mb-4">{deleteError.message}</div>
        )}
        <div className="flex gap-4 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(-1)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default URLObservablesDeletePage;
