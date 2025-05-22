import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useX509Certificate, useDeleteX509Certificate } from '@/hooks/observables/useX509certificate';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';

export const X509CertificateObservablesDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { certificate, loading, error } = useX509Certificate(id || '');
  const [deleteCertificate, { loading: deleting, error: deleteError }] = useDeleteX509Certificate();

  const handleDelete = async () => {
    if (!id) return;
    await deleteCertificate({ variables: { id } });
    navigate('/observables/x509-certificates');
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!certificate) return <ErrorMessage message="Certificate not found." />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="bg-background rounded-xl shadow p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4 text-destructive">Delete X509 Certificate Observable</h1>
        <p className="mb-6 text-center">
          Are you sure you want to delete the certificate <span className="font-semibold">{certificate.subject || certificate.id}</span>?
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
