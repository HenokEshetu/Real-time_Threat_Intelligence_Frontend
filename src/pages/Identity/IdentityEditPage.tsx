import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useIdentityDetail, useUpdateIdentity } from "@/hooks/useIdentity";
import { IdentityClass, IndustrySector } from "@/types/identity";

export const IdentityEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { identity, loading: loadingDetail } = useIdentityDetail(id);
  const { updateIdentity, loading, error } = useUpdateIdentity();
  const navigate = useNavigate();

  const [form, setForm] = useState<any>(null);
  const [labelInput, setLabelInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [sectorInput, setSectorInput] = useState<IndustrySector | "">("");

  useEffect(() => {
    if (identity) {
      setForm({
        ...identity,
        sectors: identity.sectors ?? [],
        roles: identity.roles ?? [],
        labels: identity.labels ?? [],
      });
    }
  }, [identity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev: any) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setForm((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddLabel = () => {
    if (labelInput && !form.labels.includes(labelInput)) {
      setForm((prev: any) => ({ ...prev, labels: [...prev.labels, labelInput] }));
      setLabelInput("");
    }
  };

  const handleAddRole = () => {
    if (roleInput && !form.roles.includes(roleInput)) {
      setForm((prev: any) => ({ ...prev, roles: [...prev.roles, roleInput] }));
      setRoleInput("");
    }
  };

  const handleAddSector = () => {
    if (sectorInput && !form.sectors.includes(sectorInput as IndustrySector)) {
      setForm((prev: any) => ({
        ...prev,
        sectors: [...prev.sectors, sectorInput as IndustrySector],
      }));
      setSectorInput("");
    }
  };

  const handleRemove = (field: "labels" | "roles" | "sectors", value: string) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((v: string) => v !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = {
      ...form,
      modified: new Date().toISOString(),
    };
    try {
      await updateIdentity({ variables: { id, input } });
      navigate(`/identity/${id}`);
    } catch (e) {
      // error handled below
    }
  };

  if (loadingDetail || !form) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Identity</h1>
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
            {form.sectors.map((sector: string) => (
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
            {form.roles.map((role: string) => (
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
            {form.labels.map((label: string) => (
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
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded font-semibold"
            onClick={() => navigate(`/identity/${id}`)}
          >
            Cancel
          </button>
        </div>
        {error && <div className="text-red-500 mt-2">{error.message}</div>}
      </form>
    </div>
  );
};

export default IdentityEditPage;
