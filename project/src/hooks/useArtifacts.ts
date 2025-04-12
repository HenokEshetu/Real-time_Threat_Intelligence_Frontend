import { useQuery, useMutation } from '@apollo/client';
import {
  ARTIFACTS_LIST,
  ARTIFACT_DETAIL,
  CREATE_ARTIFACT,
  UPDATE_ARTIFACT,
  DELETE_ARTIFACT
} from '../graphql/artifacts/queries';
import { Artifact, CreateArtifactInput, UpdateArtifactInput } from '../types/artifact';

export const useArtifacts = (variables = {}) => {
  const { data, loading, error, fetchMore, refetch } = useQuery(ARTIFACTS_LIST, {
    variables: { first: 10, ...variables },
    fetchPolicy: 'cache-and-network'
  });

  const artifacts = data?.artifacts?.edges?.map((edge: any) => edge.node) || [];
  const pageInfo = data?.artifacts?.pageInfo;

  const loadMore = () => {
    if (pageInfo?.hasNextPage) {
      fetchMore({
        variables: { after: pageInfo.endCursor },
      });
    }
  };

  return { artifacts, loading, error, loadMore, pageInfo, refetch };
};

export const useArtifact = (id: string) => {
  const { data, loading, error } = useQuery(ARTIFACT_DETAIL, {
    variables: { id },
    skip: !id
  });

  return {
    artifact: data?.artifact as Artifact | undefined,
    loading,
    error
  };
};

export const useCreateArtifact = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_ARTIFACT);

  const createArtifact = async (input: CreateArtifactInput) => {
    const { data } = await mutate({ variables: { input } });
    return data?.createArtifact as Artifact;
  };

  return { createArtifact, loading, error };
};

export const useUpdateArtifact = () => {
  const [mutate, { loading, error }] = useMutation(UPDATE_ARTIFACT);

  const updateArtifact = async (id: string, input: UpdateArtifactInput) => {
    const { data } = await mutate({ variables: { id, input } });
    return data?.updateArtifact as Artifact;
  };

  return { updateArtifact, loading, error };
};

export const useDeleteArtifact = () => {
  const [mutate, { loading, error }] = useMutation(DELETE_ARTIFACT);

  const deleteArtifact = async (id: string) => {
    await mutate({ variables: { id } });
    return true;
  };

  return { deleteArtifact, loading, error };
};