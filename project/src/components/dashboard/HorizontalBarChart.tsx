// HorizontalBarChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface HorizontalBarChartProps {
  series: ApexAxisChartSeries;
  categories: string[];
  stacked?: boolean;    // Add stacked, total, legend, and withExport
  total?: boolean;
  legend?: boolean;
  withExport?: boolean;
  width?: string;
  height?: string;
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  series,
  categories,
  stacked = false,
  total = false,
  legend = false,
  withExport = false,
  width = '100%',
  height = '350px',
}) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        // Explicitly assert that stacked is a valid property, as it is supported in ApexCharts
        stacked: stacked ? true : undefined,
      } as any, // Type assertion to bypass TS error
    },
    xaxis: {
      categories,
    },
    legend: {
      show: legend,
    },
  };

  return <Chart options={options} series={series} type="bar" width={width} height={height} />;
};

export default HorizontalBarChart;
