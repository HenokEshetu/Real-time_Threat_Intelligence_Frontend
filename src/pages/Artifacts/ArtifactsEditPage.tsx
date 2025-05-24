import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useArtifact, useUpdateArtifact } from "@/hooks/useArtifacts";
import type { UpdateArtifactInput } from "@/types/artifact";

export const ArtifactsEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artifact, loading: loadingArtifact } = useArtifact(id || "");
  const { updateArtifact, loading, error } = useUpdateArtifact();
  const [form, setForm] = useState<UpdateArtifactInput | null>(null);
  const [labelInput, setLabelInput] = useState("");

  useEffect(() => {
    if (artifact) {
      setForm({ ...artifact });
    }
  }, [artifact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddLabel = () => {
    if (!form) return;
    if (labelInput && !form.labels.includes(labelInput)) {
      setForm({ ...form, labels: [...form.labels, labelInput] });
      setLabelInput("");
    }
  };

  const handleRemoveLabel = (label: string) => {
    if (!form) return;
    setForm({ ...form, labels: form.labels.filter(l => l !== label) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !id) return;
    try {
      await updateArtifact({ variables: { id, input: form } });
      navigate(`/artifacts/${id}`);
    } catch (err) {
      // error handled below
    }
  };

  if (loadingArtifact || !form)
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-gray-400">Loading artifact...</span>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Artifact</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">ID</label>
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
            disabled
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">URL</label>
          <input
            name="url"
            value={form.url || ""}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">MIME Type</label>
          <input
            name="mime_type"
            value={form.mime_type || ""}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Labels</label>
          <div className="flex gap-2 mb-2">
            <input
              value={labelInput}
              onChange={e => setLabelInput(e.target.value)}
              className="border rounded px-2 py-1 flex-1"
              placeholder="Add label"
            />
            <button type="button" onClick={handleAddLabel} className="btn btn-secondary">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.labels.map(label => (
              <span
                key={label}
                className="bg-blue-100 text-blue-800 border border-blue-400 rounded px-2 py-1 text-xs flex items-center"
              >
                {label}
                <button
                  type="button"
                  className="ml-1 text-red-500"
                  onClick={() => handleRemoveLabel(label)}
                  aria-label="Remove label"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Confidence</label>
          <input
            name="confidence"
            type="number"
            value={form.confidence ?? ""}
            onChange={e => setForm({ ...form, confidence: e.target.value ? Number(e.target.value) : undefined })}
            className="border rounded px-3 py-2 w-full"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        {error && <div className="text-red-500 mt-2">{error.message}</div>}
      </form>
    </div>
  );
};

export default ArtifactsEditPage;
