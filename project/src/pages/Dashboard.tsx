import { Grid } from '@mui/material';
import { ThreatStats } from '../components/dashboard/ThreatStats';
import { ThreatActivityChart } from '../components/dashboard/ThreatActivityChart';
import { ThreatDistributionChart } from '../components/dashboard/ThreatDistributionChart';
import { RecentIncidents } from '../components/dashboard/RecentIncidents';
import React from 'react';

const sampleThreatStats = {
  totalThreats: 120,
  activeThreats: 45,
  resolvedThreats: 75,
};

const sampleThreatActivity = [
  { date: '2023-11-01', threats: 5 },
  { date: '2023-11-02', threats: 10 },
  { date: '2023-11-03', threats: 7 },
];

const sampleThreatDistribution = [
  { type: 'Malware', count: 50 },
  { type: 'Phishing', count: 30 },
  { type: 'Ransomware', count: 40 },
];

const sampleRecentIncidents = [
  {
    id: 1,
    title: 'Suspicious Network Activity Detected',
    severity: 'high',
    timestamp: new Date(2023, 11, 1, 14, 30),
  },
  {
    id: 2,
    title: 'Failed Login Attempts',
    severity: 'medium',
    timestamp: new Date(2023, 11, 1, 12, 15),
  },
  {
    id: 3,
    title: 'System Update Required',
    severity: 'low',
    timestamp: new Date(2023, 11, 1, 10, 45),
  },
];

export const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ThreatStats data={sampleThreatStats} />
      </Grid>
      
      <Grid item xs={12} md={8}>
        <ThreatActivityChart data={sampleThreatActivity} />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <ThreatDistributionChart data={sampleThreatDistribution} />
      </Grid>
      
      <Grid item xs={12}>
        <RecentIncidents data={sampleRecentIncidents} />
      </Grid>
    </Grid>
  );
};