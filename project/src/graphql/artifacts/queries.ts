import { gql } from '@apollo/client';

export const ARTIFACTS_LIST = gql`
  query ArtifactsList($first: Int, $after: String, $search: String) {
    artifacts(first: $first, after: $after, search: $search) {
      edges {
        node {
          id
          name
          mime_type
          created
          modified
          labels
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const ARTIFACT_DETAIL = gql`
  query ArtifactDetail($id: ID!) {
    artifact(id: $id) {
      id
      name
      mime_type
      payload_bin
      url
      hashes {
        MD5
        SHA1
        SHA256
      }
      created
      modified
      labels
      description
    }
  }
`;