// src/graphql/artifacts/queries.ts
import { gql } from '@apollo/client';

export const GET_ARTIFACTS = gql`
  query GetArtifacts {
    searchArtifacts(filters: {}, from: 0, size: 2) {
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
