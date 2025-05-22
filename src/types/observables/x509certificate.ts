import { Enrichment, ExternalReference } from '@/types/report';

export interface Hashes {
  [algorithm: string]: string;
}

export interface X509Certificate {
  confidence?: number;
  created: string;
  created_by_ref?: string;
  defanged?: boolean;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  hashes?: Hashes;
  id: string;
  is_self_signed?: boolean;
  issuer?: string;
  labels?: string[];
  lang?: string;
  modified: string;
  object_marking_refs?: string[];
  revoked?: boolean;
  serial_number?: string;
  signature_algorithm?: string;
  spec_version: string;
  subject?: string;
  subject_public_key_algorithm?: string;
  subject_public_key_exponent?: string;
  subject_public_key_modulus?: string;
  type: string;
  validity_not_after?: string;
  validity_not_before?: string;
  version?: string;
  x509_v3_extensions?: string[];
}

export interface X509CertificateSearchResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: X509Certificate[];
}
