// src/graphql/artifacts/queries.ts
import { gql } from '@apollo/client';

export const GET_ARTIFACTS = gql`
  query GetArtifacts($filters: JSON, $from: Int!, $size: Int!, $search: String) {
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
      }
    }
  }
`;

// Ensure $from and $size are non-negative before executing the query
export const validatePagination = (from: number, size: number) => {
  if (from < 0 || size < 0) {
    throw new Error("Pagination variables 'from' and 'size' must be non-negative integers.");
  }
};
