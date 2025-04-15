// src/hooks/useArtifacts.ts
import { useQuery, gql, useMutation } from '@apollo/client';
import { CREATE_ARTIFACT, UPDATE_ARTIFACT } from '../graphql/artifacts/mutations';

const SEARCH_ARTIFACTS = gql`
  query SearchArtifacts($filters: JSON, $from: Int!, $size: Int!, $search: String) {
    searchArtifacts(filters: $filters, from: $from, size: $size, search: $search) {
      page
      pageSize
      total
      totalPages
      results {
        id
        name
        type
        spec_version
        created
        modified
        mime_type
        url
        confidence
        labels
        hashes {
          MD5
          SHA-256
        }
      }
    }
  }
`;

const GET_ARTIFACT = gql`
  query GetArtifact($id: ID!) {
    artifact(id: $id) {
      id
      name
      description
      created
      modified
      type
      mime_type
      confidence
      hashes {
        MD5
        SHA-1
        SHA-256
        SHA-512
      }
      payload_bin
      created_by_ref
      revoked
      labels
      lang
    }
  }
`;

export const useArtifacts = ({ search = '', from = 0, size = 10 }) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_ARTIFACTS, {
    variables: { 
      filters: {}, 
      from, 
      size, 
      search: search || undefined // Avoid sending empty strings
    },
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

export const useArtifact = (id: string) => {
  const { data, loading, error } = useQuery(GET_ARTIFACT, {
    variables: { id },
    skip: !id,
  });

  return { artifact: data?.artifact, loading, error };
};

export const useCreateArtifact = () => {
  const [createArtifact, { loading, error }] = useMutation(CREATE_ARTIFACT);
  return { createArtifact, loading, error };
};

export const useUpdateArtifact = () => {
  const [updateArtifact, { loading, error }] = useMutation(UPDATE_ARTIFACT);
  return { updateArtifact, loading, error };
};
