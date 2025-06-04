import React from 'react';

import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo';
import { Layout } from './components/layout/Layout';
import { AppRoutes } from './routes'; // Import your routes
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ThemeProvider } from './components/ui/theme-provider';
import { useAutoRefreshOnTokenExpire } from './lib/useAutoRefreshOnTokenExpire';

function App() {
  useAutoRefreshOnTokenExpire();

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>
            <AppRoutes />
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
