// src/hooks/useArtifacts.ts
import { useQuery, gql, useMutation } from '@apollo/client';
import {
  CREATE_ARTIFACT,
  UPDATE_ARTIFACT,
} from '../graphql/artifacts/mutations';

// const SEARCH_ARTIFACTS = gql`
//   query SearchArtifacts($filters: JSON, $from: Int!, $size: Int!, $search: String) {
//     searchArtifacts(filters: $filters, from: $from, size: $size, search: $search) {
//       page
//       pageSize
//       total
//       totalPages
//       results {
//         id
//         name
//         type
//         spec_version
//         created
//         modified
//         mime_type
//         url
//         confidence
//         labels
//         hashes {
//           MD5
//           SHA256
//         }
//       }
//     }
//   }
// `;

const SEARCH_ARTIFACTS = gql`
  query SearchArtifacts(
    $filters: SearchArtifactInput!
    $from: Int!
    $size: Int!
  ) {
    searchArtifacts(filters: $filters, from: $from, size: $size) {
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
      }
    }
  }
`;

const GET_ARTIFACT = gql`
  query Artifact($id: String!) {
    artifactByID(id: $id) {
      id
      created
      modified
      type
      mime_type
      confidence
      hashes {
        MD5
        SHA_1
        SHA_256
        SHA_512
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
      filters: { type: 'file', confidence: 0.8 },
      from: from,
      size: size,
    },
    notifyOnNetworkStatusChange: true,
  });
  const artifacts = data?.searchArtifacts?.results || [];
  // console.log('artifacts', artifacts);
  const pageInfo = {
    hasNextPage: from + size < data?.searchArtifacts?.total,
  };
  // const pageInfo = { hasNextPage: false };

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
    // skip: !id,
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
