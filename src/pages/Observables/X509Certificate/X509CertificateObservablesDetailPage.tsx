import React from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import { X509CertificateOverview } from '@/components/observables/x509certificateoverview';
import { useX509Certificate } from '@/hooks/observables/useX509certificate';

export const X509CertificateObservablesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { certificate, loading, error } = useX509Certificate(id!);

  const tabs = {
    titles: [
      'overview',
      'knowledge',
      'content',
      'analysis',
      'sightings',
      'data',
      'history',
    ],
    components: [
      <X509CertificateOverview certificate={certificate} />,
      <div>Knowledge content here</div>,
      <div>Content content here</div>,
      <div>Analysis content here</div>,
      <div>Sightings content here</div>,
      <div>Data content here</div>,
      <div>History content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!certificate) return <ErrorMessage message="Certificate not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {certificate.subject || certificate.id}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
