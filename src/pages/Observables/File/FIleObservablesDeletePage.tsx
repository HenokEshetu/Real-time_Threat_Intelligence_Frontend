import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFile } from '@/hooks/observables/useFiles';
// import { useDeleteFile } from '@/hooks/observables/useFiles';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';

const FileObservablesDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { file, loading, error } = useFile(id || '');
  // const [deleteFile, { loading: deleting, error: deleteError }] = useDeleteFile();

  const handleDelete = async () => {
    if (!id) return;
    // await deleteFile({ variables: { id } });
    // navigate('/observables/files');
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!file) return <ErrorMessage message="File not found." />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="bg-background rounded-xl shadow p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4 text-destructive">Delete File Observable</h1>
        <p className="mb-6 text-center">
          Are you sure you want to delete the file <span className="font-semibold">{file.name || file.id}</span>?
          <br />
          This action cannot be undone.
        </p>
        {/* {deleteError && (
          <div className="text-destructive text-sm mb-4">{deleteError.message}</div>
        )} */}
        <div className="flex gap-4 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(-1)}
            // disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleDelete}
            // disabled={deleting}
          >
            {/* {deleting ? 'Deleting...' : 'Delete'} */}
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileObservablesDeletePage;
