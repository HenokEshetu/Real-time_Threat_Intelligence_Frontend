import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material';
import { Warning, Error, Info } from '@mui/icons-material';
import { format } from 'date-fns';
import React from 'react';

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

export const RecentIncidents = ({ data }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Recent Incidents
      </Typography>
      <List>
        {data.map((incident) => (
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