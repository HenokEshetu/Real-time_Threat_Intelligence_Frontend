import gql from 'graphql-tag';

export const GET_TOOL = gql`
  query GetTool($id: String!) {
    tool(id: $id) {
      id
      aliases
      confidence
      created
      created_by_ref
      description

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

      tool_version
      type
    }
  }
`;

export const SEARCH_TOOLS = gql`
  query SearchTools($filters: SearchToolInput, $page: Int, $pageSize: Int) {
    searchTools(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        id
        aliases
        confidence
        created
        created_by_ref
        description

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
        tool_version
        type
      }
    }
  }
`;

export const TOOL_CREATED_SUBSCRIPTION = gql`
  subscription ToolCreated {
    toolCreated {
      id
      aliases
      confidence
      created
      created_by_ref
      description
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
      tool_version
      type
    }
  }
`;

export const TOOL_UPDATED_SUBSCRIPTION = gql`
  subscription ToolUpdated {
    toolUpdated {
      id
      aliases
      confidence
      created
      created_by_ref
      description
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
      tool_version
      type
    }
  }
`;

export const TOOL_DELETED_SUBSCRIPTION = gql`
  subscription ToolDeleted {
    toolDeleted
  }
`;
