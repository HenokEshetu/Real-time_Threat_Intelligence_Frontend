import { useQuery, useMutation } from '@apollo/client';
import {
  GET_TOOL,
  SEARCH_TOOLS,
  TOOL_CREATED_SUBSCRIPTION,
  TOOL_UPDATED_SUBSCRIPTION,
  TOOL_DELETED_SUBSCRIPTION,
} from '../graphql/tool/queries';
import {
  CREATE_TOOL,
  UPDATE_TOOL,
  DELETE_TOOL,
} from '../graphql/tool/mutations';
import { Tool, ToolSearchResult } from '../types/tool';
import { useEffect } from 'react';

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
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery<{
    searchTools: ToolSearchResult;
  }>(SEARCH_TOOLS, {
    variables: { filters, page, pageSize },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const unsubCreate = subscribeToMore({
      document: TOOL_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.toolCreated;
        if (!newItem) return prev;
        if (prev.searchTools.results.some((t: Tool) => t.id === newItem.id)) {
          return prev;
        }
        return {
          ...prev,
          searchTools: {
            ...prev.searchTools,
            results: [newItem, ...prev.searchTools.results].slice(0, pageSize),
            total: prev.searchTools.total + 1,
          },
        };
      },
    });

    const unsubUpdate = subscribeToMore({
      document: TOOL_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.toolUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchTools: {
            ...prev.searchTools,
            results: prev.searchTools.results.map((t: Tool) =>
              t.id === updated.id ? { ...t, ...updated } : t,
            ),
          },
        };
      },
    });

    const unsubDelete = subscribeToMore({
      document: TOOL_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.toolDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchTools: {
            ...prev.searchTools,
            results: prev.searchTools.results.filter(
              (t: Tool) => t.id !== deletedId,
            ),
            total: prev.searchTools.total - 1,
          },
        };
      },
    });

    return () => {
      unsubCreate();
      unsubUpdate();
      unsubDelete();
    };
  }, [subscribeToMore, pageSize]);

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
