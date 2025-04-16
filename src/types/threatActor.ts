export type ThreatActorType =
  | "ACTIVIST"
  | "COMPETITOR"
  | "CRIME_SYNDICATE"
  | "CRIMINAL"
  | "HACKER"
  | "INSIDER_ACCIDENTAL"
  | "INSIDER_DISGRUNTLED"
  | "NATION_STATE"
  | "SENSATIONALIST"
  | "SPY"
  | "TERRORIST"
  | "UNKNOWN";

export interface ExternalReference {
  source_name: string;
  external_id?: string;
  url?: string;
  description?: string;
}

export interface ThreatActor {
  id: string;
  type?: string;
  name: string;
  description?: string;
  roles?: string[];
  sophistication?: string;
  resource_level?: string;
  primary_motivation?: string;
  aliases?: string[];
  labels?: string[];
  first_seen?: string;
  last_seen?: string;
}
