import React, { useEffect, useRef } from 'react';
import { Paper, Typography } from '@mui/material';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  RadialLinearScale,
  PolarAreaController,
} from 'chart.js';

// Register the necessary chart.js components
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  RadialLinearScale,
  PolarAreaController
);

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
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Generate dynamic background colors for better visual appeal
        const dynamicColors = data.map(
          (_, index) =>
            `hsl(${(index * 360) / data.length}, 70%, 60%)`
        );

        chartInstanceRef.current = new Chart(ctx, {
          type: 'polarArea',
          data: {
            labels: data.map((item) => item.label),
            datasets: [
              {
                label: 'Distribution',
                data: data.map((item) => item.value),
                backgroundColor: dynamicColors,
                borderColor: dynamicColors.map((color) =>
                  color.replace('60%', '40%')
                ),
                borderWidth: 1,
                hoverBorderWidth: 2,
                hoverBorderColor: 'rgba(0, 0, 0, 0.8)',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // For better responsiveness
            plugins: {
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                bodyColor: 'white',
                callbacks: {
                  label: function (context) {
                    const label = context.label || '';
                    const value = context.raw as number;
                    return `${label}: ${value}`;
                  },
                },
              },
              legend: {
                position: 'bottom',
                labels: {
                  font: {
                    size: 14,
                  },
                  usePointStyle: true,
                  padding: 15,
                },
              },
              title: {
                display: true,
                text: `Threat Distribution - ${groupBy}`,
                font: {
                  size: 16,
                  weight: 'bold',
                },
                padding: {
                  top: 10,
                  bottom: 20,
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
                  display: true,
                  font: {
                    size: 12,
                  },
                  backdropColor: 'rgba(255, 255, 255, 0.8)',
                },
              },
            },
            animation: {
              animateRotate: true,
              animateScale: true,
              duration: 1000,
            },
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, groupBy]);

  return (
    <Paper
      sx={{
        p: 3,
        width: { xs: '100%', sm: '80%', md: '60%' },
        margin: '0 auto',
        height: { xs: 400, sm: 450 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: 'center',
        }}
      >
        {`Threat Distribution - ${groupBy}`}
      </Typography>
      <div style={{ width: '100%', height: '100%' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </Paper>
  );
};

export default PolarAreaChart;