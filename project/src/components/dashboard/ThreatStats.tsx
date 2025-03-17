import { Grid, Paper, Typography, Box } from '@mui/material';
import { Security, Warning, BugReport, Shield } from '@mui/icons-material';
import React from 'react';

const stats = [
  {
    title: 'Active Threats',
    value: 47,
    icon: Security,
    color: '#FF6B6B',
  },
  {
    title: 'Recent Incidents',
    value: 12,
    icon: Warning,
    color: '#4ECDC4',
  },
  {
    title: 'Malware Detected',
    value: 28,
    icon: BugReport,
    color: '#45B7D1',
  },
  {
    title: 'Mitigations Applied',
    value: 156,
    icon: Shield,
    color: '#96CEB4',
  },
];

export const ThreatStats = ({ data }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Threat Statistics
      </Typography>
      <Typography variant="body1">
        Total Threats: {data.totalThreats}
      </Typography>
      <Typography variant="body1">
        Active Threats: {data.activeThreats}
      </Typography>
      <Typography variant="body1">
        Resolved Threats: {data.resolvedThreats}
      </Typography>
    </Paper>
  );
};