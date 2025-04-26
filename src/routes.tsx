import { Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ThreatActors } from './pages/ThreatActors';
import { IndicatorsPage } from './pages/Indicators/IndicatorsPage';
import { Malware } from './pages/Malware';
import { MalwareDetailPage } from './pages/Malware/detail';
import { MalwareCreatePage } from './pages/Malware/create';
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
import { ReportsPage } from './pages/Reports/ReportsPage';
import { ReportDetailPage } from './pages/Reports/ReportDetailPage';
import { ReportsEditPage } from './pages/Reports/ReportsEditPage';
import { ReportsCreatePage } from './pages/Reports/ReportsCreatePage';
import CreateThreatActor from './pages/ThreatActors/create';
import ThreatActorDetail from './pages/ThreatActors/detail';
import EditThreatActor from './pages/ThreatActors/edit';
import { Ingestion } from './pages/Ingestion';
import { IdentityListPage } from './pages/Identity';
import { IdentityCreatePage } from './pages/Identity/create';
import { IdentityEditPage } from './pages/Identity/edit';
import { IdentityDetailPage } from './pages/Identity/detail';

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/threat-actors" element={<ThreatActors />} />

      <Route path="/threat-actors/create" element={<CreateThreatActor />} />
      <Route path="/threat-actors/:id" element={<ThreatActorDetail />} />
      <Route path="/threat-actors/:id/edit" element={<EditThreatActor />} />
      <Route path="/indicators" element={<IndicatorsPage />} />

      <Route path="/malware" element={<Malware />} />
      <Route path="/malware/create" element={<MalwareCreatePage />} />
      <Route path="/malware/:id" element={<MalwareDetailPage />} />
      <Route path="/malware/*" element={<Navigate to="/malware" />} />

      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/reports/:id" element={<ReportDetailPage />} />
      <Route path="/reports/:id/edit" element={<ReportsEditPage />} />
      <Route path="/reports/create" element={<ReportsCreatePage />} />

      <Route path="/artifacts" element={<ArtifactsPage />} />
      <Route path="/artifacts/:id" element={<ArtifactDetailPage />} />
      <Route path="/artifacts/:id/edit" element={<ArtifactEditPage />} />
      <Route path="/artifacts/create" element={<ArtifactCreatePage />} />

      <Route path="/indicators" element={<IndicatorsPage />} />
      <Route path="/indicators/:id" element={<IndicatorDetailPage />} />
      <Route path="/indicators/:id/edit" element={<IndicatorEditPage />} />
      <Route path="/indicators/create" element={<IndicatorCreatePage />} />

      <Route path="/identity" element={<IdentityListPage />} />
      <Route path="/identity/create" element={<IdentityCreatePage />} />
      <Route path="/identity/:id/edit" element={<IdentityEditPage />} />
      <Route path="/identity/:id" element={<IdentityDetailPage />} />

      <Route path="/ingestion" element={<Ingestion />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
