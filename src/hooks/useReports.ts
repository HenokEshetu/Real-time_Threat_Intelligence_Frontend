import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_REPORTS,
  GET_REPORT,
  CREATE_REPORT,
  UPDATE_REPORT,
  DELETE_REPORT,
} from '@/graphql/report/queries';
import { ReportSearchResult } from '@/types/report';
import { toast } from 'sonner';

// Add these imports for subscriptions
import {
  REPORT_CREATED_SUBSCRIPTION,
  REPORT_UPDATED_SUBSCRIPTION,
  REPORT_DELETED_SUBSCRIPTION,
} from '@/graphql/report/subscriptions';
import { useEffect } from 'react';

export const useReports = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery(
    SEARCH_REPORTS,
    {
      variables: { filters, page, pageSize },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  );

  // Add subscription logic as of malware
  useEffect(() => {
    const unsubCreate = subscribeToMore({
      document: REPORT_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.reportCreated;
        if (!newItem) return prev;
        if (prev.searchReports.results.some((r: any) => r.id === newItem.id)) {
          return prev;
        }
        return {
          ...prev,
          searchReports: {
            ...prev.searchReports,
            results: [newItem, ...prev.searchReports.results].slice(
              0,
              pageSize,
            ),
            total: prev.searchReports.total + 1,
          },
        };
      },
    });

    const unsubUpdate = subscribeToMore({
      document: REPORT_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.reportUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchReports: {
            ...prev.searchReports,
            results: prev.searchReports.results.map((r: any) =>
              r.id === updated.id ? { ...r, ...updated } : r,
            ),
          },
        };
      },
    });

    const unsubDelete = subscribeToMore({
      document: REPORT_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.reportDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchReports: {
            ...prev.searchReports,
            results: prev.searchReports.results.filter(
              (r: any) => r.id !== deletedId,
            ),
            total: prev.searchReports.total - 1,
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

  if (error) {
    toast.error('Error loading reports data', {
      description: error?.message,
    });
  }

  const reports = data?.searchReports?.results || [];
  const total = data?.searchReports?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: { filters, page: page + 1, pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchReports: {
            ...fetchMoreResult.searchReports,
            results: [
              ...(prev?.searchReports?.results || []),
              ...(fetchMoreResult.searchReports?.results || []),
            ],
          },
        };
      },
    });
  };

  return {
    reports,
    loading,
    error,
    loadMore,
    total,
    hasMore: reports.length === pageSize,
  };
};

export const useReport = (id: string) => {
  const { data, loading, error } = useQuery(GET_REPORT, { variables: { id } });
  return { report: data?.report, loading, error };
};

export const useCreateReport = () => useMutation(CREATE_REPORT);
export const useUpdateReport = () => useMutation(UPDATE_REPORT);
export const useDeleteReport = () => useMutation(DELETE_REPORT);
