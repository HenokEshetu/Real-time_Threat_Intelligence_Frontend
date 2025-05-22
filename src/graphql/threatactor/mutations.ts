import gql from 'graphql-tag';

export const CREATE_THREAT_ACTOR = gql`
  mutation CreateThreatActor($input: CreateThreatActorInput!) {
    createThreatActor(input: $input) {
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

export const UPDATE_THREAT_ACTOR = gql`
  mutation UpdateThreatActor($id: String!, $input: UpdateThreatActorInput!) {
    updateThreatActor(id: $id, input: $input) {
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

export const DELETE_THREAT_ACTOR = gql`
  mutation DeleteThreatActor($id: String!) {
    deleteThreatActor(id: $id)
  }
`;
