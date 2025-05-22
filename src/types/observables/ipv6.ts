import { Enrichment, ExternalReference } from '../file';

export interface IPv6Address {
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
  resolves_to_refs?: string;
  revoked?: boolean;
  spec_version: string;
  type: string;
  value: string;
}

export interface IPv6AddressSearchResult {
  page: number;
  pageSize: number;
  results: IPv6Address[];
  total: number;
  totalPages: number;
}

export interface CreateIPv6AddressInput extends Omit<IPv6Address, 'object_marking_refs'> {
  object_marking_refs?: string[];
}

export interface UpdateIPv6AddressInput extends Omit<IPv6Address, 'object_marking_refs'> {
  object_marking_refs?: string[];
}

export interface SearchIPv6AddressInput {
  confidence?: number;
  created?: string;
  created_by_ref?: string;
  defanged?: boolean;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  id?: string;
  labels?: string[];
  lang?: string;
  modified?: string;
  resolves_to_refs?: string;
  revoked?: boolean;
  spec_version?: string;
  type?: string;
  value?: string;
}
