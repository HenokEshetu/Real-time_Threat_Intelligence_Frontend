import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateNote } from "@/hooks/useNotes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const NotesCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [createNote, { loading, error }] = useCreateNote();
  const [values, setValues] = useState({
    abstract: "",
    content: "",
    authors: "",
    confidence: 100,
    content_type: "",
    lang: "",
    labels: "",
    object_refs: "",
    spec_version: "2.1",
    type: "note",
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
    id: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.abstract || !values.content) {
      setFormError("Abstract and Content are required.");
      return;
    }
    try {
      await createNote({
        variables: {
          input: {
            ...values,
            id: undefined,
            authors: values.authors ? values.authors.split(",").map((s) => s.trim()) : [],
            labels: values.labels ? values.labels.split(",").map((s) => s.trim()) : [],
            object_refs: values.object_refs ? values.object_refs.split(",").map((s) => s.trim()) : [],
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
          }
        }
      });
      navigate("/notes");
    } catch (err: any) {
      setFormError(err.message || "Failed to create note.");
    }
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="w-full bg-background border-b px-4 py-3 flex items-center">
        <h1 className="text-lg font-semibold">Create Note</h1>
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
          <Button type="submit" disabled={loading}>Create</Button>
        </div>
        {formError && <div className="text-red-600">{formError}</div>}
        {error && <div className="text-red-600">{error.message}</div>}
      </form>
    </div>
  );
};

export default NotesCreatePage;
