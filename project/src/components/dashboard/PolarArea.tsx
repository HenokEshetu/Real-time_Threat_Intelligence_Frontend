import React, { useEffect, useRef } from 'react';
import { Paper, Typography } from '@mui/material';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, RadialLinearScale } from 'chart.js';

// Register the necessary chart.js components
Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, RadialLinearScale);

interface DistributionQueryDataItem {
  label: string;
  value: number;
}

interface PolarAreaChartProps {
  data: DistributionQueryDataItem[];
  groupBy: string;
}

const PolarAreaChart: React.FC<PolarAreaChartProps> = ({ data, groupBy }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    // Clean up the previous chart instance if it exists to prevent memory leaks and reusing the canvas
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Create the new chart instance
        chartInstanceRef.current = new Chart(ctx, {
          type: 'polarArea',
          data: {
            labels: data.map(item => item.label),
            datasets: [{
              label: 'Distribution',
              data: data.map(item => item.value),
              backgroundColor: data.map((_, index) => {
                // Dynamically generate background colors to avoid hard-coding them
                const colors = [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                ];
                return colors[index % colors.length]; // Cycle through the colors
              }),
              borderColor: data.map((_, index) => {
                const colors = [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                ];
                return colors[index % colors.length]; // Cycle through the border colors
              }),
              borderWidth: 1,
            }],
          },
          options: {
            responsive: true,
            plugins: {
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                bodyColor: 'white',
              },
              legend: {
                position: 'bottom',
                labels: {
                  font: {
                    size: 14,
                  },
                },
              },
              title: {
                display: true,
                text: `Threat Distribution - ${groupBy}`,
                font: {
                  size: 16,
                },
              },
            },
            scales: {
              r: {
                beginAtZero: true,
                angleLines: {
                  display: true,
                  color: 'rgba(0, 0, 0, 0.1)',
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                  display: false,
                },
              },
            },
          },
        });
      }
    }

    // Cleanup chart when the component is unmounted or data is changed
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, groupBy]); // Re-create the chart if data or groupBy changes

  return (
    <Paper sx={{ p: 3, width: '50%', margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        {`Threat Distribution - ${groupBy}`}
      </Typography>
      <canvas ref={chartRef} width="200" height="200"></canvas> {/* Smaller canvas size */}
    </Paper>
  );
};

export default PolarAreaChart;
