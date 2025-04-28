import { useQuery } from '@apollo/client';
import { SEARCH_DOMAIN_OBSERVABLES } from '../../graphql/observables/domain';
import { DomainName } from '../../types/observables/domain';

export const useDomains = ({
  filter,
  page,
  pageSize,
}: {
  filter?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(
    SEARCH_DOMAIN_OBSERVABLES,
    {
      variables: {
        filter: filter,
        page: page,
        pageSize: pageSize,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const domains = data?.searchDomainNames?.results || [];
  const total = data?.searchDomainNames?.total || 0;

  console.log('domains ', domains);

  const loadMore = () => {
    fetchMore({
      variables: {
        filter: filter,
        page: page + 1,
        pageSize: pageSize,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          searchDomainNames: [
            ...(prev?.searchDomainNames || []),
            ...fetchMoreResult.searchDomainNames,
          ],
        };
      },
    });
  };

  return {
    domains,
    loading,
    error,
    loadMore,
    total,
    hasMore: domains.length === pageSize,
  };
};

// export const useFile = (fileId: string) => {
//   const { files, loading, error } = useFiles();
//   const file = files.find((f) => f.id === fileId);

//   return { file, loading, error };
// };
