export interface Indicator {
  id: string;
  type?: string;
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
