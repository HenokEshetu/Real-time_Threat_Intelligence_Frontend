import axios, { AxiosResponse } from 'axios';
import {
  Location,
  CreateLocationInput,
  UpdateLocationInput,
  SearchLocationInput,
  LocationSearchResult,
} from '../types/location';
import { gql } from '@apollo/client';

const API_BASE = '/api/location';

export const fetchLocations = (params: SearchLocationInput = {}) =>
  axios.get<LocationSearchResult>(API_BASE, { params }).then((res: AxiosResponse<LocationSearchResult>) => res.data);

export const fetchLocation = (id: string) =>
  axios.get<Location>(`${API_BASE}/${id}`).then((res: AxiosResponse<Location>) => res.data);

export const createLocation = (input: CreateLocationInput) =>
  axios.post<Location>(API_BASE, input).then((res: AxiosResponse<Location>) => res.data);

export const updateLocation = (id: string, input: UpdateLocationInput) =>
  axios.put<Location>(`${API_BASE}/${id}`, input).then((res: AxiosResponse<Location>) => res.data);

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
      external_references { /* ...fields... */ }
      labels
      lang
      relationship { /* ...fields... */ }
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
    createLocation(createLocationInput: $input) {
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
    updateLocation(id: $id, updateLocationInput: $input) {
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
