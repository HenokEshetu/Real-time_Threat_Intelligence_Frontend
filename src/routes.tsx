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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
