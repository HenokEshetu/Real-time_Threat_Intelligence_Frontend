import { useQuery, gql, useMutation } from '@apollo/client';
import {
  CREATE_ARTIFACT,
  UPDATE_ARTIFACT,
  DELETE_ARTIFACT,
} from '../graphql/artifacts/mutations';
import {
  ARTIFACT_QUERY,
  SEARCH_ARTIFACTS,
} from '../graphql/artifacts/queries';

export const useArtifacts = ({ filters = {}, from = 0, size = 10 } = {}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_ARTIFACTS, {
    variables: {
      filters,
      from,
      size,
    },
    notifyOnNetworkStatusChange: true,
  });
  const artifacts = data?.searchArtifacts?.results || [];
  const pageInfo = {
    hasNextPage: from + size < (data?.searchArtifacts?.total ?? 0),
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
  const { data, loading, error } = useQuery(ARTIFACT_QUERY, {
    variables: { id },
    skip: !id,
  });

  return { artifact: data?.artifactByID, loading, error };
};

export const useCreateArtifact = () => {
  const [createArtifact, { loading, error }] = useMutation(CREATE_ARTIFACT);
  return { createArtifact, loading, error };
};

export const useUpdateArtifact = () => {
  const [updateArtifact, { loading, error }] = useMutation(UPDATE_ARTIFACT);
  return { updateArtifact, loading, error };
};

export const useDeleteArtifact = () => {
  const [deleteArtifact, { loading, error }] = useMutation(DELETE_ARTIFACT);
  return { deleteArtifact, loading, error };
};
