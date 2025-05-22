import { Enrichment, ExternalReference } from '@/types/report';

export interface UserAccount {
  account_created?: string;
  account_expires?: string;
  account_first_login?: string;
  account_last_login?: string;
  account_login?: string;
  account_type?: string;
  can_escalate_privs?: boolean;
  confidence?: number;
  created: string;
  created_by_ref?: string;
  credential?: string;
  credential_last_changed?: string;
  defanged?: boolean;
  display_name?: string;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  id: string;
  is_disabled?: boolean;
  is_privileged?: boolean;
  is_service_account?: boolean;
  labels?: string[];
  lang?: string;
  modified: string;
  object_marking_refs?: string[];
  revoked?: boolean;
  spec_version: string;
  type: string;
  user_id?: string;
}

export interface UserAccountSearchResult {
  page: number;
  pageSize: number;
  results: UserAccount[];
  total: number;
  totalPages: number;
}
