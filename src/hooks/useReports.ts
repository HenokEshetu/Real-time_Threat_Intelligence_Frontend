import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_REPORTS,
  GET_REPORT,
  CREATE_REPORT,
  UPDATE_REPORT,
  DELETE_REPORT,
} from '@/graphql/report/queries';
import { ReportSearchResult } from '@/types/report';

export const useReports = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_REPORTS, {
    variables: { filters, page, pageSize },
    notifyOnNetworkStatusChange: true,
  });

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
