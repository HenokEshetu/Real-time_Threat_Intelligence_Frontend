import gql from 'graphql-tag';

export const CREATE_ATTACK_PATTERN = gql`
  mutation CreateAttackPattern($input: CreateAttackPatternInput!) {
    createAttackPattern(input: $input) {
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
        labels
        revoked
        created_by_ref
        start_time
        stop_time
      }
    }
  }
`;

export const UPDATE_ATTACK_PATTERN = gql`
  mutation UpdateAttackPattern($id: String!, $input: UpdateAttackPatternInput!) {
    updateAttackPattern(id: $id, input: $input) {
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
        labels
        revoked
        created_by_ref
        start_time
        stop_time
      }
    }
  }
`;

export const DELETE_ATTACK_PATTERN = gql`
  mutation RemoveAttackPattern($id: String!) {
    removeAttackPattern(id: $id)
  }
`;
