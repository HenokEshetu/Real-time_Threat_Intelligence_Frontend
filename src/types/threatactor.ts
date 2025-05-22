export type ThreatActorType =
  | 'ACTIVIST'
  | 'COMPETITOR'
  | 'CRIME_SYNDICATE'
  | 'CRIMINAL'
  | 'HACKER'
  | 'INSIDER_ACCIDENTAL'
  | 'INSIDER_DISGRUNTLED'
  | 'NATION_STATE'
  | 'SENSATIONALIST'
  | 'SPY'
  | 'TERRORIST'
  | 'UNKNOWN';

export interface ExternalReference {
  id?: string;
  source_name: string;
  description?: string;
  url?: string;
  external_id?: string;
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
  enrichment?: any;
  labels?: string[];
  revoked?: boolean;
  created_by_ref?: string;
  start_time?: string;
  stop_time?: string;
}

export interface ThreatActor {
  id: string;
  type: string;
  spec_version: string;
  name: string;
  description?: string;
  threat_actor_types: ThreatActorType[];
  is_family?: boolean; // not in schema, but for compatibility
  first_seen?: string;
  last_seen?: string;
  aliases?: string[];
  labels?: string[];
  confidence?: number;
  created: string;
  modified: string;
  created_by_ref?: string;
  external_references?: ExternalReference[];
  kill_chain_phases?: any[]; // not in schema, but for compatibility
  object_marking_refs?: string[];
  revoked?: boolean;
  lang?: string;
  enrichment?: any;
  extensions?: any;
  relationship?: RelationshipCommonProperties[];
  goals?: string[];
  personal_motivations?: string;
  primary_motivation?: string;
  resource_level?: string;
  roles?: string[];
  secondary_motivations?: string[];
  sophistication?: string;
}
