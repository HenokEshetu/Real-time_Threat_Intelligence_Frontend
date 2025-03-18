import { Grid, Paper, Typography } from '@mui/material';
import { ThreatStats } from '../components/dashboard/ThreatStats';
import { ThreatActivityChart } from '../components/dashboard/ThreatActivityChart';
import { ThreatDistributionChart } from '../components/dashboard/ThreatDistributionChart';
import { RecentIncidents } from '../components/dashboard/RecentIncidents';
import GeographicalMap from '../components/dashboard/GeographicalMap';
import PolarArea from '../components/dashboard/PolarArea'; // Import the WidgetPolarArea component
import React, { useState } from 'react';

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
    id: "1",
    title: "Suspicious Network Activity Detected",
    severity: "high" as "high", // Explicitly defining as the expected type
    timestamp: new Date(2023, 11, 1, 14, 30),
  },
  {
    id: "2",
    title: "Failed Login Attempts",
    severity: "medium" as "medium", // Explicitly defining as the expected type
    timestamp: new Date(2023, 11, 1, 12, 15),
  },
  {
    id: "3",
    title: "System Update Required",
    severity: "low" as "low", // Explicitly defining as the expected type
    timestamp: new Date(2023, 11, 1, 10, 45),
  },
];

const samplePolarAreaData = [
  { label: 'Malware', value: 50 },
  { label: 'Phishing', value: 30 },
  { label: 'Ransomware', value: 40 },
  { label: 'Spam', value: 20 },
  { label: 'Spyware', value: 25 },
];

export const Dashboard = () => {
  const [error, setError] = useState<string | null>(null);

  // A helper function to handle errors for individual components
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
      <Grid item xs={12}>
        {renderComponentWithErrorHandling(<ThreatStats />)}
      </Grid>

      <Grid item xs={12} md={6}>
        {renderComponentWithErrorHandling(<ThreatActivityChart data={sampleThreatActivity} />)}
      </Grid>

      <Grid item xs={12} md={6}>
        {renderComponentWithErrorHandling(<ThreatDistributionChart  />)}
      </Grid>

      <Grid item xs={12} md={6}>
        {renderComponentWithErrorHandling(<PolarArea data={samplePolarAreaData} groupBy="Threat Type" />)}
      </Grid>

      <Grid item xs={12} md={6}>
        {renderComponentWithErrorHandling(<RecentIncidents data={sampleRecentIncidents} />)}
      </Grid>

      <Grid item xs={12} md={6}>
        {renderComponentWithErrorHandling(<GeographicalMap />)}
      </Grid>

      {/* Display the error message if an error occurred */}
      {error && (
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};
