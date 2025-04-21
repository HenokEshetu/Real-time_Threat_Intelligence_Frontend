export interface ExternalReference {
  source_name: string;
  url?: string;
  external_id?: string;
}

export interface Report {
  id: string;
  name: string;
  description?: string;
  authors?: string[];
  published: string;
  report_types: string[];
  confidence?: number;
  created: string;
  created_by_ref?: string;
  modified: string;
  labels?: string[];
  object_refs?: string[];
  external_references?: ExternalReference[];
  extensions?: Record<string, any>;
  lang?: string;
  revoked?: boolean;
  spec_version: string;
  type: string;
  relationship?: any[];
}

export interface SearchReportInput {
  Relationship?: any[];
  authors?: string[];
  confidence?: number;
  created?: string;
  created_by_ref?: string;
  description?: string;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  id?: string;
  labels?: string[];
  lang?: string;
  modified?: string;
  name?: string;
  object_refs?: string[];
  published?: string;
  report_types?: string[];
  revoked?: boolean;
  spec_version?: string;
  type?: string;
}
