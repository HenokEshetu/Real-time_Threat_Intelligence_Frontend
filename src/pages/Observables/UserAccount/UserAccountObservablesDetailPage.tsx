import React from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import { UserAccountOverview } from '@/components/observables/useraccountoverview';
import { useUserAccount } from '@/hooks/observables/useUserAccount';

export const UserAccountObservablesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { account, loading, error } = useUserAccount(id);
  const tabs = {
    titles: [
      'overview',
      'knowledge',
      'activity',
      'history',
    ],
    comoponents: [
      <UserAccountOverview userAccount={account} />,
      <div>Knowledge content here</div>,
      <div>Activity content here</div>,
      <div>History content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!account) return <ErrorMessage message="User Account not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {account.account_login ||
            account.display_name ||
            account.user_id ||
            account.id}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
