// components/ui/charts.tsx
'use client';

import {
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import React from 'react';

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

export const BarChart = ({
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
