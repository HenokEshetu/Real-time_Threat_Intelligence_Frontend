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

export interface RelationshipCommonProperties {
  id: string;
  relationship_type: string;
  source_ref: string;
  target_ref: string;
}

export enum ThreatActorType {
  ACTIVIST = 'ACTIVIST',
  COMPETITOR = 'COMPETITOR',
  CRIME_SYNDICATE = 'CRIME_SYNDICATE',
  CRIMINAL = 'CRIMINAL',
  HACKER = 'HACKER',
  INSIDER_ACCIDENTAL = 'INSIDER_ACCIDENTAL',
  INSIDER_DISGRUNTLED = 'INSIDER_DISGRUNTLED',
  NATION_STATE = 'NATION_STATE',
  SENSATIONALIST = 'SENSATIONALIST',
  SPY = 'SPY',
  TERRORIST = 'TERRORIST',
  UNKNOWN = 'UNKNOWN',
}

export interface ThreatActor {
  id: string;
  name: string;
  description?: string;
  aliases?: string[];
  threat_actor_types: ThreatActorType[];
  first_seen?: string;
  last_seen?: string;
  roles?: string[];
  goals?: string[];
  primary_motivation?: string;
  secondary_motivations?: string[];
  personal_motivations?: string;
  resource_level?: string;
  sophistication?: string;
  created: string;
  modified: string;
  created_by_ref?: string;
  confidence?: number;
  labels?: string[];
  lang?: string;
  revoked?: boolean;
  spec_version: string;
  type: string;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  object_marking_refs?: string[];
  relationship?: RelationshipCommonProperties[];
}

export interface ThreatActorSearchResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: ThreatActor[];
}
