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
  source_name: string;
  url?: string;
  external_id?: string;
}

export interface RelationshipCommonProperties {
  relationship_type: string;
  source_ref: string;
  target_ref: string;
}

export interface Report {
  id: string;
  name: string;
  description?: string;
  report_types: string[];
  published: string;
  authors: string[];
  created: string;
  modified: string;
  object_refs: string[];
  confidence?: number;
  labels?: string[];
  lang?: string;
  revoked?: boolean;
  spec_version: string;
  type: string;
  created_by_ref?: string;
  enrichment?: Enrichment;
  external_references?: ExternalReference[];
  object_marking_refs?: string[];
  relationship?: RelationshipCommonProperties[];
}

export interface ReportSearchResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: Report[];
}
