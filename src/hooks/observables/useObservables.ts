import { useQuery } from '@apollo/client';
import {
  SEARCH_FILE_OBSERVABLES,
  FILE_CREATED_SUBSCRIPTION,
  FILE_UPDATED_SUBSCRIPTION,
  FILE_DELETED_SUBSCRIPTION,
} from '../../graphql/observables/file';
import {
  SEARCH_IPv4_OBSERVABLES,
  IPV4_CREATED_SUBSCRIPTION,
  IPV4_UPDATED_SUBSCRIPTION,
  IPV4_DELETED_SUBSCRIPTION,
} from '../../graphql/observables/ipv4';
import {
  SEARCH_DOMAIN_OBSERVABLES,
  DOMAIN_NAME_CREATED_SUBSCRIPTION,
  DOMAIN_NAME_UPDATED_SUBSCRIPTION,
  DOMAIN_NAME_DELETED_SUBSCRIPTION,
} from '../../graphql/observables/domain';
import {
  SEARCH_URL_OBSERVABLES,
  URL_CREATED_SUBSCRIPTION,
  URL_UPDATED_SUBSCRIPTION,
  URL_DELETED_SUBSCRIPTION,
} from '../../graphql/observables/url';
import { useEffect } from 'react';

export const useObservables = ({
  fileFilter = {},
  ipv4Filter = {},
  domainFilter = {},
  urlFilter = {},
  page = 1,
  pageSize = 20,
} = {}) => {
  // Files
  const {
    data: fileData,
    loading: fileLoading,
    error: fileError,
    subscribeToMore: subscribeToMoreFiles,
  } = useQuery(SEARCH_FILE_OBSERVABLES, {
    variables: {
      filter: fileFilter,
      from: (page - 1) * pageSize,
      size: pageSize,
    },
    notifyOnNetworkStatusChange: true,
  });

  // IPv4
  const {
    data: ipv4Data,
    loading: ipv4Loading,
    error: ipv4Error,
    subscribeToMore: subscribeToMoreIPv4,
  } = useQuery(SEARCH_IPv4_OBSERVABLES, {
    variables: { filter: ipv4Filter, page, pageSize },
    notifyOnNetworkStatusChange: true,
  });

  // Domain Names
  const {
    data: domainData,
    loading: domainLoading,
    error: domainError,
    subscribeToMore: subscribeToMoreDomain,
  } = useQuery(SEARCH_DOMAIN_OBSERVABLES, {
    variables: { filter: domainFilter, page, pageSize },
    notifyOnNetworkStatusChange: true,
  });

  // URLs
  const {
    data: urlData,
    loading: urlLoading,
    error: urlError,
    subscribeToMore: subscribeToMoreUrl,
  } = useQuery(SEARCH_URL_OBSERVABLES, {
    variables: { filter: urlFilter, page, pageSize },
    notifyOnNetworkStatusChange: true,
  });

  // Subscriptions for real-time updates
  useEffect(() => {
    // Files
    const unsubFileCreate = subscribeToMoreFiles({
      document: FILE_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.fileCreated;
        if (!newItem) return prev;
        if (prev.searchFiles.results.some((f: any) => f.id === newItem.id)) {
          return prev;
        }
        return {
          ...prev,
          searchFiles: {
            ...prev.searchFiles,
            results: [newItem, ...prev.searchFiles.results].slice(0, pageSize),
            total: prev.searchFiles.total + 1,
          },
        };
      },
    });
    const unsubFileUpdate = subscribeToMoreFiles({
      document: FILE_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.fileUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchFiles: {
            ...prev.searchFiles,
            results: prev.searchFiles.results.map((f: any) =>
              f.id === updated.id ? { ...f, ...updated } : f,
            ),
          },
        };
      },
    });
    const unsubFileDelete = subscribeToMoreFiles({
      document: FILE_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.fileDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchFiles: {
            ...prev.searchFiles,
            results: prev.searchFiles.results.filter(
              (f: any) => f.id !== deletedId,
            ),
            total: prev.searchFiles.total - 1,
          },
        };
      },
    });

    // IPv4
    const unsubIPv4Create = subscribeToMoreIPv4({
      document: IPV4_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.ipv4AddressCreated;
        if (!newItem) return prev;
        if (
          prev.searchIPv4Addresses.results.some((i: any) => i.id === newItem.id)
        ) {
          return prev;
        }
        return {
          ...prev,
          searchIPv4Addresses: {
            ...prev.searchIPv4Addresses,
            results: [newItem, ...prev.searchIPv4Addresses.results].slice(
              0,
              pageSize,
            ),
            total: prev.searchIPv4Addresses.total + 1,
          },
        };
      },
    });
    const unsubIPv4Update = subscribeToMoreIPv4({
      document: IPV4_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.ipv4AddressUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchIPv4Addresses: {
            ...prev.searchIPv4Addresses,
            results: prev.searchIPv4Addresses.results.map((i: any) =>
              i.id === updated.id ? { ...i, ...updated } : i,
            ),
          },
        };
      },
    });
    const unsubIPv4Delete = subscribeToMoreIPv4({
      document: IPV4_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.ipv4AddressDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchIPv4Addresses: {
            ...prev.searchIPv4Addresses,
            results: prev.searchIPv4Addresses.results.filter(
              (i: any) => i.id !== deletedId,
            ),
            total: prev.searchIPv4Addresses.total - 1,
          },
        };
      },
    });

    // Domain Names
    const unsubDomainCreate = subscribeToMoreDomain({
      document: DOMAIN_NAME_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.domainNameCreated;
        if (!newItem) return prev;
        if (
          prev.searchDomainNames.results.some((d: any) => d.id === newItem.id)
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
    const unsubDomainUpdate = subscribeToMoreDomain({
      document: DOMAIN_NAME_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.domainNameUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchDomainNames: {
            ...prev.searchDomainNames,
            results: prev.searchDomainNames.results.map((d: any) =>
              d.id === updated.id ? { ...d, ...updated } : d,
            ),
          },
        };
      },
    });
    const unsubDomainDelete = subscribeToMoreDomain({
      document: DOMAIN_NAME_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.domainNameDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchDomainNames: {
            ...prev.searchDomainNames,
            results: prev.searchDomainNames.results.filter(
              (d: any) => d.id !== deletedId,
            ),
            total: prev.searchDomainNames.total - 1,
          },
        };
      },
    });

    // URLs
    const unsubUrlCreate = subscribeToMoreUrl({
      document: URL_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.urlCreated;
        if (!newItem) return prev;
        if (prev.searchUrls.results.some((u: any) => u.id === newItem.id)) {
          return prev;
        }
        return {
          ...prev,
          searchUrls: {
            ...prev.searchUrls,
            results: [newItem, ...prev.searchUrls.results].slice(0, pageSize),
            total: prev.searchUrls.total + 1,
          },
        };
      },
    });
    const unsubUrlUpdate = subscribeToMoreUrl({
      document: URL_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.urlUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchUrls: {
            ...prev.searchUrls,
            results: prev.searchUrls.results.map((u: any) =>
              u.id === updated.id ? { ...u, ...updated } : u,
            ),
          },
        };
      },
    });
    const unsubUrlDelete = subscribeToMoreUrl({
      document: URL_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.urlDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchUrls: {
            ...prev.searchUrls,
            results: prev.searchUrls.results.filter(
              (u: any) => u.id !== deletedId,
            ),
            total: prev.searchUrls.total - 1,
          },
        };
      },
    });

    return () => {
      unsubFileCreate();
      unsubFileUpdate();
      unsubFileDelete();
      unsubIPv4Create();
      unsubIPv4Update();
      unsubIPv4Delete();
      unsubDomainCreate();
      unsubDomainUpdate();
      unsubDomainDelete();
      unsubUrlCreate();
      unsubUrlUpdate();
      unsubUrlDelete();
    };
  }, [
    subscribeToMoreFiles,
    subscribeToMoreIPv4,
    subscribeToMoreDomain,
    subscribeToMoreUrl,
    pageSize,
  ]);

  // Combine all observables into a single array
  const files = fileData?.searchFiles?.results || [];
  const ipv4s = ipv4Data?.searchIPv4Addresses?.results || [];
  const domains = domainData?.searchDomainNames?.results || [];
  const urls = urlData?.searchUrls?.results || [];

  const total =
    fileData?.searchFiles?.total +
    ipv4Data?.searchIPv4Addresses?.total +
    domainData?.searchDomainNames?.total +
    urlData?.searchUrls?.total;

  const allObservables = [
    ...files.map((o: any) => ({ ...o, observableType: 'file' })),
    ...ipv4s.map((o: any) => ({ ...o, observableType: 'ipv4' })),
    ...domains.map((o: any) => ({ ...o, observableType: 'domain' })),
    ...urls.map((o: any) => ({ ...o, observableType: 'url' })),
  ];

  return {
    files,
    ipv4s,
    domains,
    urls,
    allObservables,
    total,
    loading: fileLoading || ipv4Loading || domainLoading || urlLoading,
    error: fileError || ipv4Error || domainError || urlError,
  };
};
