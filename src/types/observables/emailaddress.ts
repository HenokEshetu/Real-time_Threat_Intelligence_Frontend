export interface Enrichment {
  [key: string]: any;
}

export interface EnrichmentInput {
  [key: string]: any;
}

export interface ExternalReference {
  [key: string]: any;
}

export interface ExternalReferenceInput {
  [key: string]: any;
}

export interface EmailAddress {
  id: string;
  type: string;
  created: string;
  modified: string;
  labels: string[];
  confidence?: number;
  lang?: string;
  revoked?: boolean;
  value: string;
  display_name?: string;
  belongs_to_refs: string[];
  created_by_ref?: string;
  defanged?: boolean;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references: ExternalReference[];
  object_marking_refs: string[];
  spec_version: string;
}

export interface EmailAddressSearchResult {
  page: number;
  pageSize: number;
  results: EmailAddress[];
  total: number;
  totalPages: number;
}

export interface CreateEmailAddressInput {
  id: string;
  type: string;
  created: string;
  modified: string;
  labels: string[];
  confidence?: number;
  lang?: string;
  revoked?: boolean;
  value: string;
  display_name?: string;
  belongs_to_refs: string[];
  created_by_ref?: string;
  defanged?: boolean;
  enrichment?: EnrichmentInput;
  extensions?: Record<string, any>;
  external_references: ExternalReferenceInput[];
  object_marking_refs: string[];
  spec_version: string;
}

export interface UpdateEmailAddressInput {
  id: string;
  type: string;
  created: string;
  modified: string;
  labels: string[];
  confidence?: number;
  lang?: string;
  revoked?: boolean;
  value?: string;
  display_name?: string;
  belongs_to_refs: string[];
  created_by_ref?: string;
  defanged?: boolean;
  enrichment?: EnrichmentInput;
  extensions?: Record<string, any>;
  external_references: ExternalReferenceInput[];
  object_marking_refs: string[];
  spec_version: string;
}

export interface SearchEmailAddressInput {
  id?: string;
  type?: string;
  created?: string;
  modified?: string;
  labels?: string[];
  confidence?: number;
  lang?: string;
  revoked?: boolean;
  value?: string;
  display_name?: string;
  belongs_to_refs?: string[];
  created_by_ref?: string;
  defanged?: boolean;
  enrichment?: EnrichmentInput;
  extensions?: Record<string, any>;
  external_references?: ExternalReferenceInput[];
  object_marking_refs?: string[];
  spec_version?: string;
}
