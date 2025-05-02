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
  id: string;
  source_name: string;
  description?: string;
  url?: string;
  external_id?: string;
}

export interface StixRelationship {
  id: string;
  type: string;
  spec_version: string;
  created: string;
  modified: string;
  confidence?: number;
  relationship_type: string;
  description?: string;
  source_ref: string;
  target_ref: string;
  start_time?: string;
  stop_time?: string;
  created_by_ref?: string;
  labels?: string[];
  lang?: string;
  revoked?: boolean;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  object_marking_refs?: string[];
}

export interface StixRelationshipSearchResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: StixRelationship[];
}
