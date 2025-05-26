import gql from 'graphql-tag';

export const THREAT_ACTOR_QUERY = gql`
  query ThreatActor($id: String!) {
    threatActor(id: $id) {
      id
      type
      spec_version
      name
      description
      threat_actor_types
      first_seen
      last_seen
      aliases
      labels
      confidence
      created
      modified
      created_by_ref
      external_references {
        id
        source_name
        description
        url
        external_id
      }
      object_marking_refs
      revoked
      lang
      enrichment
      extensions
      relationship {
        id
        type
        spec_version
        created
        modified
        relationship_type
        source_ref
        target_ref
        confidence
        description
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        enrichment
        labels
        revoked
        created_by_ref
        start_time
        stop_time
      }
      goals
      personal_motivations
      primary_motivation
      resource_level
      roles
      secondary_motivations
      sophistication
    }
  }
`;

export const SEARCH_THREAT_ACTORS = gql`
  query SearchThreatActors($filters: SearchThreatActorInput, $page: Int, $pageSize: Int) {
    searchThreatActors(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        id
        type
        spec_version
        name
        description
        threat_actor_types
        first_seen
        last_seen
        aliases
        labels
        confidence
        created
        modified
        created_by_ref
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        revoked
        lang
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          confidence
          description
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          enrichment
          labels
          revoked
          created_by_ref
          start_time
          stop_time
        }
        goals
        personal_motivations
        primary_motivation
        resource_level
        roles
        secondary_motivations
        sophistication
      }
    }
  }
`;
