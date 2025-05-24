export enum IdentityClass {
  CLASS = 'CLASS',
  GROUP = 'GROUP',
  INDIVIDUAL = 'INDIVIDUAL',
  ORGANIZATION = 'ORGANIZATION',
  SYSTEM = 'SYSTEM',
  UNKNOWN = 'UNKNOWN',
}

export enum IndustrySector {
  AEROSPACE = 'AEROSPACE',
  AGRICULTURE = 'AGRICULTURE',
  AUTOMOTIVE = 'AUTOMOTIVE',
  CHEMICAL = 'CHEMICAL',
  COMMERCIAL = 'COMMERCIAL',
  COMMUNICATIONS = 'COMMUNICATIONS',
  CONSTRUCTION = 'CONSTRUCTION',
  DEFENSE = 'DEFENSE',
  EDUCATION = 'EDUCATION',
  ENERGY = 'ENERGY',
  ENTERTAINMENT = 'ENTERTAINMENT',
  FINANCIAL_SERVICES = 'FINANCIAL_SERVICES',
  GOVERNMENT = 'GOVERNMENT',
  HEALTHCARE = 'HEALTHCARE',
  HOSPITALITY_LEISURE = 'HOSPITALITY_LEISURE',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  INSURANCE = 'INSURANCE',
  MANUFACTURING = 'MANUFACTURING',
  MINING = 'MINING',
  NON_PROFIT = 'NON_PROFIT',
  PHARMACEUTICALS = 'PHARMACEUTICALS',
  RETAIL = 'RETAIL',
  TECHNOLOGY = 'TECHNOLOGY',
  TELECOMMUNICATIONS = 'TELECOMMUNICATIONS',
  TRANSPORTATION = 'TRANSPORTATION',
  UTILITIES = 'UTILITIES',
}

export interface ExternalReference {
  source_name: string;
  external_id?: string;
  url?: string;
  description?: string;
  id?: string;
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

export interface Identity {
  id: string;
  type: string;
  spec_version: string;
  name: string;
  description?: string;
  identity_class: IdentityClass;
  sectors?: IndustrySector[];
  contact_information?: string;
  roles?: string[];
  labels?: string[];
  created: string;
  modified: string;
  created_by_ref?: string;
  external_references?: ExternalReference[];
  object_marking_refs?: string[];
  revoked?: boolean;
  lang?: string;
  confidence?: number;
  enrichment?: any;
  extensions?: any;
  relationship?: RelationshipCommonProperties[];
}
