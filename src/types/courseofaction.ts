export interface ExternalReference {
  id?: string;
  source_name: string;
  description?: string;
  url?: string;
  external_id?: string;
}

export interface Enrichment {
  [key: string]: any;
}

export interface RelationshipCommonProperties {
  id?: string;
  type?: string;
  spec_version?: string;
  created?: string;
  modified?: string;
  relationship_type?: string;
  source_ref?: string;
  target_ref?: string;
  confidence?: number;
  description?: string;
  external_references?: ExternalReference[];
  labels?: string[];
  revoked?: boolean;
  created_by_ref?: string;
  start_time?: string;
  stop_time?: string;
  enrichment?: any;
}

export interface CourseOfAction {
  id: string;
  type: string;
  spec_version: string;
  name: string;
  description?: string;
  action?: string;
  action_bin?: string;
  action_reference?: string;
  action_type?: string;
  confidence?: number;
  created: string;
  modified: string;
  created_by_ref?: string;
  external_references?: ExternalReference[];
  labels?: string[];
  lang?: string;
  object_marking_refs?: string[];
  revoked?: boolean;
  enrichment?: Enrichment;
  extensions?: any;
  relationship?: RelationshipCommonProperties[];
}

export interface CourseOfActionSearchResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: CourseOfAction[];
}
