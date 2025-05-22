import { gql } from '@apollo/client';

export const GET_LOCATION = gql`
  query GetLocation($id: String!) {
    getLocation(id: $id) {
      id
      name
      description
      type
      spec_version
      created
      modified
      confidence
      created_by_ref
      extensions
      external_references
      labels
      lang
      relationship
      revoked
      administrative_area
      city
      country
      latitude
      longitude
      postal_code
      precision
      region
      street_address
      default
    }
  }
`;

export const SEARCH_LOCATIONS = gql`
  query SearchLocations($filters: SearchLocationInput, $page: Float, $pageSize: Float) {
    searchLocations(filters: $filters, page: $page, pageSize: $pageSize) {
      id
      name
      type
      country
      city
      latitude
      longitude
    }
  }
`;

export const CREATE_LOCATION = gql`
  mutation CreateLocation($input: CreateLocationInput!) {
    createLocation(input: $input) {
      id
      name
      type
      country
      city
      latitude
      longitude
    }
  }
`;

export const UPDATE_LOCATION = gql`
  mutation UpdateLocation($id: String!, $input: UpdateLocationInput!) {
    updateLocation(id: $id, input: $input) {
      id
      name
      type
      country
      city
      latitude
      longitude
    }
  }
`;
