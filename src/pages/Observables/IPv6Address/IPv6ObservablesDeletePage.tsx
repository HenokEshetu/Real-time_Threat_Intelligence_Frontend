import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIPv6Address, useDeleteIPv6Address } from '@/hooks/observables/useIPv6Address';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';

const IPv6ObservablesDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ipv6Address, loading, error } = useIPv6Address(id || '');
  const [deleteIPv6, { loading: deleting, error: deleteError }] = useDeleteIPv6Address();

  const handleDelete = async () => {
    if (!id) return;
    await deleteIPv6({ variables: { id } });
    navigate('/observables/ipv6');
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!ipv6Address) return <ErrorMessage message="IPv6 Address not found." />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="bg-background rounded-xl shadow p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4 text-destructive">Delete IPv6 Observable</h1>
        <p className="mb-6 text-center">
          Are you sure you want to delete the IPv6 address <span className="font-semibold">{ipv6Address.value || ipv6Address.id}</span>?
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

export default IPv6ObservablesDeletePage;
