import { gql } from '@apollo/client';

export const CREATE_ARTIFACT = gql`
  mutation CreateArtifact($input: CreateArtifactInput!) {
    createArtifact(input: $input) {
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

export const UPDATE_ARTIFACT = gql`
  mutation UpdateArtifact($id: ID!, $input: UpdateArtifactInput!) {
    updateArtifact(id: $id, input: $input) {
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
      modified
      labels
      description
    }
  }
`;

export const DELETE_ARTIFACT = gql`
  mutation DeleteArtifact($id: ID!) {
    deleteArtifact(id: $id) {
      id
      success
    }
  }
`;