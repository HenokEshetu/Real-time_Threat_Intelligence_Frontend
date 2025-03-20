import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material';
import { Warning, Error, Info } from '@mui/icons-material';
import { format } from 'date-fns';
import React from 'react';

// Define and export the 'Incident' type so it can be used elsewhere
export interface Incident {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low'; // Restrict severity to specific string values
  timestamp: Date;
}

// Define the props for the component, including the 'data' prop
interface RecentIncidentsProps {
  data: Incident[]; // Expecting an array of Incident objects
}

const getSeverityIcon = (severity: 'high' | 'medium' | 'low') => {
  switch (severity) {
    case 'high':
      return <Error color="error" />;
    case 'medium':
      return <Warning color="warning" />;
    default:
      return <Info color="info" />;
  }
};

const getSeverityChip = (severity: 'high' | 'medium' | 'low') => {
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

// The 'RecentIncidents' component uses the defined types for props
export const RecentIncidents: React.FC<RecentIncidentsProps> = ({ data }) => {
  return (
    <Paper sx={{ p: 3, height: 550 }}>
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
                <div>
                  <Typography variant="body1">
                    {incident.title}
                    {getSeverityChip(incident.severity)}
                  </Typography>
                </div>
              }
              secondary={format(incident.timestamp, 'PPp')}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
