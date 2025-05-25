import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useCreateObservedData } from "@/hooks/useObservedData";

const MARKING_LABELS = [
  "TLP:CLEAR",
  "TLP:GREEN",
  "TLP:AMBER+STRICT",
  "TLP:AMBER",
  "TLP:RED",
];

export const ObservedDataCreatePage = () => {
  const navigate = useNavigate();
  const [createObservedData, { loading }] = useCreateObservedData();
  const [values, setValues] = useState({
    type: "observed-data",
    first_observed: "",
    last_observed: "",
    number_observed: 1,
    labels: "",
    confidence: 100,
    lang: "",
    created_by_ref: "",
    object_refs: "",
    object_marking_refs: "",
    revoked: false,
    spec_version: "2.1",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setFormError(null);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.first_observed) newErrors.first_observed = "This field is required";
    if (!values.last_observed) newErrors.last_observed = "This field is required";
    if (!values.number_observed || isNaN(Number(values.number_observed))) newErrors.number_observed = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createObservedData({
        variables: {
          input: {
            ...values,
            labels: values.labels ? values.labels.split(",").map((s) => s.trim()) : [],
            object_refs: values.object_refs ? values.object_refs.split(",").map((s) => s.trim()) : [],
            object_marking_refs: values.object_marking_refs ? [values.object_marking_refs] : [],
            number_observed: Number(values.number_observed),
          },
        },
      });
      navigate("/observeddata");
    } catch (err: any) {
      setFormError(err.message || "Failed to create observed data.");
    }
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="w-full bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <span className="sr-only">Close</span>
          <svg width="20" height="20" fill="none" stroke="currentColor"><path d="M15 5L5 15M5 5l10 10" strokeWidth="2" strokeLinecap="round" /></svg>
        </Button>
        <h1 className="text-lg font-semibold">Create Observed Data</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto mt-8 bg-background rounded-xl shadow p-6 space-y-6">
        <div>
          <Label htmlFor="first_observed">First Observed *</Label>
          <Input
            id="first_observed"
            type="datetime-local"
            value={values.first_observed}
            onChange={e => handleChange("first_observed", e.target.value)}
            required
          />
          {errors.first_observed && <div className="text-destructive text-xs mt-1">{errors.first_observed}</div>}
        </div>
        <div>
          <Label htmlFor="last_observed">Last Observed *</Label>
          <Input
            id="last_observed"
            type="datetime-local"
            value={values.last_observed}
            onChange={e => handleChange("last_observed", e.target.value)}
            required
          />
          {errors.last_observed && <div className="text-destructive text-xs mt-1">{errors.last_observed}</div>}
        </div>
        <div>
          <Label htmlFor="number_observed">Number Observed *</Label>
          <Input
            id="number_observed"
            type="number"
            min={1}
            value={values.number_observed}
            onChange={e => handleChange("number_observed", e.target.value)}
            required
          />
          {errors.number_observed && <div className="text-destructive text-xs mt-1">{errors.number_observed}</div>}
        </div>
        <div>
          <Label htmlFor="labels">Labels (comma separated)</Label>
          <Input id="labels" value={values.labels} onChange={e => handleChange("labels", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="confidence">Confidence</Label>
          <Input id="confidence" type="number" min={0} max={100} value={values.confidence} onChange={e => handleChange("confidence", Number(e.target.value))} />
        </div>
        <div>
          <Label htmlFor="lang">Language</Label>
          <Input id="lang" value={values.lang} onChange={e => handleChange("lang", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="created_by_ref">Created By</Label>
          <Input id="created_by_ref" value={values.created_by_ref} onChange={e => handleChange("created_by_ref", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="object_refs">Object Refs (comma separated)</Label>
          <Input id="object_refs" value={values.object_refs} onChange={e => handleChange("object_refs", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="object_marking_refs">Marking</Label>
          <select
            id="object_marking_refs"
            value={values.object_marking_refs}
            onChange={e => handleChange("object_marking_refs", e.target.value)}
            className="w-full border rounded"
          >
            <option value="">Select marking</option>
            {MARKING_LABELS.map(label => (
              <option key={label} value={label}>{label}</option>
            ))}
          </select>
          {values.object_marking_refs && (
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="secondary">{values.object_marking_refs}</Badge>
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="revoked">Revoked</Label>
          <input id="revoked" type="checkbox" checked={values.revoked} onChange={e => handleChange("revoked", e.target.checked)} />
        </div>
        <div>
          <Button type="submit" disabled={loading}>Create</Button>
        </div>
        {formError && <div className="text-red-600">{formError}</div>}
      </form>
    </div>
  );
};
export default ObservedDataCreatePage;
