export type IdentityClass = "INDIVIDUAL" | "ORGANIZATION" | "SYSTEM";
export type IndustrySector = "FINANCIAL_SERVICES" | "TECHNOLOGY" | "ENERGY" | "UTILITIES" | string;

export interface ExternalReference {
  id: string;
  source_name: string;
  description?: string;
  url?: string;
  external_id?: string;
}

export interface Relationship {
  id: string;
  source_ref: string;
  target_ref: string;
  relationship_type: string;
  description?: string;
  type: string;
  spec_version: string;
  created: string;
  modified: string;
}

export interface Identity {
  id: string;
  name: string;
  description?: string;
  identity_class: IdentityClass;
  type: string;
  spec_version: string;
  created: string;
  modified: string;
  confidence?: number;
  contact_information?: string;
  created_by_ref?: string;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  labels?: string[];
  lang?: string;
  relationship?: Relationship[];
  revoked?: boolean;
  roles?: string[];
  sectors?: IndustrySector[];
}

export interface CreateIdentityInput {
  name: string;
  description?: string;
  identity_class?: string;
  sectors?: string[];
  contact_information?: string;
  roles?: string[];
  labels?: string[];
}

export interface UpdateIdentityInput extends Partial<CreateIdentityInput> {}

export interface SearchIdentityInput extends Partial<CreateIdentityInput> {}

export interface IdentitySearchResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: Identity[];
}
