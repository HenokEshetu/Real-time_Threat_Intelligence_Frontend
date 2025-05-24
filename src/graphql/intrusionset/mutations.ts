import gql from 'graphql-tag';

export const CREATE_INTRUSIONSET = gql`
  mutation CreateIntrusionSet($input: CreateIntrusionSetInput!) {
    createIntrusionSet(input: $input) {
      id
      type
      spec_version
      name
      description
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
      kill_chain_phases {
        id
        kill_chain_name
        phase_name
      }
      first_seen
      last_seen
      goals
      primary_motivation
      secondary_motivations
      resource_level
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
        lang
        extensions
        object_marking_refs
      }
    }
  }
`;

export const UPDATE_INTRUSIONSET = gql`
  mutation UpdateIntrusionSet($id: String!, $input: UpdateIntrusionSetInput!) {
    updateIntrusionSet(id: $id, input: $input) {
      id
      type
      spec_version
      name
      description
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
      kill_chain_phases {
        id
        kill_chain_name
        phase_name
      }
      first_seen
      last_seen
      goals
      primary_motivation
      secondary_motivations
      resource_level
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
        lang
        extensions
        object_marking_refs
      }
    }
  }
`;

export const DELETE_INTRUSIONSET = gql`
  mutation DeleteIntrusionSet($id: String!) {
    deleteIntrusionSet(id: $id)
  }
`;
