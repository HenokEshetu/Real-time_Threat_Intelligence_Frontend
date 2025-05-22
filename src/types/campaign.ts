export interface CampaignRelationship {
  id: string;
  source_ref: string;
  target_ref: string;
  type: string;
}

export interface Campaign {
  id: string;
  created: string;
  modified: string;
  type: string;
  name: string;
  description: string;
  aliases: string[];
  first_seen: string;
  last_seen: string;
  objective: string | null;
  relationship: CampaignRelationship | null;
}

export interface SearchCampaignsResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: Campaign[];
}
