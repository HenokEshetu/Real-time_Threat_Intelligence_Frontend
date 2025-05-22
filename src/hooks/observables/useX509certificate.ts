import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_X509CERTIFICATES,
  GET_X509CERTIFICATE,
  CREATE_X509CERTIFICATE,
  UPDATE_X509CERTIFICATE,
  DELETE_X509CERTIFICATE,
} from '@/graphql/observables/x509certificate';
import { X509CertificateSearchResult } from '@/types/observables/x509certificate';

export const useX509Certificates = ({
  filters = {},
  from = 0,
  size = 10,
}: {
  filters?: Record<string, any>;
  from?: number;
  size?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_X509CERTIFICATES, {
    variables: { filters, from, size },
    notifyOnNetworkStatusChange: true,
  });

  const certificates = data?.searchX509Certificates?.results || [];
  const total = data?.searchX509Certificates?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: { filters, from: from + size, size },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchX509Certificates: {
            ...fetchMoreResult.searchX509Certificates,
            results: [
              ...(prev?.searchX509Certificates?.results || []),
              ...(fetchMoreResult.searchX509Certificates?.results || []),
            ],
          },
        };
      },
    });
  };

  return {
    certificates,
    loading,
    error,
    loadMore,
    total,
    hasMore: certificates.length === size,
  };
};

export const useX509Certificate = (id: string) => {
  const { data, loading, error } = useQuery(GET_X509CERTIFICATE, { variables: { id } });
  return { certificate: data?.x509Certificate, loading, error };
};

export const useCreateX509Certificate = () => useMutation(CREATE_X509CERTIFICATE);
export const useUpdateX509Certificate = () => useMutation(UPDATE_X509CERTIFICATE);
export const useDeleteX509Certificate = () => useMutation(DELETE_X509CERTIFICATE);
