import { useQuery } from '@apollo/client';
import { SEARCH_THREAT_ACTORS } from '@/graphql/threat-actors';
import { ThreatActor } from '@/types/threat-actor';

export const useThreatActors = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_THREAT_ACTORS, {
    variables: { filters: filters, page: page, pageSize: pageSize },
    notifyOnNetworkStatusChange: true,
  });

  const threatActors = data?.searchThreatActors?.results || [];
  const total = data?.searchThreatActors?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: { filter: filters, page: page + 1, pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchReports: [
            ...(prev?.searchThreatActors || []),
            ...fetchMoreResult.searchThreatActors,
          ],
        };
      },
    });
  };

  return {
    threatActors,
    loading,
    error,
    loadMore,
    total,
    hasMore: threatActors.length === pageSize,
  };
};

// export const useReport = (id: string) => {
//   const { data, loading, error } = useQuery(GET_REPORT, { variables: { id } });
//   return { report: data?.getReport, loading, error };
// };

// export const useCreateReport = () => useMutation(CREATE_REPORT);
// export const useUpdateReport = () => useMutation(UPDATE_REPORT);
// export const useDeleteReport = () => useMutation(DELETE_REPORT);
