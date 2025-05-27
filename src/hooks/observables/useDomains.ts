import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_DOMAIN_OBSERVABLES,
  GET_DOMAIN_NAME,
  DOMAIN_NAMES_BY_VALUE,
  CREATE_DOMAIN_NAME,
  UPDATE_DOMAIN_NAME,
  DELETE_DOMAIN_NAME,
  DOMAIN_NAME_CREATED_SUBSCRIPTION,
  DOMAIN_NAME_UPDATED_SUBSCRIPTION,
  DOMAIN_NAME_DELETED_SUBSCRIPTION,
} from '../../graphql/observables/domain';
import {
  DomainName,
  DomainNameSearchResult,
} from '../../types/observables/domain';
import { useEffect } from 'react';

export const useDomains = ({
  filter,
  page,
  pageSize,
}: {
  filter?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery<{
    searchDomainNames: DomainNameSearchResult;
  }>(SEARCH_DOMAIN_OBSERVABLES, {
    variables: {
      filter: filter,
      page: page,
      pageSize: pageSize,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const unsubCreate = subscribeToMore({
      document: DOMAIN_NAME_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.domainNameCreated;
        if (!newItem) return prev;
        if (
          prev.searchDomainNames.results.some(
            (d: DomainName) => d.id === newItem.id,
          )
        ) {
          return prev;
        }
        return {
          ...prev,
          searchDomainNames: {
            ...prev.searchDomainNames,
            results: [newItem, ...prev.searchDomainNames.results].slice(
              0,
              pageSize,
            ),
            total: prev.searchDomainNames.total + 1,
          },
        };
      },
    });

    const unsubUpdate = subscribeToMore({
      document: DOMAIN_NAME_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.domainNameUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchDomainNames: {
            ...prev.searchDomainNames,
            results: prev.searchDomainNames.results.map((d: DomainName) =>
              d.id === updated.id ? { ...d, ...updated } : d,
            ),
          },
        };
      },
    });

    const unsubDelete = subscribeToMore({
      document: DOMAIN_NAME_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.domainNameDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchDomainNames: {
            ...prev.searchDomainNames,
            results: prev.searchDomainNames.results.filter(
              (d: DomainName) => d.id !== deletedId,
            ),
            total: prev.searchDomainNames.total - 1,
          },
        };
      },
    });

    return () => {
      unsubCreate();
      unsubUpdate();
      unsubDelete();
    };
  }, [subscribeToMore, pageSize]);

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
  const [createDomainName, { data, loading, error }] =
    useMutation(CREATE_DOMAIN_NAME);
  return {
    createDomainName,
    createdDomainName: data?.createDomainName,
    loading,
    error,
  };
};

export const useUpdateDomainName = () => {
  const [updateDomainName, { data, loading, error }] =
    useMutation(UPDATE_DOMAIN_NAME);
  return {
    updateDomainName,
    updatedDomainName: data?.updateDomainName,
    loading,
    error,
  };
};

export const useDeleteDomainName = () => {
  const [deleteDomainName, { data, loading, error }] =
    useMutation(DELETE_DOMAIN_NAME);
  return {
    deleteDomainName,
    deleted: data?.deleteDomainName,
    loading,
    error,
  };
};
