import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@apollo/client";
import { GET_INDICATOR } from "@/graphql/indicator/queries";
import { UPDATE_INDICATOR } from "@/graphql/indicator/mutations";
import { Indicator, UpdateIndicatorInput } from "@/types/indicator";

export const IndicatorEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_INDICATOR, { variables: { id } });
  const [updateIndicator, { loading: updating, error: updateError }] = useMutation(UPDATE_INDICATOR);

  const [values, setValues] = useState<UpdateIndicatorInput>({
    name: "",
    pattern: "",
    pattern_type: "",
    valid_from: "",
    valid_until: "",
    indicator_types: [],
    labels: [],
    description: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (data?.indicator) {
      const ind: Indicator = data.indicator;
      setValues({
        name: ind.name || "",
        pattern: ind.pattern || "",
        pattern_type: ind.pattern_type || "",
        valid_from: ind.valid_from ? ind.valid_from.slice(0, 10) : "",
        valid_until: ind.valid_until ? ind.valid_until.slice(0, 10) : "",
        indicator_types: ind.indicator_types || [],
        labels: ind.labels || [],
        description: ind.description || "",
      });
    }
  }, [data]);

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = "This field is required";
    if (!values.pattern) newErrors.pattern = "This field is required";
    if (!values.pattern_type) newErrors.pattern_type = "This field is required";
    if (!values.valid_from) newErrors.valid_from = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await updateIndicator({
        variables: {
          input: {
            id,
            ...values,
            indicator_types: values.indicator_types?.filter(Boolean),
            labels: values.labels?.filter(Boolean),
          },
        },
      });
      navigate(-1);
    } catch (e) {}
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }
  if (error || !data?.indicator) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        Failed to load indicator.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="w-full bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <span className="sr-only">Close</span>
          <svg width="20" height="20" fill="none" stroke="currentColor"><path d="M15 5L5 15M5 5l10 10" strokeWidth="2" strokeLinecap="round" /></svg>
        </Button>
        <h1 className="text-lg font-semibold">Edit Indicator</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto mt-8 bg-background rounded-xl shadow p-6 space-y-6">
        {/* Name */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.name ? "border-destructive" : "border-input"} bg-background`}>
            <Input
              id="name"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Indicator name"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="name"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.name ? "text-destructive" : "text-muted-foreground"}`}
          >
            Name <span className="text-destructive">*</span>
          </Label>
          {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
        </div>
        {/* Pattern */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.pattern ? "border-destructive" : "border-input"} bg-background`}>
            <Input
              id="pattern"
              value={values.pattern}
              onChange={(e) => handleChange("pattern", e.target.value)}
              placeholder="Pattern"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="pattern"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.pattern ? "text-destructive" : "text-muted-foreground"}`}
          >
            Pattern <span className="text-destructive">*</span>
          </Label>
          {errors.pattern && <div className="text-destructive text-xs mt-1">{errors.pattern}</div>}
        </div>
        {/* Pattern Type */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.pattern_type ? "border-destructive" : "border-input"} bg-background`}>
            <Input
              id="pattern_type"
              value={values.pattern_type}
              onChange={(e) => handleChange("pattern_type", e.target.value)}
              placeholder="Pattern Type"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="pattern_type"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.pattern_type ? "text-destructive" : "text-muted-foreground"}`}
          >
            Pattern Type <span className="text-destructive">*</span>
          </Label>
          {errors.pattern_type && <div className="text-destructive text-xs mt-1">{errors.pattern_type}</div>}
        </div>
        {/* Valid From */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.valid_from ? "border-destructive" : "border-input"} bg-background`}>
            <Input
              id="valid_from"
              type="date"
              value={values.valid_from}
              onChange={(e) => handleChange("valid_from", e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="valid_from"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.valid_from ? "text-destructive" : "text-muted-foreground"}`}
          >
            Valid From <span className="text-destructive">*</span>
          </Label>
          {errors.valid_from && <div className="text-destructive text-xs mt-1">{errors.valid_from}</div>}
        </div>
        {/* Valid Until */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="valid_until"
              type="date"
              value={values.valid_until}
              onChange={(e) => handleChange("valid_until", e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="valid_until"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Valid Until
          </Label>
        </div>
        {/* Indicator Types */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="indicator_types"
              value={values.indicator_types?.join(", ")}
              onChange={e => handleChange("indicator_types", e.target.value.split(",").map(s => s.trim()))}
              placeholder="Comma separated types"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="indicator_types"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Indicator Types
          </Label>
        </div>
        {/* Labels */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="labels"
              value={values.labels?.join(", ")}
              onChange={e => handleChange("labels", e.target.value.split(",").map(s => s.trim()))}
              placeholder="Comma separated labels"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="labels"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Labels
          </Label>
        </div>
        {/* Description */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <textarea
              id="description"
              value={values.description}
              onChange={e => handleChange("description", e.target.value)}
              placeholder="Write a description..."
              rows={4}
              className="w-full bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none resize-none"
            />
          </div>
          <Label
            htmlFor="description"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Description
          </Label>
        </div>
        {/* Submit */}
        <div className="pt-2">
          <Button type="submit" variant="default" className="w-full" disabled={updating}>
            {updating ? "Updating..." : "Update"}
          </Button>
          {updateError && <div className="text-destructive text-xs mt-2">Failed to update indicator.</div>}
        </div>
      </form>
    </div>
  );
};
