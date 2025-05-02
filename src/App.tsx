import React from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';

import { ApolloProvider } from '@apollo/client';
import { theme } from './theme';
import { client } from './lib/apollo';
import { Layout } from './components/layout/Layout';
import { AppRoutes } from './routes'; // Import your routes

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <AppRoutes />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
