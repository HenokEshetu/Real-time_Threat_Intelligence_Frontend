import React from 'react';
import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Mock statistics data
const stats = [
  { label: 'CONNECTED WORKERS', value: 4 },
  { label: 'QUEUED BUNDLES', value: 0 },
  { label: 'BUNDLES PROCESSED', value: '0/s' },
  { label: 'READ OPERATIONS', value: '9.8/s' },
  { label: 'WRITE OPERATIONS', value: '1.2/s' },
  { label: 'TOTAL NUMBER OF DOCUMENTS', value: '102.14M' },
];

// Mock connectors data
const connectors = [
  {
    name: 'Abuse.ch URLhaus', type: 'Data import', trigger: 'NOT APPLICABLE', messages: 0, status: 'ACTIVE', modified: 'Apr 23, 2025, 9:52:45 AM'
  },
  {
    name: 'AbuseIPDB', type: 'Enrichment', trigger: 'MANUAL', messages: 0, status: 'ACTIVE', modified: 'Apr 23, 2025, 9:52:35 AM'
  },
  // ...add other connectors as needed...
];

const statusColor = (status: string) => status === 'ACTIVE' ? 'success' : 'default';
const triggerColor = (trigger: string) => {
  if (trigger === 'MANUAL') return 'error';
  if (trigger === 'AUTOMATIC') return 'success';
  return 'default';
};

const Ingestion: React.FC = () => (
  <Box p={3}>
    <Typography variant="h6" gutterBottom>Workers statistics</Typography>
    <Grid container spacing={2} mb={3}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={2} key={stat.label}>
          <Paper sx={{ p: 2, textAlign: 'center', background: '#181f2a' }}>
            <Typography variant="h4" color="primary">{stat.value}</Typography>
            <Typography variant="caption" color="textSecondary">{stat.label}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
    <Typography variant="h6" gutterBottom>Registered connectors</Typography>
    <TableContainer component={Paper} sx={{ background: '#181f2a' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>TYPE</TableCell>
            <TableCell>AUTOMATIC TRIGGER</TableCell>
            <TableCell>MESSAGES</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell>MODIFIED</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {connectors.map((row, idx) => (
            <TableRow key={row.name}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>
                <Chip label={row.trigger} size="small" color={triggerColor(row.trigger)} />
              </TableCell>
              <TableCell>{row.messages}</TableCell>
              <TableCell>
                <Chip label={row.status} size="small" color={statusColor(row.status)} />
              </TableCell>
              <TableCell>{row.modified}</TableCell>
              <TableCell>
                <IconButton size="small"><DeleteIcon fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default Ingestion;
