import { ExternalReference, Relationship } from './identity';

export type LocationType =
  | "ADMINISTRATIVE_AREA"
  | "ASTRONOMICAL_OBJECT"
  | "CITY"
  | "CONTINENT"
  | "COUNTRY"
  | "MARITIME_REGION"
  | "REGION"
  | "UNKNOWN";

export interface Location {
  id: string;
  name: string;
  description?: string;
  type: string;
  spec_version: string;
  created: string;
  modified: string;
  confidence?: number;
  created_by_ref?: string;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  labels?: string[];
  lang?: string;
  relationship?: Relationship[];
  revoked?: boolean;
  administrative_area?: string;
  city?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  postal_code?: string;
  precision?: string;
  region?: string;
  street_address?: string;
  default: LocationType;
}

export interface CreateLocationInput {
  Relationship?: Partial<Relationship>[];
  administrative_area?: string;
  city?: string;
  confidence?: number;
  country?: string;
  created: string;
  created_by_ref?: string;
  description?: string;
  extensions?: Record<string, any>;
  external_references?: Partial<ExternalReference>[];
  id: string;
  labels?: string[];
  lang?: string;
  latitude?: string;
  location_type: LocationType;
  longitude?: string;
  modified: string;
  name: string;
  postal_code?: string;
  precision?: string;
  region?: string;
  revoked?: boolean;
  spec_version: string;
  street_address?: string;
  type: string;
}

export interface UpdateLocationInput {
  Relationship?: Partial<Relationship>[];
  administrative_area?: string;
  city?: string;
  confidence?: number;
  country?: string;
  created: string;
  created_by_ref?: string;
  description?: string;
  extensions?: Record<string, any>;
  external_references?: Partial<ExternalReference>[];
  id: string;
  labels?: string[];
  lang?: string;
  latitude?: string;
  location_type: LocationType;
  longitude?: string;
  modified: string;
  name?: string;
  postal_code?: string;
  precision?: string;
  region?: string;
  revoked?: boolean;
  spec_version: string;
  street_address?: string;
  type: string;
}

export interface SearchLocationInput {
  Relationship?: Partial<Relationship>[];
  administrative_area?: string;
  city?: string;
  confidence?: number;
  country?: string;
  created?: string;
  created_by_ref?: string;
  description?: string;
  extensions?: Record<string, any>;
  external_references?: Partial<ExternalReference>[];
  id?: string;
  labels?: string[];
  lang?: string;
  latitude?: string;
  location_type?: LocationType;
  longitude?: string;
  modified?: string;
  name?: string;
  postal_code?: string;
  precision?: string;
  region?: string;
  revoked?: boolean;
  spec_version?: string;
  street_address?: string;
  type?: string;
}

export interface LocationSearchResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: Location[];
}
