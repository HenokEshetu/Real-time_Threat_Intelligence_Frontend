import gql from 'graphql-tag';

export const SEARCH_THREAT_ACTORS = gql`
  query SearchThreatActors($filters: SearchThreatActorInput, $page: Int, $pageSize: Int) {
    searchThreatActors(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
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
  }
`;

export const THREAT_ACTOR_QUERY = gql`
  query ThreatActor($id: String!) {
    threatActor(id: $id) {
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
