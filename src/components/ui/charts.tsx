// components/ui/charts.tsx
'use client';

import {
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Bar,
  Pie,
  Cell,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  RadialBarChart,
  PolarGrid,
  RadialBar,
  PieChart,
  Label,
  Sector,
  LineChart,
  Line,
  LabelList,
} from 'recharts';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import React, { useState } from 'react';

import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

const DEFAULT_COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#06b6d4', // cyan-500
  '#ec4899', // pink-500
  '#14b8a6', // teal-500
];

type BarChartProps = {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  title?: string | React.ReactNode;
  description?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  autoMinValue?: boolean;
  tickFormatter?: (value: any) => string;
};

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Intrusion Set',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Campaign',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export const AreaChartGradient = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign and Intrusion Set Distribution</CardTitle>
        <CardDescription>
          Showing campaigns and Intrusion Set for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export const barchartInteractive = {
  object: 'malware',
  enterprise: 186,
  ics: 305,
  mobile: 80,
};

const barChartInteractive_chartConfig = {
  entities: {
    label: 'Entities Founded',
  },
  enterprise: {
    label: 'Enterprise',
    color: 'hsl(var(--chart-1))',
  },
  ics: {
    label: 'ICS',
    color: 'hsl(var(--chart-4))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;
export const BarChartInteractive = ({
  className,
  title,
  titleDescription,
  chartData,
}: {
  className?: string;
  title: string;
  titleDescription: string;
  chartData: (typeof barchartInteractive)[];
}) => {
  const [activeChart, setActiveChart] =
    useState<keyof typeof barChartInteractive_chartConfig>('enterprise');
  const total = React.useMemo(
    () => ({
      enterprise: chartData.reduce((acc, curr) => acc + curr.enterprise, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
      ics: chartData.reduce((acc, curr) => acc + curr.ics, 0),
    }),
    [],
  );
  return (
    <Card className={`${className}`}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{titleDescription}</CardDescription>
        </div>
        <div className="flex">
          {['enterprise', 'ics', 'mobile'].map((key) => {
            const chart = key as keyof typeof barChartInteractive_chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {barChartInteractive_chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={barChartInteractive_chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="object"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value;
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="entities"
                  labelFormatter={(value) => {
                    return value;
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const lineChartCustomLabel_chartData = [
  { object: 'URLs', entities: 275, fill: 'var(--color-urls)' },
  { object: 'Domain Names', entities: 200, fill: 'var(--color-domain_names)' },
  {
    object: 'IPv4 Addresses',
    entities: 187,
    fill: 'var(--color-ipv4addresses)',
  },
  { object: 'Files', entities: 173, fill: 'var(--color-files)' },
  { object: 'Indicators', entities: 90, fill: 'var(--color-indicators)' },
];

export function LineChartCustomLabel({
  title,
  titleDescription,
  chartData,
}: {
  title: string;
  titleDescription: string;
  chartData: typeof lineChartCustomLabel_chartData;
}) {
  const lineChartCustomLabel_chartConfig = {
    entities: {
      label: 'Entities',
      color: 'hsl(var(--chart-2))',
    },
    urls: {
      label: 'URLs',
      color: 'hsl(var(--chart-1))',
    },
    domain_names: {
      label: 'Domain Names',
      color: 'hsl(var(--chart-2))',
    },
    ipv4_addresses: {
      label: 'IPv4 Addresses',
      color: 'hsl(var(--chart-3))',
    },
    files: {
      label: 'Files',
      color: 'hsl(var(--chart-4))',
    },
    indicators: {
      label: 'Indicators',
      color: 'hsl(var(--chart-5))',
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{titleDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={lineChartCustomLabel_chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="object"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="entities"
              type="natural"
              stroke="var(--color-entities)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-entities)',
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="object"
                formatter={(
                  value: keyof typeof lineChartCustomLabel_chartConfig,
                ) => lineChartCustomLabel_chartConfig[value]?.label}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}

export const barChart_chartData = { platform: 'Windows', entity: 186 };

export function BarChartHorizontal({
  title,
  titleDescription,
  label,
  chartData,
}: {
  title: string;
  titleDescription: string;
  label?: string;
  chartData?: (typeof barChart_chartData)[];
}) {
  const barChart_chartConfig = {
    entity: {
      label: label,
      color:
        label.toLocaleLowerCase() == 'malware'
          ? `hsl(var(--chart-5))`
          : `hsl(var(--chart-1))`,
    },
  } satisfies ChartConfig;
  const BAR_SIZE = 7;
  const GAP = 6;
  const chartHeight = (BAR_SIZE + GAP) * chartData.length + 40;

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{titleDescription}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <ChartContainer className="h-full w-full" config={barChart_chartConfig}>
          <BarChart
            layout="vertical"
            data={chartData}
            barSize={BAR_SIZE}
            barCategoryGap={GAP}
            height={chartHeight}
            margin={{ left: 0, right: 20 }}
          >
            <XAxis type="number" dataKey="entity" hide />
            <YAxis
              dataKey="platform"
              type="category"
              width={160}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="entity" fill="var(--color-entity)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export const BarChartVertical = ({
  data,
  index,
  categories,
  colors = DEFAULT_COLORS,
  title,
  description,
  className,
  headerClassName,
  contentClassName,
  showLegend = true,
  showTooltip = true,
  showGrid = true,
  autoMinValue = false,
  tickFormatter,
}: BarChartProps) => {
  return (
    <Card className={cn('w-full', className)}>
      {(title || description) && (
        <CardHeader className={cn('pb-2', headerClassName)}>
          {title && (
            <CardTitle className="text-lg flex items-center gap-2">
              {title}
            </CardTitle>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
      )}
      <CardContent className={cn('p-6', contentClassName)}>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data}>
              {showGrid && (
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              )}
              <XAxis
                dataKey={index}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={tickFormatter}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={tickFormatter}
                domain={autoMinValue ? [0, 'auto'] : undefined}
              />
              {showTooltip && (
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'calc(var(--radius) - 2px)',
                    boxShadow: 'var(--tw-shadow)',
                  }}
                  itemStyle={{
                    color: 'hsl(var(--foreground))',
                  }}
                />
              )}
              {showLegend && (
                <Legend
                  wrapperStyle={{
                    paddingTop: '20px',
                  }}
                />
              )}
              {categories.map((category, idx) => (
                <Bar
                  key={category}
                  dataKey={category}
                  name={category}
                  fill={colors[idx % colors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

type PieChartProps = {
  data: any[];
  category: string;
  index: string;
  colors?: string[];
  title?: string | React.ReactNode;
  description?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  label?: boolean;
  labelType?: 'value' | 'percent' | 'name';
  tickFormatter?: (value: any) => string;
};

export const radial_chartData = {
  platform: 'Windows',
  tools: 275,
  fill: 'var(--color-windows)',
};

export function RadialChart({
  title,
  titleDescription,
  chartData,
}: {
  title: string;
  titleDescription: string;
  chartData: { platform: string; tools: number; fill?: string }[];
}) {
  const radial_chartConfig = {
    tools: {
      label: 'Tools',
    },
    windows: {
      label: 'Windows',
      color: 'hsl(var(--chart-1))',
    },
    macos: {
      label: 'macOS',
      color: 'hsl(var(--chart-2))',
    },
    linux: {
      label: 'Linux',
      color: 'hsl(var(--chart-3))',
    },
    office_suite: {
      label: 'Office Suite',
      color: 'hsl(var(--chart-4))',
    },
    saas: {
      label: 'SaaS',
      color: 'hsl(var(--chart-5))',
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{titleDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={radial_chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={100}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="platform" />}
            />
            <PolarGrid gridType="circle" />
            <RadialBar dataKey="tools" />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
}

const pieChart_chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 287, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 190, fill: 'var(--color-other)' },
];
const pieChat_chartConfig = {
  visitors: {
    label: 'Reports',
  },
  chrome: {
    label: 'Indicator',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Malware',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'URLs',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Campaign',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;
export function PieChartDonut() {
  const totalVisitors = React.useMemo(() => {
    return pieChart_chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Report to Threat Distribution</CardTitle>
        <CardDescription>
          The total Report Distribution accross different threats
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={pieChat_chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieChart_chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Reports
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
}
