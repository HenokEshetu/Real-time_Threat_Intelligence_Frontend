import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import { theme } from './theme';
import { client } from './lib/apollo';
import { Layout } from './components/layout/Layout';
import { ArtifactsPage } from './pages/Artifacts';
import { ArtifactDetailPage } from './pages/Artifacts/ArtifactDetailPage';
import { ArtifactCreatePage } from './pages/Artifacts/create';
import { ArtifactEditPage } from './pages/Artifacts/edit';
import { IndicatorsPage } from './pages/Indicators/IndicatorsPage';
import { IndicatorDetailPage } from './pages/Indicators/IndicatorDetailPage';
import { IndicatorCreatePage } from './pages/Indicators/IndicatorCreatePage';
import { IndicatorEditPage } from './pages/Indicators/IndicatorEditPage';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Router> */}
        <Layout>
          <Routes>
            <Route path="/" element={<IndicatorsPage />} />
            <Route path="/indicator/:id" element={<IndicatorDetailPage />} />
            <Route
              path="/indicators/create"
              element={<IndicatorCreatePage />}
            />
            <Route
              path="/indicators/:id/edit"
              element={<IndicatorEditPage />}
            />
            <Route path="*" element={<div>404 - Page Not Found</div>} />{' '}
            {/* Fallback route */}
          </Routes>
        </Layout>
        {/* </Router> */}
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
