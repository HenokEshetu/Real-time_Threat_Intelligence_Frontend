import React from "react";
import { useParams } from "react-router-dom";
import { useNote } from "@/hooks/useNotes";
import NoteDetail from "@/components/common/Notes/NoteDetail";

const NotesDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { note, loading, error } = useNote(id || "");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }
  if (error || !note) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-red-500">Failed to load note.</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="h-13 top-29 px-4 py-2">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          Note: {note.id}
        </h1>
      </div>
      <NoteDetail note={note} />
    </div>
  );
};

export default NotesDetailPage;
