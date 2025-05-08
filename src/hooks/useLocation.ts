import { useQuery, useMutation } from '@apollo/client';
import {
  Location,
  CreateLocationInput,
  UpdateLocationInput,
  SearchLocationInput,
} from '../types/location';
import {
  GET_LOCATION,
  SEARCH_LOCATIONS,
  CREATE_LOCATION,
  UPDATE_LOCATION,
} from '../queries/location';

export const useLocationList = (filters: SearchLocationInput = {}, page = 1, pageSize = 10) =>
  useQuery(SEARCH_LOCATIONS, {
    variables: { filters, page, pageSize },
  });

export const useLocationDetail = (id: string) =>
  useQuery(GET_LOCATION, {
    variables: { id },
    skip: !id,
  });

export const useCreateLocation = () =>
  useMutation(CREATE_LOCATION, {
    refetchQueries: [{ query: SEARCH_LOCATIONS }],
  });

export const useUpdateLocation = () =>
  useMutation(UPDATE_LOCATION, {
    refetchQueries: [{ query: SEARCH_LOCATIONS }],
  });
