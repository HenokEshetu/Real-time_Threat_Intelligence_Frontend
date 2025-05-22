import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNote, useDeleteNote } from '@/hooks/useNotes';
import { Button } from '@/components/ui/button';

const NotesDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { note, loading, error } = useNote(id || '');
  const [deleteNote, { loading: deleting, error: deleteError }] = useDeleteNote();

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteNote({ variables: { id } });
      navigate('/notes');
    } catch {}
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-destructive">{error.message}</div>;
  if (!note) return <div className="min-h-screen flex items-center justify-center text-destructive">Note not found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="bg-background rounded-xl shadow p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4 text-destructive">Delete Note</h1>
        <p className="mb-6 text-center">
          Are you sure you want to delete the note <span className="font-semibold">{note.abstract}</span>?
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

export default NotesDeletePage;
