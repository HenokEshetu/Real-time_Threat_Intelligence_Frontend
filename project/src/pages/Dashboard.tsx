import { Grid } from '@mui/material';
import { ThreatStats } from '../components/dashboard/ThreatStats';
import { ThreatActivityChart } from '../components/dashboard/ThreatActivityChart';
import { ThreatDistributionChart } from '../components/dashboard/ThreatDistributionChart';
import { RecentIncidents } from '../components/dashboard/RecentIncidents';

export const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ThreatStats />
      </Grid>
      
      <Grid item xs={12} md={8}>
        <ThreatActivityChart />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <ThreatDistributionChart />
      </Grid>
      
      <Grid item xs={12}>
        <RecentIncidents />
      </Grid>
    </Grid>
  );
};