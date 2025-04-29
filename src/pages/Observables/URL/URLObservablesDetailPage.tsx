import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { Loading } from '@/components/common/Loading/Loading';
import { useURL } from '@/hooks/observables/useURLs';
import { URL } from '@/types/observables/url';
import React from 'react';
import { useParams } from 'react-router-dom';

export const URLObservablesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { url, loading, error } = useURL(id);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!url) return <ErrorMessage message="URL not found" />;

  return (
    <>
      <p>{url.value}</p>
      <p>{url.created}</p>
      <p>{url.confidence}</p>
      <div>
        {url.labels.map((label) => (
          <p>{label}</p>
        ))}
      </div>
      <p>{url.object_marking_refs}</p>
    </>
  );
};
