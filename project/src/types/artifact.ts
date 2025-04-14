// src/types/artifact.ts
export interface Artifact {
  id: string;
  type: string;
  spec_version: string;
  created: string;
  modified: string;
  mime_type: string;
  url?: string;
  confidence: number;
  labels: string[];
  name?: string;
  description?: string;
  payload_bin?: string;
}
