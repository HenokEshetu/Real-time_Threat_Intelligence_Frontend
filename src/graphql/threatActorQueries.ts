import { gql } from "@apollo/client";

export const SEARCH_THREAT_ACTORS = gql`
  query SearchThreatActors($filters: SearchThreatActorInput, $page: Float = 1, $pageSize: Float = 10) {
    searchThreatActors(filters: $filters, page: $page, pageSize: $pageSize) {
      id
      name
      description
      type
      threat_actor_types
      aliases
      confidence
      created
      created_by_ref
      modified
      labels
      external_references {
        source_name
        external_id
        url
        description
      }
      first_seen
      last_seen
      goals
      personal_motivations
      primary_motivation
      resource_level
      revoked
      roles
      secondary_motivations
      sophistication
      spec_version
      lang
    }
  }
`;
