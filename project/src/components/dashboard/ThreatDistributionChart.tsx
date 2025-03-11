import { ResponsivePie } from '@nivo/pie';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const data = [
  { id: 'Malware', value: 35, color: '#FF6B6B' },
  { id: 'Phishing', value: 25, color: '#4ECDC4' },
  { id: 'Ransomware', value: 20, color: '#45B7D1' },
  { id: 'DDoS', value: 15, color: '#96CEB4' },
  { id: 'Other', value: 5, color: '#FFEEAD' }
];

export const ThreatDistributionChart = () => {
  return (
    <Paper sx={{ p: 3, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Threat Distribution
      </Typography>
      <Box sx={{ height: 350 }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
            }
          ]}
        />
      </Box>
    </Paper>
  );
};