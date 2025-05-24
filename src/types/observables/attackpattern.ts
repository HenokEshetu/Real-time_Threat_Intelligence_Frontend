export interface ExternalReference {
  id: string;
  source_name: string;
  description?: string;
  url?: string;
  external_id?: string;
}

export interface KillChainPhase {
  id: string;
  kill_chain_name: string;
  phase_name: string;
}

export interface RelationshipCommonProperties {
  id: string;
  type: string;
  spec_version: string;
  created: string;
  modified: string;
  relationship_type: string;
  source_ref: string;
  target_ref: string;
  confidence?: number;
  description?: string;
  external_references?: ExternalReference[];
  labels?: string[];
  revoked?: boolean;
  created_by_ref?: string;
  start_time?: string;
  stop_time?: string;
}

export interface Enrichment {
  // Define as needed, or use 'any' if unknown
  [key: string]: any;
}

export interface AttackPattern {
  id: string;
  type: string;
  spec_version: string;
  version?: string;
  name: string;
  description?: string;
  aliases?: string[];
  labels?: string[];
  confidence?: number;
  created: string;
  modified: string;
  created_by_ref?: string;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  kill_chain_phases?: KillChainPhase[];
  object_marking_refs?: string[];
  revoked?: boolean;
  lang?: string;
  relationship?: RelationshipCommonProperties[];
}

export interface AttackPatternSearchResult {
  page: number;
  pageSize: number;
  results: AttackPattern[];
  total: number;
  totalPages: number;
}
