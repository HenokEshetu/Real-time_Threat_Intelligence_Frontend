import { Grid, Paper, Typography, Box } from '@mui/material';
import { Security, Warning, BugReport, Shield } from '@mui/icons-material';
import React from 'react';

// Define the type for the stats prop
interface Stat {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

interface ThreatStatsProps {
  stats: Stat[];
}

export const ThreatStats: React.FC<ThreatStatsProps> = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: '50%',
                  backgroundColor: `${stat.color}20`,
                  mb: 2,
                }}
              >
                <Icon sx={{ fontSize: 40, color: stat.color }} />
              </Box>
              <Typography variant="h4" component="div" gutterBottom>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};
