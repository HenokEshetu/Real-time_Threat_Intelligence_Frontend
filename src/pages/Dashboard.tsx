import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material'; // Material-UI components for layout and typography
import { ThreatStats } from '../components/dashboard/ThreatStats'; // Importing custom component to display threat statistics
import { ThreatDistributionChart } from '../components/dashboard/ThreatDistributionChart'; // Importing custom component to display threat distribution chart
import { RecentIncidents } from '../components/dashboard/RecentIncidents'; // Importing custom component to display recent incidents
import PolarArea from '../components/dashboard/PolarArea'; // Importing custom polar area chart component
import { Security, Warning, BugReport, Shield } from '@mui/icons-material'; // Icons from Material-UI for different stats
import { Incident } from '../components/dashboard/RecentIncidents'; // Importing the Incident type to define the incident data structure
import WidgetHorizontalBars from '../components/dashboard/HorizontalBarChart'; // Importing custom horizontal bar chart component
import WidgetMultiAreas from '../components/dashboard/WidgetMultiAreas';

// Import geographical map component
import LocationMiniMap from '../components/common/location/LocationMiniMap';

const sampleMultiAreaData = [
  {
    name: 'Malware',
    data: [
      { x: '2023-01-01', y: 40 },
      { x: '2023-02-01', y: 60 },
      { x: '2023-03-01', y: 80 },
      { x: '2023-04-01', y: 100 },
      { x: '2023-05-01', y: 120 },
      { x: '2023-06-01', y: 260 },
      { x: '2023-07-01', y: 240 },
      { x: '2023-08-01', y: 220 },
      { x: '2023-09-01', y: 200 },
      { x: '2023-10-01', y: 180 },
      { x: '2023-11-01', y: 160 },
      { x: '2023-12-01', y: 140 },
    ],
    color: '#FF0000',
  },
  {
    name: 'Phishing',
    data: [
      { x: '2023-01-01', y: 50 },
      { x: '2023-02-01', y: 70 },
      { x: '2023-03-01', y: 90 },
      { x: '2023-04-01', y: 110 },
      { x: '2023-05-01', y: 130 },
      { x: '2023-06-01', y: 270 },
      { x: '2023-07-01', y: 250 },
      { x: '2023-08-01', y: 230 },
      { x: '2023-09-01', y: 210 },
      { x: '2023-10-01', y: 190 },
      { x: '2023-11-01', y: 170 },
      { x: '2023-12-01', y: 150 },
    ],
    color: '#00FF00',
  },
  {
    name: 'Ransomware',
    data: [
      { x: '2023-01-01', y: 30 },
      { x: '2023-02-01', y: 50 },
      { x: '2023-03-01', y: 70 },
      { x: '2023-04-01', y: 90 },
      { x: '2023-05-01', y: 110 },
      { x: '2023-06-01', y: 250 },
      { x: '2023-07-01', y: 230 },
      { x: '2023-08-01', y: 210 },
      { x: '2023-09-01', y: 190 },
      { x: '2023-10-01', y: 170 },
      { x: '2023-11-01', y: 150 },
      { x: '2023-12-01', y: 130 },
    ],
    color: '#0000FF',
  },
  {
    name: 'DDoS',
    data: [
      { x: '2023-01-01', y: 20 },
      { x: '2023-02-01', y: 40 },
      { x: '2023-03-01', y: 60 },
      { x: '2023-04-01', y: 80 },
      { x: '2023-05-01', y: 100 },
      { x: '2023-06-01', y: 240 },
      { x: '2023-07-01', y: 220 },
      { x: '2023-08-01', y: 200 },
      { x: '2023-09-01', y: 180 },
      { x: '2023-10-01', y: 160 },
      { x: '2023-11-01', y: 140 },
      { x: '2023-12-01', y: 120 },
    ],
    color: '#FFFF00',
  },
  {
    name: 'SQL Injection',
    data: [
      { x: '2023-01-01', y: 10 },
      { x: '2023-02-01', y: 50 },
      { x: '2023-03-01', y: 70 },
      { x: '2023-04-01', y: 90 },
      { x: '2023-05-01', y: 90 },
      { x: '2023-06-01', y: 230 },
      { x: '2023-07-01', y: 240 },
      { x: '2023-08-01', y: 190 },
      { x: '2023-09-01', y: 170 },
      { x: '2023-10-01', y: 150 },
      { x: '2023-11-01', y: 130 },
      { x: '2023-12-01', y: 110 },
    ],
    color: '#FF00FF',
  },
  {
    name: 'Insider Threat',
    data: [
      { x: '2023-01-01', y: 5 },
      { x: '2023-02-01', y: 20 },
      { x: '2023-03-01', y: 30 },
      { x: '2023-04-01', y: 40 },
      { x: '2023-05-01', y: 50 },
      { x: '2023-06-01', y: 60 },
      { x: '2023-07-01', y: 70 },
      { x: '2023-08-01', y: 80 },
      { x: '2023-09-01', y: 90 },
      { x: '2023-10-01', y: 100 },
      { x: '2023-11-01', y: 110 },
      { x: '2023-12-01', y: 120 },
    ],
    color: '#00FFFF',
  },
];
export default sampleMultiAreaData;

// Sample data for horizontal bar chart
const sampleHorizontalBarData = [
  {
    name: 'Malware',
    data: [45],
  },
  {
    name: 'Phishing',
    data: [30],
  },
  {
    name: 'Ransomware',
    data: [25],
  },
  {
    name: 'DDoS',
    data: [20],
  },
  {
    name: 'Spyware',
    data: [15],
  },
];

// Sample categories for horizontal bar chart
const sampleCategories = ['Threat Types'];

// Stats for the dashboard displayed in widgets
const stats = [
  {
    title: 'Active Threats',
    value: 47,
    icon: Security, // Icon for Active Threats stat
    color: '#FF6B6B', // Color for Active Threats stat
  },
  {
    title: 'Recent Incidents',
    value: 12,
    icon: Warning, // Icon for Recent Incidents stat
    color: '#4ECDC4', // Color for Recent Incidents stat
  },
  {
    title: 'Malware Detected',
    value: 28,
    icon: BugReport, // Icon for Malware Detected stat
    color: '#45B7D1', // Color for Malware Detected stat
  },
  {
    title: 'Mitigations Applied',
    value: 156,
    icon: Shield, // Icon for Mitigations Applied stat
    color: '#96CEB4', // Color for Mitigations Applied stat
  },
];

// Sample threat activity data (used in ThreatActivityChart)
const sampleThreatActivity = [
  { date: '2023-11-01', threats: 5 },
  { date: '2023-11-02', threats: 10 },
  { date: '2023-11-03', threats: 7 },
];

// Sample data for threat distribution chart (used in ThreatDistributionChart)
const sampleDistributionChart = [
  { id: '1', label: 'Malware', value: 35, color: '#ff0000' },
  { id: '2', label: 'Phishing', value: 25, color: '#00ff00' },
  { id: '3', label: 'Ransomware', value: 20, color: '#0000ff' },
  { id: '4', label: 'DDoS', value: 15, color: '#ff00ff' },
  { id: '5', label: 'Other', value: 5, color: '#ffff00' },
];

// Sample data for polar area chart (used in PolarArea)
const samplePolarAreaData = [
  { label: 'Malware', value: 50 },
  { label: 'Phishing', value: 30 },
  { label: 'Ransomware', value: 40 },
  { label: 'Spam', value: 20 },
  { label: 'Spyware', value: 25 },
];

// Sample recent incidents data (used in RecentIncidents)
const sampleRecentIncidents: Incident[] = [
  {
    id: 'incident-1',
    title: 'Large-Scale Phishing Attack on Government Agencies',
    severity: 'high',
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

export const Dashboard = () => {
  const [error, setError] = useState<string | null>(null); // Error state to display if something goes wrong

  // A function to render components with error handling
  const renderComponentWithErrorHandling = (component: React.ReactNode) => {
    try {
      return component; // Try rendering the component
    } catch (err) {
      console.error('Error rendering component:', err);
      setError('An error occurred while rendering the dashboard.'); // Set error message on failure
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
      {/* Display error message if error exists */}
      {error && (
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Paper>
        </Grid>
      )}

      {/* Render ThreatStats component */}
      <Grid item xs={12}>
        {renderComponentWithErrorHandling(<ThreatStats stats={stats} />)}
      </Grid>

      {/* Render Threat Distribution Chart */}
      <Grid item xs={12} md={6}>
        {renderComponentWithErrorHandling(<ThreatDistributionChart data={sampleDistributionChart} />)}
      </Grid>
      
      <Grid item xs={12} md={6}>
  {renderComponentWithErrorHandling(
    <WidgetHorizontalBars
      series={sampleHorizontalBarData}
      categories={sampleCategories}
      total={true}
      legend={true}
      withExport={true}
    />
  )}
</Grid>

<Grid item xs={12} md={6}>
  {renderComponentWithErrorHandling(
    <WidgetMultiAreas
      series={sampleMultiAreaData}
      interval="month"
      isStacked={false}
      hasLegend={true}
      withExport={false}
      readonly={false}
    />
  )}
</Grid>


      {/* Render Geographical Map */}
      <Grid item xs={12} md={6}>
        {renderComponentWithErrorHandling(<LocationMiniMap />)}
      </Grid>



      {/* Render Recent Incidents */}
      <Grid item xs={12} md={7}>
        {renderComponentWithErrorHandling(<RecentIncidents data={sampleRecentIncidents} />)}
      </Grid>

      {/* Render Polar Area Chart */}
      <Grid item xs={12} md={5}>
        {renderComponentWithErrorHandling(<PolarArea data={samplePolarAreaData} groupBy="Threat Type" />)}
      </Grid>

    </Grid>
  );
};
