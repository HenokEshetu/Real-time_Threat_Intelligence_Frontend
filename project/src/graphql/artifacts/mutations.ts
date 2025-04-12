import { gql } from '@apollo/client';

export const CREATE_ARTIFACT = gql`
  mutation CreateArtifact($input: CreateArtifactInput!) {
    createArtifact(input: $input) {
      id
      name
      mime_type
      created
    }
  }
`;

export const UPDATE_ARTIFACT = gql`
  mutation UpdateArtifact($id: ID!, $input: UpdateArtifactInput!) {
    updateArtifact(id: $id, input: $input) {
      id
      name
      mime_type
      modified
    }
  }
`;

export const DELETE_ARTIFACT = gql`
  mutation DeleteArtifact($id: ID!) {
    deleteArtifact(id: $id)
  }
`;