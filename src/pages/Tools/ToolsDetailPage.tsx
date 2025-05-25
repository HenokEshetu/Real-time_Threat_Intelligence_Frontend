import React from 'react';
import { useParams } from 'react-router-dom';
import { useTool } from '../../hooks/useTools';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import ToolDetail from '@/components/common/Tools/ToolDetail';

export const ToolsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { tool, loading, error } = useTool(id || '');

  const tabs = {
    titles: [
      'Detail',
      'Relationships',
      'Analysis'
    ],
    components: [
      <ToolDetail tool={tool} />,
      <div>Relationships content here</div>,
      <div>Analysis content here</div>,
      <div></div>,
      <div></div>,
      <div></div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!tool) return <ErrorMessage message="Tool not found" />;

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {tool.name}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
