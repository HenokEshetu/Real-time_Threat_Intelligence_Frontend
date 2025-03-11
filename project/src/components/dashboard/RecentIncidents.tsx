import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material';
import { Warning, Error, Info } from '@mui/icons-material';
import { format } from 'date-fns';
import React from 'react';

const incidents = [
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

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'high':
      return <Error color="error" />;
    case 'medium':
      return <Warning color="warning" />;
    default:
      return <Info color="info" />;
  }
};

const getSeverityChip = (severity: string) => {
  return (
    <Chip
      label={severity.toUpperCase()}
      size="small"
      color={
        severity === 'high' ? 'error' :
        severity === 'medium' ? 'warning' : 'info'
      }
      sx={{ ml: 1 }}
    />
  );
};

export const RecentIncidents = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Recent Incidents
      </Typography>
      <List>
        {incidents.map((incident) => (
          <ListItem key={incident.id} divider>
            <ListItemIcon>
              {getSeverityIcon(incident.severity)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  {incident.title}
                  {getSeverityChip(incident.severity)}
                </Typography>
              }
              secondary={format(incident.timestamp, 'PPp')}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};