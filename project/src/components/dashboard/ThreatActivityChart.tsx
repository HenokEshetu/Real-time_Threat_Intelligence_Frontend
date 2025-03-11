import { ResponsiveLine } from '@nivo/line';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const data = [
  {
    id: "Threats",
    data: [
      { x: "Jan", y: 45 },
      { x: "Feb", y: 32 },
      { x: "Mar", y: 58 },
      { x: "Apr", y: 42 },
      { x: "May", y: 65 },
      { x: "Jun", y: 47 }
    ]
  },
  {
    id: "Incidents",
    data: [
      { x: "Jan", y: 23 },
      { x: "Feb", y: 15 },
      { x: "Mar", y: 35 },
      { x: "Apr", y: 28 },
      { x: "May", y: 42 },
      { x: "Jun", y: 31 }
    ]
  }
];

export const ThreatActivityChart = () => {
  return (
    <Paper sx={{ p: 3, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Threat Activity Overview
      </Typography>
      <Box sx={{ height: 350 }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          enablePointLabel={true}
          pointLabel="y"
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.15}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 50,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              symbolSize: 12,
              symbolShape: 'circle',
            }
          ]}
        />
      </Box>
    </Paper>
  );
};