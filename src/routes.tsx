import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ThreatActors } from './pages/ThreatActors';
import { IndicatorsPage } from './pages/Indicators/IndicatorsPage';
import { Malware } from './pages/Malware';
import { Reports } from './pages/Reports';
import { ArtifactsPage } from './pages/Artifacts/index';
import { Login } from './pages/Login';
import { useAuth } from './hooks/useAuth';
import React from 'react';
import { IndicatorDetailPage } from './pages/Indicators/IndicatorDetailPage';
import { IndicatorEditPage } from './pages/Indicators/IndicatorEditPage';
import { IndicatorCreatePage } from './pages/Indicators/IndicatorCreatePage';
import { ArtifactDetailPage } from './pages/Artifacts/ArtifactDetailPage';
import { ArtifactEditPage } from './pages/Artifacts/edit';
import { ArtifactCreatePage } from './pages/Artifacts/create';

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/threat-actors" element={<ThreatActors />} />
      <Route path="/indicators" element={<IndicatorsPage />} />
      <Route path="/malware" element={<Malware />} />
      <Route path="/reports" element={<Reports />} />

      <Route path="/artifacts" element={<ArtifactsPage />} />
      <Route path="/artifact/:id" element={<ArtifactDetailPage />} />
      <Route path="/artifact/:id/edit" element={<ArtifactEditPage />} />
      <Route path="/artifact/create" element={<ArtifactCreatePage />} />

      <Route path="/indicators" element={<IndicatorsPage />} />
      <Route path="/indicator/:id" element={<IndicatorDetailPage />} />
      <Route path="/indicator/:id/edit" element={<IndicatorEditPage />} />
      <Route path="/indicator/create" element={<IndicatorCreatePage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
