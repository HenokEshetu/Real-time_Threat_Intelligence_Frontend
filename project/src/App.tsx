import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import { theme } from './theme';
import { client } from './lib/apollo';
import { Layout } from './components/layout/Layout';
import { ArtifactsPage } from './pages/Artifacts';
import { ArtifactDetailPage } from './pages/Artifacts/id';
import { ArtifactCreatePage } from './pages/Artifacts/create';
import { ArtifactEditPage } from './pages/Artifacts/edit';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Router> */}
          <Layout>
            <Routes>
              <Route path="/" element={<ArtifactsPage />} />
              <Route path="/artifact/:id" element={<ArtifactDetailPage />} />
              <Route path="/artifacts/create" element={<ArtifactCreatePage />} />
              <Route path="/artifacts/:id/edit" element={<ArtifactEditPage />} />
              <Route path="*" element={<div>404 - Page Not Found</div>} /> {/* Fallback route */}
            </Routes>
          </Layout>
        {/* </Router> */}
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;