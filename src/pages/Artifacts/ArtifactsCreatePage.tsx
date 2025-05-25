import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateArtifact } from "@/hooks/useArtifacts";
import type { CreateArtifactInput } from "@/types/artifact";

export const ArtifactsCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { createArtifact, loading, error } = useCreateArtifact();
  const [form, setForm] = useState<CreateArtifactInput>({
    id: "",
    type: "artifact",
    spec_version: "2.1",
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
    labels: [],
  });
  const [labelInput, setLabelInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddLabel = () => {
    if (labelInput && !form.labels.includes(labelInput)) {
      setForm({ ...form, labels: [...form.labels, labelInput] });
      setLabelInput("");
    }
  };

  const handleRemoveLabel = (label: string) => {
    setForm({ ...form, labels: form.labels.filter(l => l !== label) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createArtifact({ variables: { input: form } });
      navigate("/artifacts");
    } catch (err) {
      // error handled below
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create Artifact</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">ID</label>
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
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
          {loading ? "Creating..." : "Create Artifact"}
        </button>
        {error && <div className="text-red-500 mt-2">{error.message}</div>}
      </form>
    </div>
  );
};

export default ArtifactsCreatePage;
