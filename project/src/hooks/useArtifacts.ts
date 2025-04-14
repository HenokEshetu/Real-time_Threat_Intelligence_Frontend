// src/hooks/useArtifacts.ts
import { useQuery, gql } from '@apollo/client';

const SEARCH_ARTIFACTS = gql`
  query SearchArtifacts($filters: ArtifactFiltersInput, $from: Int, $size: Int, $search: String) {
    searchArtifacts(filters: $filters, from: $from, size: $size, search: $search) {
      page
      pageSize
      total
      totalPages
      results {
        id
        type
        spec_version
        created
        modified
        mime_type
        url
        confidence
        labels
        description
        name
        payload_bin
      }
    }
  }
`;

export const useArtifacts = ({ search = '', from = 0, size = 10 }) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_ARTIFACTS, {
    variables: { filters: {}, from, size, search },
    notifyOnNetworkStatusChange: true,
  });

  const artifacts = data?.searchArtifacts?.results || [];
  const pageInfo = {
    hasNextPage: from + size < data?.searchArtifacts?.total,
  };

  const loadMore = () => {
    fetchMore({
      variables: {
        from: artifacts.length,
        size,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchArtifacts: {
            ...fetchMoreResult.searchArtifacts,
            results: [
              ...prev.searchArtifacts.results,
              ...fetchMoreResult.searchArtifacts.results,
            ],
          },
        };
      },
    });
  };

  return { artifacts, loading, error, loadMore, pageInfo };
};
