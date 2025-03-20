import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Box, Paper, Typography } from '@mui/material';

interface ThreatDistribution {
  id: string;
  value: number;
  color: string;
}

interface ThreatDistributionChartProps {
  data: ThreatDistribution[];
}

export const ThreatDistributionChart: React.FC<ThreatDistributionChartProps> = ({ data }) => {
  return (
    <Paper sx={{ p: 3, height: 575 }}>
      <Typography variant="h6" gutterBottom>
        Threat Distribution
      </Typography>
      <Box sx={{ height: 350 }}>
        <ResponsivePie
          data={data} // Use the passed data prop here
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
