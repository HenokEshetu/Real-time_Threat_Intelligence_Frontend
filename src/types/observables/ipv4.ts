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

export interface IPv4Address {
  confidence?: number;
  created: string;
  created_by_ref?: string;
  defanged?: boolean;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  id: string;
  labels?: string[];
  lang?: string;
  modified: string;
  object_marking_refs?: string[];
  revoked?: boolean;
  spec_version: string;
  type: string;
  value: string;
  description: string;
  pattern: string;
}

export interface IPv4AddressSearchResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: IPv4Address[];
}
