import React from 'react';
import { useParams } from 'react-router-dom';
import { useCampaign } from '../../hooks/useCampaigns';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import CampaignDetail from '@/components/common/Campaigns/CampaignDetail';
import CampaignRelationship from '@/components/common/Campaigns/CampaignRelationship';

export const CampaignDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { campaign, loading, error } = useCampaign(id || '');

  const tabs = {
    titles: [
      'Detail',
      'Relationships',
      'Analysis'
    ],
    components: [
      <CampaignDetail />,
      <CampaignRelationship campaignId={id} />,
      <div>Analysis content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!campaign) return <ErrorMessage message="Campaign not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {campaign.name}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
