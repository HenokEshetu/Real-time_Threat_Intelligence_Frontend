import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TopContainer } from './TopContainer';

export interface TabsType {
  titles?: string[];
  comoponents?: React.ReactNode[];
}

export const TopTab = ({
  tabs,
  triggerStyle,
  listStyle,
  containerStyle,
}: {
  tabs?: TabsType;
  triggerStyle?: string;
  listStyle?: string;
  containerStyle?: string;
}) => {
  return (
    <Tabs defaultValue={tabs.titles[0]} className="w-full">
      <TopContainer
        className={`h-13 flex-start border-b border-gray-200 top-42 ${containerStyle}`}
      >
        <TabsList className={`flex gap-4 bg-transparent ${listStyle}`}>
          {tabs.titles?.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab}
              className={`uppercase font-normal border-b-1 tracking-wider text-[14px] text-forground relative py-6 transition-all rounded-none !shadow-none h-full w-full bg-transparent cursor-pointer data-[state=active]:border-b-1 data-[state=active]:border-b-violet-500 data-[state=active]:text-violet-500 hover:text-violet-500 hover:border-b-violet-500 ${triggerStyle}`}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </TopContainer>

      {tabs.comoponents?.map((component, i) => (
        <TabsContent key={i} value={tabs?.titles[i]}>
          {component}
        </TabsContent>
      ))}
    </Tabs>
  );
};
