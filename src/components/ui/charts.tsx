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
import React from 'react';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

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
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export const AreaChartGradient = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Gradient</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
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
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const barChart_chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];
const barChart_chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;
export function BarChartHorizontal() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Horizontal</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barChart_chartConfig}>
          <BarChart
            accessibilityLayer
            data={barChart_chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
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

export const PieChart = ({
  data,
  category,
  index,
  colors = DEFAULT_COLORS,
  title,
  description,
  className,
  headerClassName,
  contentClassName,
  showLegend = true,
  showTooltip = true,
  innerRadius = 60,
  outerRadius = 100,
  label = true,
  labelType = 'value',
  tickFormatter,
}: PieChartProps) => {
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
            <RechartsPieChart>
              <Pie
                data={data}
                dataKey={category}
                nameKey={index}
                cx="50%"
                cy="50%"
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                paddingAngle={2}
                label={
                  label
                    ? {
                        formatter: (value, name, props) => {
                          if (labelType === 'percent') {
                            const total = data.reduce(
                              (sum, item) => sum + item[category],
                              0,
                            );
                            const percentage = (
                              (props.payload[category] / total) *
                              100
                            ).toFixed(1);
                            return `${percentage}%`;
                          }
                          if (labelType === 'name') return name;
                          return tickFormatter
                            ? tickFormatter(props.payload[category])
                            : props.payload[category];
                        },
                        fontSize: 12,
                      }
                    : false
                }
              >
                {data.map((_, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={colors[idx % colors.length]}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
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
                  formatter={(value, name, props) => {
                    const formattedValue = tickFormatter
                      ? tickFormatter(value)
                      : value;
                    return [formattedValue, name];
                  }}
                />
              )}
              {showLegend && (
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{
                    paddingLeft: '24px',
                  }}
                  formatter={(value) => (
                    <span className="text-sm text-muted-foreground">
                      {value}
                    </span>
                  )}
                />
              )}
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
