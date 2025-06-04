import React from 'react';
import { TabsType, TopTab } from '@/components/common/TopTab';
import { ReportKnowledgeGraph } from './KnowledgeGraph';
import { KnowledgeTimeline } from './KnowledgeTimeline';
import { TacticsMatrixView } from './TacticsMatrixView';

export const ReportKnowledge = ({ report }: { report: any }) => {
  const tabs: TabsType = {
    titles: ['graph', 'timeline', 'matrix'],
    components: [
      <ReportKnowledgeGraph report={report} />,
      <KnowledgeTimeline report={report} />,
      <TacticsMatrixView report={report} />,
    ],
  };

  return (
    <div className="w-full">
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};

// For backward compatibility, export the graph as default if needed
export { ReportKnowledge as default };
