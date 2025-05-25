import { gql } from '@apollo/client';


// Delete Identity Mutation
export const DELETE_IDENTITY = gql`
  mutation DeleteIdentity($id: ID!) {
    deleteIdentity(id: $id) {
      id
      name
    }
  }
`;

// Create Indicator Mutation
export const CREATE_INDICATOR = gql`
  mutation CreateIndicator($input: CreateIndicatorInput!) {
    createIndicator(input: $input) {
      id
      name
      pattern
      pattern_type
      valid_from
      valid_until
      indicator_types
      labels
      description
      created
      modified
    }
  }
`;

// Update Indicator Mutation
export const UPDATE_INDICATOR = gql`
  mutation UpdateIndicator($input: UpdateIndicatorInput!) {
    updateIndicator(input: $input) {
      id
      name
      pattern
      pattern_type
      valid_from
      valid_until
      indicator_types
      labels
      description
      created
      modified
    }
  }
`;

// Delete Indicator Mutation
export const DELETE_INDICATOR = gql`
  mutation DeleteIndicator($id: ID!) {
    deleteIndicator(id: $id) {
      id
      name
    }
  }
`;
