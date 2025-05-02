import { Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ThreatActorsPage } from './pages/ThreatActors';
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
      <Route path="/threat-actors" element={<ThreatActorsPage />} />

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

      <Route
        path="/observables"
        element={<ObservablesPage defaultTab="files" />}
      />

      <Route
        path="/observables/files"
        element={<ObservablesPage defaultTab="files" />}
      />
      <Route
        path="/observables/urls"
        element={<ObservablesPage defaultTab="urls" />}
      />
      <Route
        path="/observables/domain-names"
        element={<ObservablesPage defaultTab="domain-names" />}
      />
      <Route
        path="/observables/ipv4-addresses"
        element={<ObservablesPage defaultTab="ipv4-addresses" />}
      />
      <Route
        path="/observables/ipv6-addresses"
        element={<ObservablesPage defaultTab="ipv6-addresses" />}
      />
      <Route
        path="/observables/mac-addresses"
        element={<ObservablesPage defaultTab="mac-addresses" />}
      />
      <Route
        path="/observables/directories"
        element={<ObservablesPage defaultTab="directories" />}
      />
      <Route
        path="/observables/processes"
        element={<ObservablesPage defaultTab="processes" />}
      />
      <Route
        path="/observables/softwares"
        element={<ObservablesPage defaultTab="softwares" />}
      />
      <Route
        path="/observables/windows-registry-keys"
        element={<ObservablesPage defaultTab="win-registry-keys" />}
      />
      <Route
        path="/observables/email-addresses"
        element={<ObservablesPage defaultTab="email-addresses" />}
      />
      <Route
        path="/observables/email-messages"
        element={<ObservablesPage defaultTab="email-messages" />}
      />
      <Route
        path="/observables/network-traffics"
        element={<ObservablesPage defaultTab="network-traffics" />}
      />
      <Route
        path="/observables/autonomous-systems"
        element={<ObservablesPage defaultTab="autonomous-systems" />}
      />
      <Route
        path="/observables/mutexes"
        element={<ObservablesPage defaultTab="mutexes" />}
      />
      <Route
        path="/observables/user-accounts"
        element={<ObservablesPage defaultTab="user-accounts" />}
      />
      <Route
        path="/observables/x509-certificates"
        element={<ObservablesPage defaultTab="x509-certificates" />}
      />

      <Route
        path="/observables/files/:id"
        element={<FileObservablesDetailPage />}
      />
      <Route
        path="/observables/urls/:id"
        element={<URLObservablesDetailPage />}
      />
      <Route
        path="/observables/domain-names/:id"
        element={<DomainNameObservablesDetailPage />}
      />
      <Route
        path="/observables/ipv4-addresses/:id"
        element={<IPv4ObservablesDetailPage />}
      />
      <Route
        path="/observables/ipv6-addresses/:id"
        element={<IPv6ObservablesDetailPage />}
      />
      <Route
        path="/observables/mac-addresses/:id"
        element={<MACObservablesDetailPage />}
      />
      <Route
        path="/observables/directories/:id"
        element={<DirectoryObservablesDetailPage />}
      />
      <Route
        path="/observables/processes/:id"
        element={<ProcessObservablesDetailPage />}
      />
      <Route
        path="/observables/softwares/:id"
        element={<SoftwareObservablesDetailPage />}
      />
      <Route
        path="/observables/windows-registry-keys/:id"
        element={<WinRegKeyObservablesDetailPage />}
      />
      <Route
        path="/observables/email-addresses/:id"
        element={<EmailAddressObservablesDetailPage />}
      />
      <Route
        path="/observables/email-messages/:id"
        element={<EmailMessageObservablesDetailPage />}
      />
      <Route
        path="/observables/network-traffics/:id"
        element={<NetworkTrafficObservablesDetailPage />}
      />
      <Route
        path="/observables/autonomous-systems/:id"
        element={<AutonomousSystemObservablesDetailPage />}
      />
      <Route
        path="/observables/mutexes/:id"
        element={<MutexObservablesDetailPage />}
      />
      <Route
        path="/observables/user-accounts/:id"
        element={<UserAccountObservablesDetailPage />}
      />
      <Route
        path="/observables/x509-certificates/:id"
        element={<X509CertificateObservablesDetailPage />}
      />

      <Route
        path="/observables/files/:id/edit"
        element={<FileObservablesEditPage />}
      />
      <Route
        path="/observables/urls/:id/edit"
        element={<URLObservablesEditPage />}
      />
      <Route
        path="/observables/domain-names/:id/edit"
        element={<DomainNameObservablesEditPage />}
      />
      <Route
        path="/observables/ipv4-addresses/:id/edit"
        element={<IPv4ObservablesEditPage />}
      />
      <Route
        path="/observables/ipv6-addresses/:id/edit"
        element={<IPv6ObservablesEditPage />}
      />
      <Route
        path="/observables/mac-addresses/:id/edit"
        element={<MACObservablesEditPage />}
      />
      <Route
        path="/observables/directories/:id/edit"
        element={<DirectoryObservablesEditPage />}
      />
      <Route
        path="/observables/processes/:id/edit"
        element={<ProcessObservablesEditPage />}
      />
      <Route
        path="/observables/softwares/:id/edit"
        element={<SoftwareObservablesEditPage />}
      />
      <Route
        path="/observables/windows-registry-keys/:id/edit"
        element={<WinRegKeyObservablesEditPage />}
      />
      <Route
        path="/observables/email-addresses/:id/edit"
        element={<EmailAddressObservablesEditPage />}
      />
      <Route
        path="/observables/email-messages/:id/edit"
        element={<EmailMessageObservablesEditPage />}
      />
      <Route
        path="/observables/network-traffics/:id/edit"
        element={<NetworkTrafficObservablesEditPage />}
      />
      <Route
        path="/observables/autonomous-systems/:id/edit"
        element={<AutonomousSystemObservablesEditPage />}
      />
      <Route
        path="/observables/mutexes/:id/edit"
        element={<MutexObservablesEditPage />}
      />
      <Route
        path="/observables/user-accounts/:id/edit"
        element={<UserAccountObservablesEditPage />}
      />
      <Route
        path="/observables/x509-certificates/:id/edit"
        element={<X509CertificateObservablesEditPage />}
      />

      <Route
        path="/observables/files/create"
        element={<FileObservablesCreatePage />}
      />
      <Route
        path="/observables/urls/create"
        element={<URLObservablesCreatePage />}
      />
      <Route
        path="/observables/domain-names/create"
        element={<DomainNameObservablesCreatePage />}
      />
      <Route
        path="/observables/ipv4-addresses/create"
        element={<IPv4ObservablesCreatePage />}
      />
      <Route
        path="/observables/ipv6-addresses/create"
        element={<IPv6ObservablesCreatePage />}
      />
      <Route
        path="/observables/mac-addresses/create"
        element={<MACObservablesCreatePage />}
      />
      <Route
        path="/observables/directories/create"
        element={<DirectoryObservablesCreatePage />}
      />
      <Route
        path="/observables/processes/create"
        element={<ProcessObservablesCreatePage />}
      />
      <Route
        path="/observables/softwares/create"
        element={<SoftwareObservablesCreatePage />}
      />
      <Route
        path="/observables/windows-registry-keys/create"
        element={<WinRegKeyObservablesCreatePage />}
      />
      <Route
        path="/observables/email-addresses/create"
        element={<EmailAddressObservablesCreatePage />}
      />
      <Route
        path="/observables/email-messages/create"
        element={<EmailMessageObservablesCreatePage />}
      />
      <Route
        path="/observables/network-traffics/create"
        element={<NetworkTrafficObservablesCreatePage />}
      />
      <Route
        path="/observables/autonomous-systems/create"
        element={<AutonomousSystemObservablesCreatePage />}
      />
      <Route
        path="/observables/mutexes/create"
        element={<MutexObservablesCreatePage />}
      />
      <Route
        path="/observables/user-accounts/create"
        element={<UserAccountObservablesCreatePage />}
      />
      <Route
        path="/observables/x509-certificates/create"
        element={<X509CertificateObservablesCreatePage />}
      />

      <Route path="/artifacts" element={<ArtifactsPage />} />
      <Route path="/artifacts/:id" element={<ArtifactDetailPage />} />
      <Route path="/artifacts/:id/edit" element={<ArtifactEditPage />} />
      <Route path="/artifacts/create" element={<ArtifactCreatePage />} />

      <Route path="/indicators" element={<IndicatorsPage />} />
      <Route path="/indicators/:id" element={<IndicatorDetailPage />} />
      <Route path="/indicators/:id/edit" element={<IndicatorEditPage />} />
      <Route path="/indicators/create" element={<IndicatorCreatePage />} />

      <Route path="/identities" element={<IdentityListPage />} />
      <Route path="/identities/create" element={<IdentityCreatePage />} />
      <Route path="/identities/:id/edit" element={<IdentityEditPage />} />
      <Route path="/identities/:id" element={<IdentityDetailPage />} />

      <Route path="/relationships" element={<RelationshipsPage />} />

      <Route path="/ingestion" element={<Ingestion />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
