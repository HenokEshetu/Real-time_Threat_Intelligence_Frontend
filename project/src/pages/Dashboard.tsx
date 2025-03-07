import { Grid, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', threats: 4, incidents: 2 },
  { name: 'Feb', threats: 3, incidents: 1 },
  { name: 'Mar', threats: 6, incidents: 3 },
  { name: 'Apr', threats: 8, incidents: 4 },
  { name: 'May', threats: 5, incidents: 2 },
];

export const Dashboard = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Threat Activity Overview
            </Typography>
            <LineChart width={800} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="threats" stroke="#8884d8" />
              <Line type="monotone" dataKey="incidents" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};