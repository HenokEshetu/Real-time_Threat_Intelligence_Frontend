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
  spec_version: string;
  start_time?: string;
  stop_time?: string;
  source_ref: string;
  target_ref: string;
  type: string;
}

export interface ObservedData {
  confidence?: number;
  created: string;
  created_by_ref?: string;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  first_observed: string;
  id: string;
  labels?: string[];
  lang?: string;
  last_observed: string;
  modified: string;
  number_observed: number;
  object_marking_refs?: string[];
  object_refs: string[];
  relationship?: RelationshipCommonProperties[];
  revoked?: boolean;
  spec_version: string;
  type: string;
}

export interface ObservedDataSearchResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: ObservedData[];
}
