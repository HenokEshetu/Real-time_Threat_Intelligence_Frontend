import { useQuery, useMutation } from '@apollo/client';
import { GET_TOOL, SEARCH_TOOLS } from '../graphql/tool/queries';
import {
  CREATE_TOOL,
  UPDATE_TOOL,
  DELETE_TOOL
} from '../graphql/tool/mutations';
import { Tool, ToolSearchResult } from '../types/tool';

// Fetch a single tool by ID
export function useTool(id: string) {
  const { data, loading, error } = useQuery<{ tool: Tool }>(GET_TOOL, {
    variables: { id },
    skip: !id,
  });
  return {
    tool: data?.tool,
    loading,
    error,
  };
}

// Fetch tools with filters, pagination, and fetchMore
export const useTools = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery<{ searchTools: ToolSearchResult }>(
    SEARCH_TOOLS,
    {
      variables: { filters, page, pageSize },
      notifyOnNetworkStatusChange: true,
    }
  );

  const tools = data?.searchTools?.results || [];
  const total = data?.searchTools?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: { filters, page: page + 1, pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchTools: {
            ...fetchMoreResult.searchTools,
            results: [
              ...(prev?.searchTools?.results || []),
              ...(fetchMoreResult.searchTools?.results || []),
            ],
          },
        };
      },
    });
  };

  return {
    tools,
    loading,
    error,
    loadMore,
    total,
    hasMore: tools.length === pageSize,
  };
};

// Mutation hooks for tools
export const useCreateTool = () => useMutation(CREATE_TOOL);
export const useUpdateTool = () => useMutation(UPDATE_TOOL);
export const useDeleteTool = () => useMutation(DELETE_TOOL);
