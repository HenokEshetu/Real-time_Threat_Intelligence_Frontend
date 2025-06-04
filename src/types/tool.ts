export type ToolType =
  | 'CREDENTIAL_EXPLOITATION'
  | 'DENIAL_OF_SERVICE'
  | 'EXPLOITATION'
  | 'INFORMATION_GATHERING'
  | 'NETWORK_CAPTURE'
  | 'REMOTE_ACCESS'
  | 'UNKNOWN'
  | 'VULNERABILITY_SCANNING';

export interface ExternalReference {
  source_name: string;
  url?: string;
  description?: string;
}

export interface KillChainPhase {
  kill_chain_name: string;
  phase_name: string;
}

export interface RelationshipCommonProperties {
  id: string;
  source_ref: string;
  target_ref: string;
  type: string;
}

export interface Enrichment {
  // Define enrichment fields as needed
  [key: string]: any;
}

export interface Tool {
  id: string;
  aliases: string[];
  confidence?: number;
  created: string;
  created_by_ref?: string;
  description?: string;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  kill_chain_phases?: KillChainPhase[];
  labels?: string[];
  lang?: string;
  modified: string;
  name: string;
  object_marking_refs?: string[];
  relationship?: RelationshipCommonProperties[];
  revoked?: boolean;
  spec_version: string;
  tool_types: ToolType[];
  tool_version?: string;
  type: string;
  x_mitre_platforms: string[];
}

export interface ToolSearchResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: Tool[];
}
