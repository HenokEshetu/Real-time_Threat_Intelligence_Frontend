import { Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ThreatActorsPage } from './pages/ThreatActors';
import { IndicatorsPage } from './pages/Indicators/IndicatorsPage';
import { Malware } from './pages/Malware';
import { MalwareDetailPage } from './pages/Malware/detail';
import { MalwareCreatePage } from './pages/Malware/create';
import { ArtifactsPage } from './pages/Artifacts/index';
import { Login } from './pages/Login';
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

import { ObservablesPage } from './pages/Observables/ObservablesPage';

import { FileObservablesDetailPage } from './pages/Observables/File/FileObservablesDetailPage';
import { FileObservablesEditPage } from './pages/Observables/File/FileObservablesEditPage';
import { FileObservablesCreatePage } from './pages/Observables/File/FileObservablesCreatePage';

import { URLObservablesDetailPage } from './pages/Observables/URL/URLObservablesDetailPage';
import { URLObservablesEditPage } from './pages/Observables/URL/URLObservablesEditPage';
import { URLObservablesCreatePage } from './pages/Observables/URL/URLObservablesCreatePage';

import { DomainNameObservablesDetailPage } from './pages/Observables/DomainName/DomainNameObservablesDetailPage';
import { DomainNameObservablesEditPage } from './pages/Observables/DomainName/DomainNameObservablesEditPage';
import { DomainNameObservablesCreatePage } from './pages/Observables/DomainName/DomainNameObservablesCreatePage';

import { IPv4ObservablesDetailPage } from './pages/Observables/IPv4Address/IPv4ObservablesDetailPage';
import { IPv4ObservablesEditPage } from './pages/Observables/IPv4Address/IPv4ObservablesEditPage';
import { IPv4ObservablesCreatePage } from './pages/Observables/IPv4Address/IPv4ObservablesCreatePage';

import { IPv6ObservablesDetailPage } from './pages/Observables/IPv6Address/IPv6ObservablesDetailPage';
import { IPv6ObservablesEditPage } from './pages/Observables/IPv6Address/IPv6ObservablesEditPage';
import { IPv6ObservablesCreatePage } from './pages/Observables/IPv6Address/IPv6ObservablesCreatePage';

import { MACObservablesDetailPage } from './pages/Observables/MACAddress/MACObservablesDetailPage';
import { MACObservablesEditPage } from './pages/Observables/MACAddress/MACObservablesEditPage';
import { MACObservablesCreatePage } from './pages/Observables/MACAddress/MACObservablesCreatePage';

import { DirectoryObservablesDetailPage } from './pages/Observables/Directory/DirectoryObservablesDetailPage';
import { DirectoryObservablesEditPage } from './pages/Observables/Directory/DirectoryObservablesEditPage';
import { DirectoryObservablesCreatePage } from './pages/Observables/Directory/DirectoryObservablesCreatePage';

import { ProcessObservablesDetailPage } from './pages/Observables/Process/ProcessObservablesDetailPage';
import { ProcessObservablesEditPage } from './pages/Observables/Process/ProcessObservablesEditPage';
import { ProcessObservablesCreatePage } from './pages/Observables/Process/ProcessObservablesCreatePage';

import { SoftwareObservablesDetailPage } from './pages/Observables/Software/SoftwareObservablesDetailPage';
import { SoftwareObservablesEditPage } from './pages/Observables/Software/SoftwareObservablesEditPage';
import { SoftwareObservablesCreatePage } from './pages/Observables/Software/SoftwareObservablesCreatePage';

import { WinRegKeyObservablesDetailPage } from './pages/Observables/WindowsRegistryKey/WinRegKeyObservablesDetailPage';
import { WinRegKeyObservablesEditPage } from './pages/Observables/WindowsRegistryKey/WinRegKeyObservablesEditPage';
import { WinRegKeyObservablesCreatePage } from './pages/Observables/WindowsRegistryKey/WinRegKeyObservablesCreatePage';

import { EmailAddressObservablesDetailPage } from './pages/Observables/EmailAddress/EmailAddressObservablesDetailPage';
import { EmailAddressObservablesEditPage } from './pages/Observables/EmailAddress/EmailAddressObservablesEditPage';
import { EmailAddressObservablesCreatePage } from './pages/Observables/EmailAddress/EmailAddressObservablesCreatePage';

import { EmailMessageObservablesDetailPage } from './pages/Observables/EmailMessage/EmailMessageObservablesDetailPage';
import { EmailMessageObservablesEditPage } from './pages/Observables/EmailMessage/EmailMessageObservablesEditPage';
import { EmailMessageObservablesCreatePage } from './pages/Observables/EmailMessage/EmailMessageObservablesCreatePage';

import { NetworkTrafficObservablesDetailPage } from './pages/Observables/NetworkTraffic/NetworkTrafficObservablesDetailPage';
import { NetworkTrafficObservablesEditPage } from './pages/Observables/NetworkTraffic/NetworkTrafficObservablesEditPage';
import { NetworkTrafficObservablesCreatePage } from './pages/Observables/NetworkTraffic/NetworkTrafficObservablesCreatePage';

import { AutonomousSystemObservablesDetailPage } from './pages/Observables/AutonomousSystem/AutonomousSystemObservablesDetailPage';
import { AutonomousSystemObservablesEditPage } from './pages/Observables/AutonomousSystem/AutonomousSystemObservablesEditPage';
import { AutonomousSystemObservablesCreatePage } from './pages/Observables/AutonomousSystem/AutonomousSystemObservablesCreatePage';

import { MutexObservablesDetailPage } from './pages/Observables/Mutex/MutexObservablesDetailPage';
import { MutexObservablesEditPage } from './pages/Observables/Mutex/MutexObservablesEditPage';
import { MutexObservablesCreatePage } from './pages/Observables/Mutex/MutexObservablesCreatePage';

import { UserAccountObservablesDetailPage } from './pages/Observables/UserAccount/UserAccountObservablesDetailPage';
import { UserAccountObservablesEditPage } from './pages/Observables/UserAccount/UserAccountObservablesEditPage';
import { UserAccountObservablesCreatePage } from './pages/Observables/UserAccount/UserAccountObservablesCreatePage';

import { X509CertificateObservablesDetailPage } from './pages/Observables/X509Certificate/X509CertificateObservablesDetailPage';
import { X509CertificateObservablesEditPage } from './pages/Observables/X509Certificate/X509CertificateObservablesEditPage';
import { X509CertificateObservablesCreatePage } from './pages/Observables/X509Certificate/X509CertificateObservablesCreatePage';
import { RelationshipsPage } from './pages/Relationships/RelationshipsPage';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<Dashboard />}
          />
        }
      />
      <Route
        path="/threat-actors"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ThreatActorsPage />}
          />
        }
      />

      <Route
        path="/threat-actors/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<CreateThreatActor />}
          />
        }
      />
      <Route
        path="/threat-actors/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ThreatActorDetail />}
          />
        }
      />
      <Route
        path="/threat-actors/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<EditThreatActor />}
          />
        }
      />
      <Route
        path="/indicators"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IndicatorsPage />}
          />
        }
      />

      <Route
        path="/malware"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<Malware />}
          />
        }
      />
      <Route
        path="/malware/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<MalwareCreatePage />}
          />
        }
      />
      <Route
        path="/malware/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<MalwareDetailPage />}
          />
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ReportsPage />}
          />
        }
      />
      <Route
        path="/reports/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ReportDetailPage />}
          />
        }
      />
      <Route
        path="/reports/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ReportsEditPage />}
          />
        }
      />
      <Route
        path="/reports/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ReportsCreatePage />}
          />
        }
      />

      <Route
        path="/observables"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="files" />}
          />
        }
      />

      <Route
        path="/observables/files"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="files" />}
          />
        }
      />
      <Route
        path="/observables/urls"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="urls" />}
          />
        }
      />
      <Route
        path="/observables/domain-names"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="domain-names" />}
          />
        }
      />
      <Route
        path="/observables/ipv4-addresses"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="ipv4-addresses" />}
          />
        }
      />
      <Route
        path="/observables/ipv6-addresses"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="ipv6-addresses" />}
          />
        }
      />
      <Route
        path="/observables/mac-addresses"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="mac-addresses" />}
          />
        }
      />
      <Route
        path="/observables/directories"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="directories" />}
          />
        }
      />
      <Route
        path="/observables/processes"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="processes" />}
          />
        }
      />
      <Route
        path="/observables/softwares"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="softwares" />}
          />
        }
      />
      <Route
        path="/observables/windows-registry-keys"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="win-registry-keys" />}
          />
        }
      />
      <Route
        path="/observables/email-addresses"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="email-addresses" />}
          />
        }
      />
      <Route
        path="/observables/email-messages"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="email-messages" />}
          />
        }
      />
      <Route
        path="/observables/network-traffics"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="network-traffics" />}
          />
        }
      />
      <Route
        path="/observables/autonomous-systems"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="autonomous-systems" />}
          />
        }
      />
      <Route
        path="/observables/mutexes"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="mutexes" />}
          />
        }
      />
      <Route
        path="/observables/user-accounts"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="user-accounts" />}
          />
        }
      />
      <Route
        path="/observables/x509-certificates"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ObservablesPage defaultTab="x509-certificates" />}
          />
        }
      />

      <Route
        path="/observables/files/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<FileObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/urls/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<URLObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/domain-names/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<DomainNameObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/ipv4-addresses/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IPv4ObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/ipv6-addresses/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IPv6ObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/mac-addresses/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<MACObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/directories/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<DirectoryObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/processes/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ProcessObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/softwares/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<SoftwareObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/windows-registry-keys/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<WinRegKeyObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/email-addresses/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<EmailAddressObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/email-messages/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<EmailMessageObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/network-traffics/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<NetworkTrafficObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/autonomous-systems/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<AutonomousSystemObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/mutexes/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<MutexObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/user-accounts/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<UserAccountObservablesDetailPage />}
          />
        }
      />
      <Route
        path="/observables/x509-certificates/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<X509CertificateObservablesDetailPage />}
          />
        }
      />

      <Route
        path="/observables/files/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<FileObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/urls/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<URLObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/domain-names/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<DomainNameObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/ipv4-addresses/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IPv4ObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/ipv6-addresses/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IPv6ObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/mac-addresses/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<MACObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/directories/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<DirectoryObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/processes/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ProcessObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/softwares/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<SoftwareObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/windows-registry-keys/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<WinRegKeyObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/email-addresses/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<EmailAddressObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/email-messages/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<EmailMessageObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/network-traffics/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<NetworkTrafficObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/autonomous-systems/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<AutonomousSystemObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/mutexes/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<MutexObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/user-accounts/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<UserAccountObservablesEditPage />}
          />
        }
      />
      <Route
        path="/observables/x509-certificates/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<X509CertificateObservablesEditPage />}
          />
        }
      />

      <Route
        path="/observables/files/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<FileObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/urls/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<URLObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/domain-names/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<DomainNameObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/ipv4-addresses/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IPv4ObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/ipv6-addresses/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IPv6ObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/mac-addresses/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<MACObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/directories/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<DirectoryObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/processes/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ProcessObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/softwares/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<SoftwareObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/windows-registry-keys/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<WinRegKeyObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/email-addresses/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<EmailAddressObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/email-messages/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<EmailMessageObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/network-traffics/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<NetworkTrafficObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/autonomous-systems/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<AutonomousSystemObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/mutexes/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<MutexObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/user-accounts/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<UserAccountObservablesCreatePage />}
          />
        }
      />
      <Route
        path="/observables/x509-certificates/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<X509CertificateObservablesCreatePage />}
          />
        }
      />

      <Route
        path="/artifacts"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ArtifactsPage />}
          />
        }
      />
      <Route
        path="/artifacts/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ArtifactDetailPage />}
          />
        }
      />
      <Route
        path="/artifacts/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ArtifactEditPage />}
          />
        }
      />
      <Route
        path="/artifacts/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<ArtifactCreatePage />}
          />
        }
      />

      <Route
        path="/indicators"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IndicatorsPage />}
          />
        }
      />
      <Route
        path="/indicators/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IndicatorDetailPage />}
          />
        }
      />
      <Route
        path="/indicators/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IndicatorEditPage />}
          />
        }
      />
      <Route
        path="/indicators/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IndicatorCreatePage />}
          />
        }
      />

      <Route
        path="/identities"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IdentityListPage />}
          />
        }
      />
      <Route
        path="/identities/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IdentityCreatePage />}
          />
        }
      />
      <Route
        path="/identities/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IdentityEditPage />}
          />
        }
      />
      <Route
        path="/identities/:id"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<IdentityDetailPage />}
          />
        }
      />

      <Route
        path="/relationships"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<RelationshipsPage />}
          />
        }
      />

      <Route
        path="/ingestion"
        element={
          <ProtectedRoute
            requireAuth={true}
            redirectIfAuth={false}
            redirectTo="/auth"
            children={<Ingestion />}
          />
        }
      />

      <Route
        path="/auth"
        element={
          <ProtectedRoute
            redirectIfAuth={true}
            requireAuth={false}
            redirectTo="/"
            children={<Login />}
          />
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
