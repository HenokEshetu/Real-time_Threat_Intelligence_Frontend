import React from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';

import { ApolloProvider } from '@apollo/client';
import { theme } from './theme';
import { client } from './lib/apollo';
import { Layout } from './components/layout/Layout';
import { AppRoutes } from './routes'; // Import your routes
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <Layout>
              <AppRoutes />
            </Layout>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
