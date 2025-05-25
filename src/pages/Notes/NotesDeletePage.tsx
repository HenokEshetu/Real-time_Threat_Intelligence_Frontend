import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNote, useDeleteNote } from "@/hooks/useNotes";
import { Button } from "@/components/ui/button";

const NotesDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { note, loading, error } = useNote(id || "");
  const [deleteNote, { loading: deleting, error: deleteError }] = useDeleteNote();

  const handleDelete = async () => {
    if (!id) return;
    await deleteNote({ variables: { id } });
    navigate("/notes");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-destructive">{error.message}</div>;
  if (!note) return <div className="min-h-screen flex items-center justify-center text-destructive">Note not found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow border max-w-md w-full">
        <h1 className="text-xl font-bold mb-4 text-destructive">Delete Note</h1>
        <p className="mb-6">
          Are you sure you want to delete the note <span className="font-semibold">{note.abstract}</span>?
          <br />
          This action cannot be undone.
        </p>
        <div className="flex gap-4">
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)} disabled={deleting}>Cancel</Button>
        </div>
        {deleteError && <div className="text-red-600 mt-4">{deleteError.message}</div>}
      </div>
    </div>
  );
};

export default NotesDeletePage;
