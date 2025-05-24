import React, { useState } from "react";
import { useCreateIdentity } from "@/hooks/useIdentity";
import { IdentityClass, IndustrySector } from "@/types/identity";
import { useNavigate } from "react-router-dom";

export const IdentityCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { createIdentity, loading, error } = useCreateIdentity();
  const [form, setForm] = useState({
    name: "",
    description: "",
    identity_class: IdentityClass.ORGANIZATION,
    sectors: [] as IndustrySector[],
    contact_information: "",
    roles: [] as string[],
    labels: [] as string[],
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
    created_by_ref: "",
    external_references: [],
    object_marking_refs: [],
    revoked: false,
    lang: "",
    confidence: 50,
    enrichment: null,
    extensions: null,
    spec_version: "2.1",
    type: "identity",
    id: "",
    relationship: [],
  });

  const [labelInput, setLabelInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [sectorInput, setSectorInput] = useState<IndustrySector | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddLabel = () => {
    if (labelInput && !form.labels.includes(labelInput)) {
      setForm((prev) => ({ ...prev, labels: [...prev.labels, labelInput] }));
      setLabelInput("");
    }
  };

  const handleAddRole = () => {
    if (roleInput && !form.roles.includes(roleInput)) {
      setForm((prev) => ({ ...prev, roles: [...prev.roles, roleInput] }));
      setRoleInput("");
    }
  };

  const handleAddSector = () => {
    if (sectorInput && !form.sectors.includes(sectorInput as IndustrySector)) {
      setForm((prev) => ({
        ...prev,
        sectors: [...prev.sectors, sectorInput as IndustrySector],
      }));
      setSectorInput("");
    }
  };

  const handleRemove = (field: "labels" | "roles" | "sectors", value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((v: string) => v !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = {
      ...form,
      id: crypto.randomUUID(),
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    };
    try {
      await createIdentity({ variables: { input } });
      navigate("/identity");
    } catch (e) {
      // error handled below
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create Identity</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Identity Class *</label>
          <select
            name="identity_class"
            value={form.identity_class}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {Object.values(IdentityClass).map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Sectors</label>
          <div className="flex gap-2">
            <select
              value={sectorInput}
              onChange={e => setSectorInput(e.target.value as IndustrySector)}
              className="border rounded px-2 py-1"
            >
              <option value="">Select sector</option>
              {Object.values(IndustrySector).map((sector) => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
            <button type="button" onClick={handleAddSector} className="px-2 py-1 bg-blue-500 text-white rounded">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.sectors.map((sector) => (
              <span key={sector} className="bg-green-100 text-green-800 px-2 py-1 rounded">
                {sector}
                <button type="button" className="ml-1 text-red-500" onClick={() => handleRemove("sectors", sector)}>×</button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Contact Information</label>
          <input
            name="contact_information"
            value={form.contact_information}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Roles</label>
          <div className="flex gap-2">
            <input
              value={roleInput}
              onChange={e => setRoleInput(e.target.value)}
              className="border rounded px-2 py-1"
              placeholder="Add role"
            />
            <button type="button" onClick={handleAddRole} className="px-2 py-1 bg-blue-500 text-white rounded">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.roles.map((role) => (
              <span key={role} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {role}
                <button type="button" className="ml-1 text-red-500" onClick={() => handleRemove("roles", role)}>×</button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Labels</label>
          <div className="flex gap-2">
            <input
              value={labelInput}
              onChange={e => setLabelInput(e.target.value)}
              className="border rounded px-2 py-1"
              placeholder="Add label"
            />
            <button type="button" onClick={handleAddLabel} className="px-2 py-1 bg-blue-500 text-white rounded">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.labels.map((label) => (
              <span key={label} className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                {label}
                <button type="button" className="ml-1 text-red-500" onClick={() => handleRemove("labels", label)}>×</button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Confidence</label>
          <input
            type="number"
            name="confidence"
            value={form.confidence}
            min={0}
            max={100}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold"
          >
            {loading ? "Creating..." : "Create"}
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded font-semibold"
            onClick={() => navigate("/identity")}
          >
            Cancel
          </button>
        </div>
        {error && <div className="text-red-500 mt-2">{error.message}</div>}
      </form>
    </div>
  );
};

export default IdentityCreatePage;
