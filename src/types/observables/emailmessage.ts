import { Enrichment, ExternalReference } from '../file';

export interface EmailMIMEComponent {
  body: string;
  body_raw_ref?: string;
  confidence?: number;
  content_disposition?: string;
  content_type?: string;
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
  revoked?: boolean;
  spec_version: string;
  type: string;
}

export interface EmailMessage {
  additional_header_fields?: Record<string, any>;
  bcc_refs?: string[];
  body?: string;
  body_multipart?: EmailMIMEComponent[];
  cc_refs?: string[];
  confidence?: number;
  content_type?: string;
  created: string;
  created_by_ref?: string;
  date?: string;
  defanged?: boolean;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  from_ref?: string;
  id: string;
  is_multipart?: boolean;
  labels?: string[];
  lang?: string;
  message_id?: string;
  modified: string;
  object_marking_refs?: string[];
  raw_email_ref?: string;
  received_lines?: string[];
  revoked?: boolean;
  sender_ref?: string[];
  spec_version: string;
  subject?: string;
  to_refs?: string[];
  type: string;
}

export interface EmailMessageSearchResult {
  page: number;
  pageSize: number;
  results: EmailMessage[];
  total: number;
  totalPages: number;
}
