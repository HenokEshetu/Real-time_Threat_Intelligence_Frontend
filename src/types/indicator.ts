export interface KillChainPhase {
  kill_chain_name: string;
  phase_name: string;
}

export interface Indicator {
  id: string;
  name?: string;
  pattern: string;
  pattern_type: string;
  valid_from: string;
  valid_until?: string;
  indicator_types?: string[];
  labels?: string[];
  description?: string;
  created: string;
  modified: string;
  confidence?: number;
  created_by_ref?: string;
  revoked?: boolean;
  lang?: string;
  external_references?: unknown[];
  object_marking_refs?: string[];
  kill_chain_phases?: KillChainPhase[];
  hashes?: Record<string, string>;
}

export interface CreateIndicatorInput {
  name: string;
  pattern: string;
  pattern_type: string;
  valid_from: string;
  valid_until?: string;
  indicator_types: string[];
  labels: string[];
  description?: string;
}

export interface UpdateIndicatorInput {
  name?: string;
  pattern?: string;
  pattern_type?: string;
  valid_from?: string;
  valid_until?: string;
  indicator_types?: string[];
  labels?: string[];
  description?: string;
}
