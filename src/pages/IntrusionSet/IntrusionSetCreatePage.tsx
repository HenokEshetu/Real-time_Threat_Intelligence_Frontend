import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateIntrusionSet } from "@/hooks/useintrusionSet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const IntrusionSetCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { createIntrusionSet, loading, error } = useCreateIntrusionSet();
  const [values, setValues] = useState({
    name: "",
    description: "",
    aliases: "",
    labels: "",
    confidence: 50,
    primary_motivation: "",
    resource_level: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createIntrusionSet({
        variables: {
          input: {
            name: values.name,
            description: values.description,
            aliases: values.aliases.split(",").map((s) => s.trim()).filter(Boolean),
            labels: values.labels.split(",").map((s) => s.trim()).filter(Boolean),
            confidence: Number(values.confidence),
            primary_motivation: values.primary_motivation,
            resource_level: values.resource_level,
          },
        },
      });
      navigate("/intrusionset");
    } catch (e) {
      // error handled by hook
    }
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="w-full bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <span className="sr-only">Close</span>
          <svg width="20" height="20" fill="none" stroke="currentColor"><path d="M15 5L5 15M5 5l10 10" strokeWidth="2" strokeLinecap="round" /></svg>
        </Button>
        <h1 className="text-lg font-semibold">Create Intrusion Set</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto mt-8 bg-background rounded-xl shadow p-6 space-y-6">
        {/* Name */}
        <div>
          <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
          <Input id="name" value={values.name} onChange={e => handleChange("name", e.target.value)} />
          {errors.name && <div className="text-destructive text-xs">{errors.name}</div>}
        </div>
        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <textarea id="description" value={values.description} onChange={e => handleChange("description", e.target.value)} className="w-full border rounded p-2" />
        </div>
        {/* Aliases */}
        <div>
          <Label htmlFor="aliases">Aliases (comma separated)</Label>
          <Input id="aliases" value={values.aliases} onChange={e => handleChange("aliases", e.target.value)} />
        </div>
        {/* Labels */}
        <div>
          <Label htmlFor="labels">Labels (comma separated)</Label>
          <Input id="labels" value={values.labels} onChange={e => handleChange("labels", e.target.value)} />
        </div>
        {/* Confidence */}
        <div>
          <Label htmlFor="confidence">Confidence</Label>
          <Input id="confidence" type="number" min={0} max={100} value={values.confidence} onChange={e => handleChange("confidence", e.target.value)} />
        </div>
        {/* Primary Motivation */}
        <div>
          <Label htmlFor="primary_motivation">Primary Motivation</Label>
          <Input id="primary_motivation" value={values.primary_motivation} onChange={e => handleChange("primary_motivation", e.target.value)} />
        </div>
        {/* Resource Level */}
        <div>
          <Label htmlFor="resource_level">Resource Level</Label>
          <Input id="resource_level" value={values.resource_level} onChange={e => handleChange("resource_level", e.target.value)} />
        </div>
        {/* Submit */}
        <div>
          <Button type="submit" variant="default" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
          {error && <div className="text-destructive text-xs mt-2">{error.message}</div>}
        </div>
      </form>
    </div>
  );
};

export default IntrusionSetCreatePage;
