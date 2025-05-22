import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIPv4Address } from '@/hooks/observables/useIPv4Adresses';
// import { useDeleteIPv4 } from '@/hooks/observables/useIPv4Adresses';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';

const IPv4ObservablesDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ipv4, loading, error } = useIPv4Address(id);
  // const [deleteIPv4, { loading: deleting, error: deleteError }] = useDeleteIPv4();

  const handleDelete = async () => {
    if (!id) return;
    // await deleteIPv4({ variables: { id } });
    // navigate('/observables/ipv4addresses');
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!ipv4) return <ErrorMessage message="IPv4 observable not found." />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="bg-background rounded-xl shadow p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4 text-destructive">Delete IPv4 Observable</h1>
        <p className="mb-6 text-center">
          Are you sure you want to delete the IPv4 address <span className="font-semibold">{ipv4.value || ipv4.id}</span>?
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

export default IPv4ObservablesDeletePage;
