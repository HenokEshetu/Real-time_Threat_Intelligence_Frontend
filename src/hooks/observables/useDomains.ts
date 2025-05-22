import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_DOMAIN_OBSERVABLES,
  GET_DOMAIN_NAME,
  DOMAIN_NAMES_BY_VALUE,
  CREATE_DOMAIN_NAME,
  UPDATE_DOMAIN_NAME,
  DELETE_DOMAIN_NAME,
} from '../../graphql/observables/domain';
import { DomainName, DomainNameSearchResult } from '../../types/observables/domain';

export const useDomains = ({
  filter,
  page,
  pageSize,
}: {
  filter?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery<{ searchDomainNames: DomainNameSearchResult }>(
    SEARCH_DOMAIN_OBSERVABLES,
    {
      variables: {
        filter: filter,
        page: page,
        pageSize: pageSize,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const domains = data?.searchDomainNames?.results || [];
  const total = data?.searchDomainNames?.total || 0;
  const totalPages = data?.searchDomainNames?.totalPages || 0;

  const loadMore = () => {
    if (page && pageSize && data?.searchDomainNames?.page < totalPages) {
      fetchMore({
        variables: {
          filter: filter,
          page: page + 1,
          pageSize: pageSize,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            searchDomainNames: {
              ...fetchMoreResult.searchDomainNames,
              results: [
                ...(prev?.searchDomainNames?.results || []),
                ...(fetchMoreResult.searchDomainNames.results || []),
              ],
            },
          };
        },
      });
    }
  };

  return {
    domains,
    loading,
    error,
    loadMore,
    total,
    hasMore: (data?.searchDomainNames?.page || 1) < totalPages,
  };
};

export const useDomainName = (id: string) => {
  const { data, loading, error } = useQuery(GET_DOMAIN_NAME, {
    variables: { id },
    skip: !id,
  });
  return {
    domainName: data?.domainName,
    loading,
    error,
  };
};

export const useDomainNamesByValue = (value: string) => {
  const { data, loading, error } = useQuery(DOMAIN_NAMES_BY_VALUE, {
    variables: { value },
    skip: !value,
  });
  return {
    domainNames: data?.domainNamesByValue || [],
    loading,
    error,
  };
};

export const useCreateDomainName = () => {
  const [createDomainName, { data, loading, error }] = useMutation(CREATE_DOMAIN_NAME);
  return {
    createDomainName,
    createdDomainName: data?.createDomainName,
    loading,
    error,
  };
};

export const useUpdateDomainName = () => {
  const [updateDomainName, { data, loading, error }] = useMutation(UPDATE_DOMAIN_NAME);
  return {
    updateDomainName,
    updatedDomainName: data?.updateDomainName,
    loading,
    error,
  };
};

export const useDeleteDomainName = () => {
  const [deleteDomainName, { data, loading, error }] = useMutation(DELETE_DOMAIN_NAME);
  return {
    deleteDomainName,
    deleted: data?.deleteDomainName,
    loading,
    error,
  };
};
