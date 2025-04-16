import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ThreatActors } from './pages/ThreatActors';
import { Indicators } from './pages/Indicators';
import { Malware } from './pages/Malware';
import { MalwareDetailPage } from './pages/Malware/detail';
import { MalwareCreatePage } from './pages/Malware/create';
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
      <Route path="/indicators" element={<Indicators />} />
      <Route path="/malware" element={<Malware />} />
      <Route path="/malware/create" element={<MalwareCreatePage />} />
      <Route path="/malware/:id" element={<MalwareDetailPage />} />
      <Route path="/malware/*" element={<Navigate to="/malware" replace />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/artifacts" element={<ArtifactsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};