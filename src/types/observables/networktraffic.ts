import { Enrichment, ExternalReference } from '../file';

export interface NetworkTraffic {
  confidence?: number;
  created: string;
  created_by_ref?: string;
  defanged?: boolean;
  dst_byte_count?: number;
  dst_packets?: number;
  dst_payload_ref?: string;
  dst_port?: number;
  dst_ref?: string;
  encapsulated_by_ref?: string;
  encapsulates_refs?: string[];
  end?: string;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  id: string;
  ipfix?: boolean;
  is_active?: boolean;
  labels?: string[];
  lang?: string;
  modified: string;
  object_marking_refs?: string[];
  protocols?: string[];
  revoked?: boolean;
  spec_version: string;
  src_byte_count?: number;
  src_packets?: number;
  src_payload_ref?: string;
  src_port?: number;
  src_ref?: string;
  start?: string;
  type: string;
}

export interface NetworkTrafficSearchResult {
  page: number;
  pageSize: number;
  results: NetworkTraffic[];
  total: number;
  totalPages: number;
}
