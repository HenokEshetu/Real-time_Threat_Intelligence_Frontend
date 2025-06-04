import gql from 'graphql-tag';

export const CREATE_TOOL = gql`
  mutation CreateTool($input: CreateToolInput!) {
    createTool(input: $input) {
      id
      aliases
      confidence
      created
      created_by_ref
      description
      enrichment
      x_mitre_platforms
      extensions
      external_references {
        source_name
        url
        description
      }
      kill_chain_phases {
        kill_chain_name
        phase_name
      }
      labels
      lang
      modified
      name
      object_marking_refs
      relationship {
        id
        source_ref
        target_ref
        type
      }
      revoked
      spec_version
      tool_types
      tool_version
      type
    }
  }
`;

export const UPDATE_TOOL = gql`
  mutation UpdateTool($id: String!, $input: UpdateToolInput!) {
    updateTool(id: $id, input: $input) {
      id
      aliases
      confidence
      created
      created_by_ref
      description
      x_mitre_platforms
      enrichment
      extensions
      external_references {
        source_name
        url
        description
      }
      kill_chain_phases {
        kill_chain_name
        phase_name
      }
      labels
      lang
      modified
      name
      object_marking_refs
      relationship {
        id
        source_ref
        target_ref
        type
      }
      revoked
      spec_version
      tool_types
      tool_version
      type
    }
  }
`;

export const DELETE_TOOL = gql`
  mutation DeleteTool($id: String!) {
    deleteTool(id: $id)
  }
`;
