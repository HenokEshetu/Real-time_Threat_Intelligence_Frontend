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
  payload_bin?: string;
  hashes?: {
    MD5?: string;
    'SHA-1'?: string;
    'SHA-256'?: string;
    'SHA-512'?: string;
  };
  created_by_ref?: string;
  revoked?: boolean;
  enrichment?: Record<string, unknown>;
  external_references?: unknown[];
  extensions?: Record<string, unknown>;
  lang?: string;
  decryption_key?: string | null;
  encryption_algorithm?: string | null;
  object_marking_refs?: string[];
}

export interface CreateArtifactInput {
  name: string;
  mime_type: string;
  description: string;
  labels: string[];
}

export interface UpdateArtifactInput {
  name?: string;
  mime_type?: string;
  description?: string;
  labels?: string[];
}
