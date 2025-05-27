export type Enrichment = any;
export type JSONObject = Record<string, any>;

export interface ExternalReference {
  id?: string;
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
  enrichment?: Enrichment;
  labels?: string[];
  revoked?: boolean;
  created_by_ref?: string;
  start_time?: string;
  stop_time?: string;
  lang?: string;
  extensions?: JSONObject;
  object_marking_refs?: string[];
}

export interface IntrusionSet {
  id: string;
  type: string;
  spec_version: string;
  name: string;
  description?: string;
  aliases?: string[];
  labels?: string[];
  confidence?: number;
  created: string;
  modified: string;
  created_by_ref?: string;
  external_references?: ExternalReference[];
  kill_chain_phases?: KillChainPhase[];
  first_seen?: string;
  last_seen?: string;
  goals?: string[];
  primary_motivation?: string;
  secondary_motivations?: string[];
  resource_level?: string;
  object_marking_refs?: string[];
  revoked?: boolean;
  lang?: string;
  enrichment?: Enrichment;
  extensions?: JSONObject;
  relationship?: RelationshipCommonProperties[];
  x_mitre_domains: string[];
}
