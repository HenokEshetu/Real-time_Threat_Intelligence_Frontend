import React from 'react';
import { useParams } from 'react-router-dom';
import { useEmailMessage } from '../../../hooks/observables/useEmailMessage';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import { EmailMessageOverview } from '@/components/observables/emailmessageoverview';

export const EmailMessageObservablesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { emailMessage, loading, error } = useEmailMessage(id || '');

  const tabs = {
    titles: [
      'Detail',
      'Relationships',
      'Content',
      'Entities',
      'Observables',
      'Data',
    ],
    components: [
      emailMessage ? <EmailMessageOverview emailMessage={emailMessage} /> : <div>No data</div>,
      <div>Relationships content here</div>,
      <div>Content/Analysis content here</div>,
      <div>Entities content here</div>,
      <div>Observables content here</div>,
      <div>Data content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!emailMessage) return <ErrorMessage message="Email message not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {emailMessage.subject || emailMessage.message_id || emailMessage.id}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
