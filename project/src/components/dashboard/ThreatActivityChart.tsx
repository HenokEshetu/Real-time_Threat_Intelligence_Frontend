import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import React from 'react';

export const ThreatActivityChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Threats',
        data: data.map(item => item.threats),
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