import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import React from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// Define TypeScript interface for data prop
interface ThreatActivity {
  date: string;
  threats: number;
}

interface ThreatActivityChartProps {
  data: ThreatActivity[];
}

export const ThreatActivityChart: React.FC<ThreatActivityChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item: ThreatActivity) => item.date), // Explicit type annotation
    datasets: [
      {
        label: 'Threats',
        data: data.map((item: ThreatActivity) => item.threats), // Explicit type annotation
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Threat Activity
      </Typography>
      <Line data={chartData} />
    </Paper>
  );
};
