import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseOfActionDetail, useUpdateCourseOfAction } from "@/hooks/useCourseOfAction";
import type { CourseOfAction } from "@/types/courseofaction";

const CourseOfActionEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courseOfAction, loading: loadingDetail } = useCourseOfActionDetail(id);
  const { updateCourseOfAction, loading } = useUpdateCourseOfAction();
  const [form, setForm] = useState<Partial<CourseOfAction>>({});
  const [labelInput, setLabelInput] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseOfAction) {
      setForm({ ...courseOfAction });
    }
  }, [courseOfAction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setForm((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddLabel = () => {
    if (labelInput && !form.labels?.includes(labelInput)) {
      setForm((prev) => ({
        ...prev,
        labels: [...(prev.labels || []), labelInput],
      }));
      setLabelInput("");
    }
  };

  const handleRemoveLabel = (label: string) => {
    setForm((prev) => ({
      ...prev,
      labels: (prev.labels || []).filter((l) => l !== label),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      setErrorMsg("Name is required");
      return;
    }
    setErrorMsg(null);
    try {
      await updateCourseOfAction({
        variables: { id, input: { ...form, id } },
      });
      navigate(`/courseofaction/${id}`);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update Course of Action");
    }
  };

  if (loadingDetail) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!form || !form.id) {
    return <div className="text-center mt-10 text-red-600">Course of Action not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Course of Action</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && <div className="text-red-600">{errorMsg}</div>}
        <div>
          <label className="block font-semibold mb-1">Name *</label>
          <input
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Course of Action Name"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
            placeholder="Description"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Action</label>
          <input
            name="action"
            value={form.action || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Action"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Action Type</label>
          <input
            name="action_type"
            value={form.action_type || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Action Type"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Action Reference</label>
          <input
            name="action_reference"
            value={form.action_reference || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Action Reference"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Action Bin</label>
          <input
            name="action_bin"
            value={form.action_bin || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Action Bin"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Confidence</label>
          <input
            name="confidence"
            type="number"
            min={0}
            max={100}
            value={form.confidence ?? 50}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Labels</label>
          <div className="flex gap-2 mb-2">
            <input
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              className="border rounded px-2 py-1 flex-1"
              placeholder="Add label"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddLabel())}
            />
            <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleAddLabel}>
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(form.labels || []).map((label) => (
              <span key={label} className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center">
                {label}
                <button type="button" className="ml-1 text-red-500" onClick={() => handleRemoveLabel(label)}>×</button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Revoked</label>
          <input
            name="revoked"
            type="checkbox"
            checked={!!form.revoked}
            onChange={handleChange}
            className="mr-2"
          />
          <span>{form.revoked ? "Yes" : "No"}</span>
        </div>
        <div>
          <label className="block font-semibold mb-1">Language</label>
          <input
            name="lang"
            value={form.lang || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Language"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded font-semibold"
            onClick={() => navigate(`/courseofaction/${id}`)}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseOfActionEditPage;
