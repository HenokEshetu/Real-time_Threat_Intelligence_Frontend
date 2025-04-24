import React from 'react';
import { useParams } from 'react-router-dom';
import { useIndicator } from '@/hooks/useIndicators';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IndicatorOverview } from '@/components/indicator/overview';

export const IndicatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { indicator, loading, error } = useIndicator(id || '');

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!indicator) return <ErrorMessage message="Indicator not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl font-semibold">
          {indicator.name.replace('Indicator: ', '')}
        </h1>
      </TopContainer>

      <Tabs defaultValue="overview" className="w-full">
        <TopContainer className="h-13 flex-start border-b border-gray-200 top-42">
          <TabsList className="flex gap-4 bg-transparent">
            {[
              'overview',
              'knowledge',
              'content',
              'analysis',
              'sightings',
              'data',
              'history',
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="uppercase font-normal border-b-1 tracking-wider text-[14px] text-forground relative py-6 transition-all rounded-none !shadow-none h-full w-full bg-transparent cursor-pointer data-[state=active]:border-b-1 data-[state=active]:border-b-violet-500 data-[state=active]:text-violet-500 hover:text-violet-500 hover:border-b-violet-500"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </TopContainer>

        <TabsContent value="overview">
          <IndicatorOverview indicator={indicator} />
        </TabsContent>
        <TabsContent value="knowledge">Knowledge content here</TabsContent>
        <TabsContent value="content">Content content here</TabsContent>
        <TabsContent value="analysis">Analysis content here</TabsContent>
        <TabsContent value="sightings">Sightings content here</TabsContent>
        <TabsContent value="data">Data content here</TabsContent>
        <TabsContent value="history">History content here</TabsContent>
      </Tabs>
    </div>
  );
};
