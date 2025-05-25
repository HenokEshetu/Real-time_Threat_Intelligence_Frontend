import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNote, useUpdateNote } from "@/hooks/useNotes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const NotesEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { note, loading, error } = useNote(id || "");
  const [updateNote, { loading: updating, error: updateError }] = useUpdateNote();

  const [values, setValues] = useState({
    abstract: "",
    content: "",
    authors: "",
    confidence: 100,
    content_type: "",
    lang: "",
    labels: "",
    object_refs: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (note) {
      setValues({
        abstract: note.abstract || "",
        content: note.content || "",
        authors: note.authors ? note.authors.join(", ") : "",
        confidence: typeof note.confidence === "number" ? note.confidence : 100,
        content_type: note.content_type || "",
        lang: note.lang || "",
        labels: note.labels ? note.labels.join(", ") : "",
        object_refs: note.object_refs ? note.object_refs.join(", ") : "",
      });
    }
  }, [note]);

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.abstract || !values.content || !id) {
      setFormError("Abstract and Content are required.");
      return;
    }
    try {
      await updateNote({
        variables: {
          id,
          input: {
            ...values,
            authors: values.authors ? values.authors.split(",").map((s) => s.trim()) : [],
            labels: values.labels ? values.labels.split(",").map((s) => s.trim()) : [],
            object_refs: values.object_refs ? values.object_refs.split(",").map((s) => s.trim()) : [],
            modified: new Date().toISOString(),
          }
        }
      });
      navigate("/notes");
    } catch (err: any) {
      setFormError(err.message || "Failed to update note.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error || !note) return <div>Failed to load note.</div>;

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="w-full bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <span className="sr-only">Close</span>
          <svg width="20" height="20" fill="none" stroke="currentColor"><path d="M15 5L5 15M5 5l10 10" strokeWidth="2" strokeLinecap="round" /></svg>
        </Button>
        <h1 className="text-lg font-semibold">Edit Note</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto mt-8 bg-background rounded-xl shadow p-6 space-y-6">
        <div>
          <Label htmlFor="abstract">Abstract *</Label>
          <Input id="abstract" value={values.abstract} onChange={e => handleChange("abstract", e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="content">Content *</Label>
          <textarea id="content" value={values.content} onChange={e => handleChange("content", e.target.value)} rows={3} className="w-full border rounded" required />
        </div>
        <div>
          <Label htmlFor="authors">Authors (comma separated)</Label>
          <Input id="authors" value={values.authors} onChange={e => handleChange("authors", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="labels">Labels (comma separated)</Label>
          <Input id="labels" value={values.labels} onChange={e => handleChange("labels", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="object_refs">Object Refs (comma separated)</Label>
          <Input id="object_refs" value={values.object_refs} onChange={e => handleChange("object_refs", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="confidence">Confidence</Label>
          <Input id="confidence" type="number" min={0} max={100} value={values.confidence} onChange={e => handleChange("confidence", Number(e.target.value))} />
        </div>
        <div>
          <Label htmlFor="content_type">Content Type</Label>
          <Input id="content_type" value={values.content_type} onChange={e => handleChange("content_type", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="lang">Language</Label>
          <Input id="lang" value={values.lang} onChange={e => handleChange("lang", e.target.value)} />
        </div>
        {/* Add more fields as needed */}
        <div>
          <Button type="submit" disabled={updating}>Update</Button>
        </div>
        {formError && <div className="text-red-600">{formError}</div>}
        {updateError && <div className="text-red-600">{updateError.message}</div>}
      </form>
    </div>
  );
};

export default NotesEditPage;
