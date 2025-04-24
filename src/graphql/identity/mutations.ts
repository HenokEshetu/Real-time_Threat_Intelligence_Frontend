import gql from 'graphql-tag';

export const CREATE_IDENTITY = gql`
  mutation CreateIdentity($input: CreateIdentityInput!) {
    createIdentity(input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_IDENTITY = gql`
  mutation UpdateIdentity($id: String!, $input: UpdateIdentityInput!) {
    updateIdentity(id: $id, input: $input) {
      id
      name
    }
  }
`;

export const DELETE_IDENTITY = gql`
  mutation DeleteIdentity($id: String!) {
    deleteIdentity(id: $id)
  }
`;
