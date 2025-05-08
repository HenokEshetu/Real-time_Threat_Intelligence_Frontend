import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import RegionOverview from './RegionOverview';

const tabList = [
  { value: 'overview', label: 'Overview' },
  { value: 'knowledge', label: 'Knowledge' },
  { value: 'content', label: 'Content' },
  { value: 'analysis', label: 'Analysis' },
  { value: 'sightings', label: 'Sightings' },
  { value: 'data', label: 'Data' },
  { value: 'history', label: 'History' },
];

export default function RegionDetailPage() {
  const { regionName } = useParams<{ regionName: string }>();
  const navigate = useNavigate();

  // You can fetch region data here if needed

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            className="flex items-center gap-2 text-blue-400 hover:text-blue-200 font-semibold"
            onClick={() => navigate('/location/regions')}
          >
            <ArrowLeft className="w-5 h-5" /> Back to Regions
          </button>
          <h1 className="text-3xl font-bold tracking-tight">
            {regionName}
          </h1>
        </div>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex gap-2 mb-6 bg-transparent">
            {tabList.map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="uppercase font-normal tracking-wider text-[14px] px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-400 hover:text-blue-400"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="overview">
            <RegionOverview regionName={regionName} />
          </TabsContent>
          <TabsContent value="knowledge">
            <div className="p-8 text-zinc-400">No knowledge content yet.</div>
          </TabsContent>
          <TabsContent value="content">
            <div className="p-8 text-zinc-400">No content yet.</div>
          </TabsContent>
          <TabsContent value="analysis">
            <div className="p-8 text-zinc-400">No analysis yet.</div>
          </TabsContent>
          <TabsContent value="sightings">
            <div className="p-8 text-zinc-400">No sightings yet.</div>
          </TabsContent>
          <TabsContent value="data">
            <div className="p-8 text-zinc-400">No data yet.</div>
          </TabsContent>
          <TabsContent value="history">
            <div className="p-8 text-zinc-400">No history yet.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
