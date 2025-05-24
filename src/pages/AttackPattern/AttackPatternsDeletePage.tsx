import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAttackPatternDetail, useDeleteAttackPattern } from '@/hooks/observables/useAttackPattern';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';

export const AttackPatternsDeletePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { attackPattern, loading, error } = useAttackPatternDetail(id);
  const { deleteAttackPattern, loading: deleting, error: deleteError } = useDeleteAttackPattern();

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteAttackPattern({ variables: { id } });
      navigate('/attack-patterns');
    } catch {}
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!attackPattern) return <ErrorMessage message="Attack Pattern not found" />;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Delete Attack Pattern</h1>
      <p>Are you sure you want to delete <strong>{attackPattern.name}</strong>?</p>
      <div className="flex gap-4 mt-6">
        <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
          Delete
        </Button>
        <Button variant="outline" onClick={() => navigate(`/attack-patterns/${id}`)}>
          Cancel
        </Button>
      </div>
      {deleting && <Loading />}
      {deleteError && <ErrorMessage message={deleteError.message} />}
    </div>
  );
};
