// src/types/artifact.ts
export interface Hashes {
  MD5?: string;
  SHA_1?: string;
  SHA_256?: string;
  SHA_512?: string;
}

export interface Enrichment {
  abuseipdb?: any;
  asn?: any;
  dns?: any;
  geo?: any;
  hybrid?: any;
  misp?: any;
  shodan?: any;
  ssl?: any;
  threatcrowd?: any;
  threatfox?: any;
  virustotal?: any;
  whois?: any;
}

export interface ExternalReference {
  description?: string;
  external_id?: string;
  id: string;
  source_name: string;
  url?: string;
  hashes?: Hashes[];
}

export interface Artifact {
  id: string;
  type: string;
  spec_version: string;
  created: string;
  modified: string;
  mime_type?: string;
  url?: string;
  confidence?: number;
  labels: string[];
  payload_bin?: string;
  hashes?: Hashes;
  created_by_ref?: string;
  revoked?: boolean;
  enrichment?: Enrichment;
  external_references?: ExternalReference[];
  extensions?: Record<string, unknown>;
  lang?: string;
  decryption_key?: string;
  encryption_algorithm?: number;
  object_marking_refs?: string[];
  defanged?: boolean;
}

export interface CreateArtifactInput {
  id: string;
  type: string;
  spec_version: string;
  created: string;
  modified: string;
  mime_type?: string;
  url?: string;
  confidence?: number;
  labels: string[];
  payload_bin?: string;
  hashes?: Hashes;
  created_by_ref?: string;
  revoked?: boolean;
  enrichment?: Enrichment;
  external_references?: ExternalReference[];
  extensions?: Record<string, unknown>;
  lang?: string;
  decryption_key?: string;
  encryption_algorithm?: number;
  object_marking_refs?: string[];
  defanged?: boolean;
}

export interface UpdateArtifactInput extends CreateArtifactInput {}
