import { TrendingUp } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import React from 'react';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export const Radarchart = ({
  title = 'Radar Chart - Dots',
  desc = 'Showing total visitors for the last 6 months',
  footer,
  data = [
    { feeling: 'Strongly Disagree', level: 186 },
    { feeling: 'Disagree', level: 305 },
    { feeling: 'Neutral', level: 237 },
    { feeling: 'Agree', level: 273 },
    { feeling: 'Strongly Agree', level: 209 },
  ],
}: {
  title: string;
  desc: string;
  footer: React.ReactNode;
  data: any[];
}) => {
  return (
    <Card className="shadow-none border-slate-300 bg-transparent">
      <CardHeader className="items-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-h-[250px]"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="feeling" />
            <PolarGrid />
            <Radar
              dataKey="level"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">{footer}</CardFooter>
    </Card>
  );
};
