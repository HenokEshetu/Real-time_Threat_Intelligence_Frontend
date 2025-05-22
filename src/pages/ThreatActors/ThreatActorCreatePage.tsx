import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useCreateThreatActor } from "@/hooks/useThreatActors";
import { Sparkles, XIcon } from "lucide-react";
import { ThreatActorType } from "@/types/threatactor";

const THREAT_ACTOR_TYPE_OPTIONS: ThreatActorType[] = [
  "ACTIVIST", "COMPETITOR", "CRIME_SYNDICATE", "CRIMINAL", "HACKER",
  "INSIDER_ACCIDENTAL", "INSIDER_DISGRUNTLED", "NATION_STATE", "SENSATIONALIST",
  "SPY", "TERRORIST", "UNKNOWN"
];

export const ThreatActorCreatePage = () => {
  const navigate = useNavigate();
  const { createThreatActor, loading, error } = useCreateThreatActor();

  const [values, setValues] = useState({
    name: "",
    description: "",
    aliases: [] as string[],
    first_seen: "",
    last_seen: "",
    threat_actor_types: [] as ThreatActorType[],
    goals: [] as string[],
    roles: [] as string[],
    sophistication: "",
    resource_level: "",
    primary_motivation: "",
    secondary_motivations: [] as string[],
    personal_motivations: "",
    labels: [] as string[],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = "This field is required";
    if (values.threat_actor_types.length === 0) newErrors.threat_actor_types = "Select at least one type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createThreatActor({
        variables: {
          input: {
            name: values.name,
            description: values.description,
            aliases: values.aliases,
            first_seen: values.first_seen || null,
            last_seen: values.last_seen || null,
            threat_actor_types: values.threat_actor_types,
            goals: values.goals,
            roles: values.roles,
            sophistication: values.sophistication,
            resource_level: values.resource_level,
            primary_motivation: values.primary_motivation,
            secondary_motivations: values.secondary_motivations,
            personal_motivations: values.personal_motivations,
            labels: values.labels,
          },
        },
      });
      navigate(-1);
    } catch {
      // error handled below
    }
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="w-full bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <span className="sr-only">Close</span>
          <XIcon className="size-5" />
        </Button>
        <h1 className="text-lg font-semibold">Create a threat actor</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-6xl w-full mx-auto mt-8 bg-background rounded-xl shadow p-6 space-y-6">
        {/* Name */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.name ? "border-destructive" : "border-input"} bg-background`}>
            <Input
              id="name"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Threat actor name"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="name"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium flex items-center gap-1 ${errors.name ? "text-destructive" : "text-muted-foreground"}`}
          >
            <Sparkles className="text-indigo-500 size-4" />
            Name <span className="text-destructive">*</span>
          </Label>
          {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
        </div>

        {/* Description */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <textarea
              id="description"
              value={values.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Write a description in markdown..."
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

        {/* Aliases */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="aliases"
              value={values.aliases.join(", ")}
              onChange={(e) =>
                handleChange(
                  "aliases",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              placeholder="Comma separated aliases"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
            {values.aliases.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {values.aliases.map((alias: string) => (
                  <Badge key={alias} variant="secondary">{alias}</Badge>
                ))}
              </div>
            )}
          </div>
          <Label
            htmlFor="aliases"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Aliases
          </Label>
        </div>

        {/* Threat Actor Types */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.threat_actor_types ? "border-destructive" : "border-input"} bg-background`}>
            <div className="flex flex-wrap gap-2">
              {THREAT_ACTOR_TYPE_OPTIONS.map((type) => (
                <label key={type} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={values.threat_actor_types.includes(type)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      handleChange(
                        "threat_actor_types",
                        checked
                          ? [...values.threat_actor_types, type]
                          : values.threat_actor_types.filter((t) => t !== type)
                      );
                    }}
                  />
                  <span className="text-xs">{type}</span>
                </label>
              ))}
            </div>
          </div>
          <Label
            htmlFor="threat_actor_types"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.threat_actor_types ? "text-destructive" : "text-muted-foreground"}`}
          >
            Threat Actor Types <span className="text-destructive">*</span>
          </Label>
          {errors.threat_actor_types && <div className="text-destructive text-xs mt-1">{errors.threat_actor_types}</div>}
        </div>

        {/* First Seen */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="first_seen"
              type="date"
              value={values.first_seen}
              onChange={(e) => handleChange("first_seen", e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="first_seen"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            First Seen
          </Label>
        </div>

        {/* Last Seen */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="last_seen"
              type="date"
              value={values.last_seen}
              onChange={(e) => handleChange("last_seen", e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="last_seen"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Last Seen
          </Label>
        </div>

        {/* Labels */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="labels"
              value={values.labels.join(", ")}
              onChange={(e) =>
                handleChange(
                  "labels",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              placeholder="Comma separated labels"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
            {values.labels.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {values.labels.map((label: string) => (
                  <Badge key={label} variant="secondary">{label}</Badge>
                ))}
              </div>
            )}
          </div>
          <Label
            htmlFor="labels"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Labels
          </Label>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button type="submit" variant="default" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
          {error && (
            <div className="text-destructive text-xs mt-2">
              Failed to create threat actor.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ThreatActorCreatePage;
