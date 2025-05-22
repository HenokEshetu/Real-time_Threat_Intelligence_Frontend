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
}

export interface RelationshipCommonProperties {
  confidence?: number;
  created: string;
  created_by_ref?: string;
  description?: string;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  id: string;
  labels?: string[];
  lang?: string;
  modified: string;
  object_marking_refs?: string[];
  relationship_type: string;
  revoked?: boolean;
  source_ref: string;
  spec_version: string;
  start_time?: string;
  stop_time?: string;
  target_ref: string;
  type: string;
}

export interface Note {
  abstract: string;
  authors?: string[];
  confidence?: number;
  content: string;
  content_type?: string;
  created: string;
  created_by_ref?: string;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  id: string;
  labels?: string[];
  lang?: string;
  modified: string;
  object_marking_refs?: string[];
  object_refs: string[];
  relationship?: RelationshipCommonProperties[];
  revoked?: boolean;
  spec_version: string;
  type: string;
}

export interface NoteSearchResult {
  page: number;
  pageSize: number;
  results: Note[];
  total: number;
  totalPages: number;
}
