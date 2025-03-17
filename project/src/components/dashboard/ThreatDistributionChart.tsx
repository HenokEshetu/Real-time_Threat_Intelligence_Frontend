import { Paper, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import React from 'react';

export const ThreatDistributionChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.type),
    datasets: [
      {
        label: 'Threat Distribution',
        data: data.map(item => item.count),
        backgroundColor: [
          'rgba(255,99,132,0.2)',
          'rgba(54,162,235,0.2)',
          'rgba(255,206,86,0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54,162,235,1)',
          'rgba(255,206,86,1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Threat Distribution
      </Typography>
      <Pie data={chartData} />
    </Paper>
  );
};