import gql from 'graphql-tag';

export const CREATE_THREAT_ACTOR = gql`
  mutation CreateThreatActor($input: CreateThreatActorInput!) {
    createThreatActor(input: $input) {
      id
      type
      name
      description
      roles
      sophistication
      resource_level
      primary_motivation
      aliases
      labels
      first_seen
      last_seen
    }
  }
`;

export const UPDATE_THREAT_ACTOR = gql`
  mutation UpdateThreatActor($id: String!, $input: UpdateThreatActorInput!) {
    updateThreatActor(id: $id, input: $input) {
      id
      type
      name
      description
      roles
      sophistication
      resource_level
      primary_motivation
      aliases
      labels
      first_seen
      last_seen
    }
  }
`;

export const DELETE_THREAT_ACTOR = gql`
  mutation DeleteThreatActor($id: String!) {
    deleteThreatActor(id: $id)
  }
`;
