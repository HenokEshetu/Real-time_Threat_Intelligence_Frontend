import { Grid, Paper, Typography, Box } from '@mui/material';
import { Security, Warning, BugReport, Shield } from '@mui/icons-material';

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

export const ThreatStats = () => {
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
        )
      })}
    </Grid>
  );
};