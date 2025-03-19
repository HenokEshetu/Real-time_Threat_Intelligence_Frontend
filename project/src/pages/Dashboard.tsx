import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { ThreatStats } from '../components/dashboard/ThreatStats';
import { ThreatActivityChart } from '../components/dashboard/ThreatActivityChart';
import { ThreatDistributionChart } from '../components/dashboard/ThreatDistributionChart';
import { RecentIncidents } from '../components/dashboard/RecentIncidents';
import GeographicalMap from '../components/dashboard/GeographicalMap'; // Default import
import PolarArea from '../components/dashboard/PolarArea'; // Default import
import { Security, Warning, BugReport, Shield } from '@mui/icons-material';
import { Incident } from '../components/dashboard/RecentIncidents'; // Import the Incident type

// Define the stats array here in Dashboard.tsx
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

const sampleThreatActivity = [
  { date: '2023-11-01', threats: 5 },
  { date: '2023-11-02', threats: 10 },
  { date: '2023-11-03', threats: 7 },
];

const sampleDistributionChart = [
  { id: '1', label: 'Malware', value: 35, color: '#ff0000' },
  { id: '2', label: 'Phishing', value: 25, color: '#00ff00' },
  { id: '3', label: 'Ransomware', value: 20, color: '#0000ff' },
  { id: '4', label: 'DDoS', value: 15, color: '#ff00ff' },
  { id: '5', label: 'Other', value: 5, color: '#ffff00' },
];

const samplePolarAreaData = [
  { label: 'Malware', value: 50 },
  { label: 'Phishing', value: 30 },
  { label: 'Ransomware', value: 40 },
  { label: 'Spam', value: 20 },
  { label: 'Spyware', value: 25 },
];

const sampleRecentIncidents: Incident[] = [
  {
    id: 'incident-1',
    title: 'Large-Scale Phishing Attack on Government Agencies',
    severity: 'high', // Must be 'high', 'medium', or 'low'
    timestamp: new Date('2023-11-01T10:30:00'),
  },
  {
    id: 'incident-2',
    title: 'Malware Infection through Software Updates',
    severity: 'medium',
    timestamp: new Date('2023-11-03T14:45:00'),
  },
  {
    id: 'incident-3',
    title: 'Ransomware Attack Targeting Sensitive Data',
    severity: 'high',
    timestamp: new Date('2023-11-05T09:00:00'),
  },
  {
    id: 'incident-4',
    title: 'DDoS Attack on Financial Institutions',
    severity: 'low',
    timestamp: new Date('2023-11-07T16:00:00'),
  },
  {
    id: 'incident-5',
    title: 'Social Engineering Attack to Steal Credentials',
    severity: 'medium',
    timestamp: new Date('2023-11-08T12:30:00'),
  },
];

const threatData = [
  { id: 'US', name: 'United States', value: 10, latitude: 37.0902, longitude: -95.7129 },
  { id: 'IN', name: 'India', value: 7, latitude: 20.5937, longitude: 78.9629 },
  { id: 'CN', name: 'China', value: 15, latitude: 35.8617, longitude: 104.1954 },
  { id: 'BR', name: 'Brazil', value: 5, latitude: -14.235, longitude: -51.9253 },
  { id: 'FR', name: 'France', value: 8, latitude: 46.2276, longitude: 2.2137 },
];

export const Dashboard = () => {
  const [error, setError] = useState<string | null>(null);

  const renderComponentWithErrorHandling = (component: React.ReactNode) => {
    try {
      return component;
    } catch (err) {
      console.error('Error rendering component:', err);
      setError('An error occurred while rendering the dashboard.');
      return (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" color="error">
            Something went wrong. Please try again later.
          </Typography>
        </Paper>
      );
    }
  };

  return (
    <Grid container spacing={3}>
      {error && (
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Paper>
        </Grid>
      )}

      <Grid item xs={12}>
        {renderComponentWithErrorHandling(<ThreatStats stats={stats} />)}
      </Grid>

      <Grid item xs={12} md={6}>
        {renderComponentWithErrorHandling(<ThreatActivityChart data={sampleThreatActivity} />)}
      </Grid>

      <Grid item xs={12} md={6}>
        {renderComponentWithErrorHandling(<ThreatDistributionChart data={sampleDistributionChart} />)}
      </Grid>

      <Grid item xs={12} md={6}>
        {renderComponentWithErrorHandling(<PolarArea data={samplePolarAreaData} groupBy="Threat Type" />)}
      </Grid>

      <Grid item xs={12} md={6}>
        {renderComponentWithErrorHandling(<RecentIncidents data={sampleRecentIncidents} />)}
      </Grid>

      <Grid item xs={12} md={6}>
        {renderComponentWithErrorHandling(<GeographicalMap data={threatData} />)}
      </Grid>
    </Grid>
  );
};
