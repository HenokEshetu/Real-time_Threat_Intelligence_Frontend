import { Enrichment, ExternalReference } from '../file';

export interface MACAddress {
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
}

export interface MACAddressSearchResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: MACAddress[];
}
