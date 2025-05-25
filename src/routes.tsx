import { Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ThreatActorsPage } from './pages/ThreatActors/ThreatActorPage';
import { IndicatorsPage } from './pages/Indicators/IndicatorsPage';
import { ArtifactsPage } from './pages/Artifacts/index';
import { Login } from './pages/Login';
import React from 'react';
import { IndicatorDetailPage } from './pages/Indicators/IndicatorDetailPage';
import { IndicatorEditPage } from './pages/Indicators/IndicatorEditPage';
import { IndicatorCreatePage } from './pages/Indicators/IndicatorCreatePage';
import { ArtifactEditPage } from './pages/Artifacts/edit';

import { CampaignsPage } from './pages/Campaigns/CampaignsPage';
import { CampaignsEditPage } from './pages/Campaigns/CampaignsEditPage';

import { ReportsPage } from './pages/Reports/ReportsPage';
import { ReportDetailPage } from './pages/Reports/ReportDetailPage';
import { ReportsEditPage } from './pages/Reports/ReportsEditPage';
import { ReportsCreatePage } from './pages/Reports/ReportsCreatePage';
import CreateThreatActor from './pages/ThreatActors/ThreatActorCreatePage';
import ThreatActorDetail from './pages/ThreatActors/ThreatActorDetailPage';
import EditThreatActor from './pages/ThreatActors/ThreatActorEditPage';
import DeleteThreatActor from './pages/ThreatActors/ThreatActorDeletePage';

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

import { UserAccountObservablesDetailPage } from './pages/Observables/UserAccount/UserAccountObservablesDetailPage';
import { UserAccountObservablesEditPage } from './pages/Observables/UserAccount/UserAccountObservablesEditPage';
import { UserAccountObservablesCreatePage } from './pages/Observables/UserAccount/UserAccountObservablesCreatePage';

import { X509CertificateObservablesDetailPage } from './pages/Observables/X509Certificate/X509CertificateObservablesDetailPage';
import { X509CertificateObservablesEditPage } from './pages/Observables/X509Certificate/X509CertificateObservablesEditPage';
import { X509CertificateObservablesCreatePage } from './pages/Observables/X509Certificate/X509CertificateObservablesCreatePage';
import { RelationshipsPage } from './pages/Relationships/RelationshipsPage';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { CampaignDetailPage } from './pages/Campaigns/CampaignsDetailPage';

import MalwaresPage from '@/pages/Malware/MalwaresPage';
import { MalwaresCreatePage } from '@/pages/Malware/MalwaresCreatePage';
import MalwaresDetailPage from '@/pages/Malware/MalwaresDetailPage';
import { AttackPatternsPage } from './pages/AttackPattern/AttackPatternsPage';
import { AttackPatternsDetailPage } from './pages/AttackPattern/AttackPatternsDetailPage';

import LocationCreate from './components/location/LocationCreate';
import LocationEdit from './components/location/LocationEdit';
import Regions from './pages/Location/Regions';
import RegionDetailPage from './pages/Location/RegionDetailPage';
import LocationDetail from './pages/Location/LocationDetail';
import LocationsList from './pages/Location/LocationsList';
import { Signup } from './pages/Signup';
import { IdentityListPage } from './pages/Identity/IdentityPage';
import IdentityCreatePage from './pages/Identity/IdentityCreatePage';
import IdentityEditPage from './pages/Identity/IdentityEditPage';
import IdentityDetailPage from './pages/Identity/IdentityDetailPage';
import ArtifactDetailPage from './pages/Artifacts/ArtifactDetailPage';
import ArtifactCreatePage from './pages/Artifacts/ArtifactCreatePage';
import { ToolsCreatePage } from './pages/Tools/ToolsCreatePage';
import { ToolsEditPage } from './pages/Tools/ToolsEditPage';
import { ToolsDetailPage } from './pages/Tools/ToolsDetailPage';
import ToolsPage from "@/pages/Tools/ToolsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute children={<Dashboard />} />} />
      <Route
        path="/threat-actors"
        element={<ProtectedRoute children={<ThreatActorsPage />} />}
      />

      <Route
        path="/threat-actors/create"
        element={<ProtectedRoute children={<CreateThreatActor />} />}
      />
      <Route
        path="/threat-actors/:id"
        element={<ProtectedRoute children={<ThreatActorDetail />} />}
      />
      <Route
        path="/threat-actors/:id/edit"
        element={<ProtectedRoute children={<EditThreatActor />} />}
      />
      <Route
        path="/threat-actors/:id/edit"
        element={<ProtectedRoute children={<DeleteThreatActor />} />}
      />
      <Route
        path="/indicators"
        element={<ProtectedRoute children={<IndicatorsPage />} />}
      />

      <Route
        path="/malware"
        element={<ProtectedRoute children={<MalwaresPage />} />}
      />
      <Route
        path="/malware/create"
        element={<ProtectedRoute children={<MalwaresCreatePage />} />}
      />
      <Route
        path="/malware/:id"
        element={<ProtectedRoute children={<MalwaresDetailPage />} />}
      />
      <Route
        path="/reports"
        element={<ProtectedRoute children={<ReportsPage />} />}
      />
      <Route
        path="/reports/:id"
        element={<ProtectedRoute children={<ReportDetailPage />} />}
      />
      <Route
        path="/reports/:id/edit"
        element={<ProtectedRoute children={<ReportsEditPage />} />}
      />
      <Route
        path="/reports/create"
        element={<ProtectedRoute children={<ReportsCreatePage />} />}
      />
      <Route
        path="/campaigns"
        element={<ProtectedRoute children={<CampaignsPage />} />}
      />
      <Route
        path="/campaigns/:id"
        element={<ProtectedRoute children={<CampaignDetailPage />} />}
      />
      <Route
        path="/campaigns/:id/edit"
        element={<ProtectedRoute children={<CampaignsEditPage />} />}
      />
      <Route
        path="/attack-patterns"
        element={<ProtectedRoute children={<AttackPatternsPage />} />}
      />
      <Route
        path="/attack-patterns/:id"
        element={<ProtectedRoute children={<AttackPatternsDetailPage />} />}
      />

      <Route
        path="/observables"
        element={
          <ProtectedRoute children={<ObservablesPage defaultTab="files" />} />
        }
      />

      <Route
        path="/observables/files"
        element={
          <ProtectedRoute children={<ObservablesPage defaultTab="files" />} />
        }
      />
      <Route
        path="/observables/urls"
        element={
          <ProtectedRoute children={<ObservablesPage defaultTab="urls" />} />
        }
      />
      <Route
        path="/observables/domain-names"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="domain-names" />}
          />
        }
      />
      <Route
        path="/observables/ipv4-addresses"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="ipv4-addresses" />}
          />
        }
      />
      <Route
        path="/observables/ipv6-addresses"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="ipv6-addresses" />}
          />
        }
      />
      <Route
        path="/observables/mac-addresses"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="mac-addresses" />}
          />
        }
      />
      <Route
        path="/observables/directories"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="directories" />}
          />
        }
      />
      <Route
        path="/observables/processes"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="processes" />}
          />
        }
      />
      <Route
        path="/observables/softwares"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="softwares" />}
          />
        }
      />
      <Route
        path="/observables/windows-registry-keys"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="win-registry-keys" />}
          />
        }
      />
      <Route
        path="/observables/email-addresses"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="email-addresses" />}
          />
        }
      />
      <Route
        path="/observables/email-messages"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="email-messages" />}
          />
        }
      />
      <Route
        path="/observables/network-traffics"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="network-traffics" />}
          />
        }
      />
      <Route
        path="/observables/autonomous-systems"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="autonomous-systems" />}
          />
        }
      />
      <Route
        path="/observables/mutexes"
        element={
          <ProtectedRoute children={<ObservablesPage defaultTab="mutexes" />} />
        }
      />
      <Route
        path="/observables/user-accounts"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="user-accounts" />}
          />
        }
      />
      <Route
        path="/observables/x509-certificates"
        element={
          <ProtectedRoute
            children={<ObservablesPage defaultTab="x509-certificates" />}
          />
        }
      />

      <Route
        path="/observables/files/:id"
        element={<ProtectedRoute children={<FileObservablesDetailPage />} />}
      />
      <Route
        path="/observables/urls/:id"
        element={<ProtectedRoute children={<URLObservablesDetailPage />} />}
      />
      <Route
        path="/observables/domain-names/:id"
        element={
          <ProtectedRoute children={<DomainNameObservablesDetailPage />} />
        }
      />
      <Route
        path="/observables/ipv4-addresses/:id"
        element={<ProtectedRoute children={<IPv4ObservablesDetailPage />} />}
      />
      <Route
        path="/observables/ipv6-addresses/:id"
        element={<ProtectedRoute children={<IPv6ObservablesDetailPage />} />}
      />
      <Route
        path="/observables/mac-addresses/:id"
        element={<ProtectedRoute children={<MACObservablesDetailPage />} />}
      />
      <Route
        path="/observables/directories/:id"
        element={
          <ProtectedRoute children={<DirectoryObservablesDetailPage />} />
        }
      />
      <Route
        path="/observables/processes/:id"
        element={<ProtectedRoute children={<ProcessObservablesDetailPage />} />}
      />
      <Route
        path="/observables/softwares/:id"
        element={
          <ProtectedRoute children={<SoftwareObservablesDetailPage />} />
        }
      />
      <Route
        path="/observables/windows-registry-keys/:id"
        element={
          <ProtectedRoute children={<WinRegKeyObservablesDetailPage />} />
        }
      />
      <Route
        path="/observables/email-addresses/:id"
        element={
          <ProtectedRoute children={<EmailAddressObservablesDetailPage />} />
        }
      />
      <Route
        path="/observables/email-messages/:id"
        element={
          <ProtectedRoute children={<EmailMessageObservablesDetailPage />} />
        }
      />
      <Route
        path="/observables/network-traffics/:id"
        element={
          <ProtectedRoute children={<NetworkTrafficObservablesDetailPage />} />
        }
      />
      <Route
        path="/observables/autonomous-systems/:id"
        element={
          <ProtectedRoute
            children={<AutonomousSystemObservablesDetailPage />}
          />
        }
      />

      <Route
        path="/observables/user-accounts/:id"
        element={
          <ProtectedRoute children={<UserAccountObservablesDetailPage />} />
        }
      />
      <Route
        path="/observables/x509-certificates/:id"
        element={
          <ProtectedRoute children={<X509CertificateObservablesDetailPage />} />
        }
      />

      <Route
        path="/observables/files/:id/edit"
        element={<ProtectedRoute children={<FileObservablesEditPage />} />}
      />
      <Route
        path="/observables/urls/:id/edit"
        element={<ProtectedRoute children={<URLObservablesEditPage />} />}
      />
      <Route
        path="/observables/domain-names/:id/edit"
        element={
          <ProtectedRoute children={<DomainNameObservablesEditPage />} />
        }
      />
      <Route
        path="/observables/ipv4-addresses/:id/edit"
        element={<ProtectedRoute children={<IPv4ObservablesEditPage />} />}
      />
      <Route
        path="/observables/ipv6-addresses/:id/edit"
        element={<ProtectedRoute children={<IPv6ObservablesEditPage />} />}
      />
      <Route
        path="/observables/mac-addresses/:id/edit"
        element={<ProtectedRoute children={<MACObservablesEditPage />} />}
      />
      <Route
        path="/observables/directories/:id/edit"
        element={<ProtectedRoute children={<DirectoryObservablesEditPage />} />}
      />
      <Route
        path="/observables/processes/:id/edit"
        element={<ProtectedRoute children={<ProcessObservablesEditPage />} />}
      />
      <Route
        path="/observables/softwares/:id/edit"
        element={<ProtectedRoute children={<SoftwareObservablesEditPage />} />}
      />
      <Route
        path="/observables/windows-registry-keys/:id/edit"
        element={<ProtectedRoute children={<WinRegKeyObservablesEditPage />} />}
      />
      <Route
        path="/observables/email-addresses/:id/edit"
        element={
          <ProtectedRoute children={<EmailAddressObservablesEditPage />} />
        }
      />
      <Route
        path="/observables/email-messages/:id/edit"
        element={
          <ProtectedRoute children={<EmailMessageObservablesEditPage />} />
        }
      />
      <Route
        path="/observables/network-traffics/:id/edit"
        element={
          <ProtectedRoute children={<NetworkTrafficObservablesEditPage />} />
        }
      />
      <Route
        path="/observables/autonomous-systems/:id/edit"
        element={
          <ProtectedRoute children={<AutonomousSystemObservablesEditPage />} />
        }
      />

      <Route
        path="/observables/user-accounts/:id/edit"
        element={
          <ProtectedRoute children={<UserAccountObservablesEditPage />} />
        }
      />
      <Route
        path="/observables/x509-certificates/:id/edit"
        element={
          <ProtectedRoute children={<X509CertificateObservablesEditPage />} />
        }
      />

      <Route
        path="/observables/files/create"
        element={<ProtectedRoute children={<FileObservablesCreatePage />} />}
      />
      <Route
        path="/observables/urls/create"
        element={<ProtectedRoute children={<URLObservablesCreatePage />} />}
      />
      <Route
        path="/observables/domain-names/create"
        element={
          <ProtectedRoute children={<DomainNameObservablesCreatePage />} />
        }
      />
      <Route
        path="/observables/ipv4-addresses/create"
        element={<ProtectedRoute children={<IPv4ObservablesCreatePage />} />}
      />
      <Route
        path="/observables/ipv6-addresses/create"
        element={<ProtectedRoute children={<IPv6ObservablesCreatePage />} />}
      />
      <Route
        path="/observables/mac-addresses/create"
        element={<ProtectedRoute children={<MACObservablesCreatePage />} />}
      />
      <Route
        path="/observables/directories/create"
        element={
          <ProtectedRoute children={<DirectoryObservablesCreatePage />} />
        }
      />
      <Route
        path="/observables/processes/create"
        element={<ProtectedRoute children={<ProcessObservablesCreatePage />} />}
      />
      <Route
        path="/observables/softwares/create"
        element={
          <ProtectedRoute children={<SoftwareObservablesCreatePage />} />
        }
      />
      <Route
        path="/observables/windows-registry-keys/create"
        element={
          <ProtectedRoute children={<WinRegKeyObservablesCreatePage />} />
        }
      />
      <Route
        path="/observables/email-addresses/create"
        element={
          <ProtectedRoute children={<EmailAddressObservablesCreatePage />} />
        }
      />
      <Route
        path="/observables/email-messages/create"
        element={
          <ProtectedRoute children={<EmailMessageObservablesCreatePage />} />
        }
      />
      <Route
        path="/observables/network-traffics/create"
        element={
          <ProtectedRoute children={<NetworkTrafficObservablesCreatePage />} />
        }
      />
      <Route
        path="/observables/autonomous-systems/create"
        element={
          <ProtectedRoute
            children={<AutonomousSystemObservablesCreatePage />}
          />
        }
      />

      <Route
        path="/observables/user-accounts/create"
        element={
          <ProtectedRoute children={<UserAccountObservablesCreatePage />} />
        }
      />
      <Route
        path="/observables/x509-certificates/create"
        element={
          <ProtectedRoute children={<X509CertificateObservablesCreatePage />} />
        }
      />

      <Route
        path="/artifacts"
        element={<ProtectedRoute children={<ArtifactsPage />} />}
      />
      <Route
        path="/artifacts/:id"
        element={<ProtectedRoute children={<ArtifactDetailPage />} />}
      />
      <Route
        path="/artifacts/:id/edit"
        element={<ProtectedRoute children={<ArtifactEditPage />} />}
      />
      <Route
        path="/artifacts/create"
        element={<ProtectedRoute children={<ArtifactCreatePage />} />}
      />

      <Route
        path="/indicators"
        element={<ProtectedRoute children={<IndicatorsPage />} />}
      />
      <Route
        path="/indicators/:id"
        element={<ProtectedRoute children={<IndicatorDetailPage />} />}
      />
      <Route
        path="/indicators/:id/edit"
        element={<ProtectedRoute children={<IndicatorEditPage />} />}
      />
      <Route
        path="/indicators/create"
        element={<ProtectedRoute children={<IndicatorCreatePage />} />}
      />

      <Route
        path="/identities"
        element={<ProtectedRoute children={<IdentityListPage />} />}
      />
      <Route
        path="/identities/create"
        element={<ProtectedRoute children={<IdentityCreatePage />} />}
      />
      <Route
        path="/identities/:id/edit"
        element={<ProtectedRoute children={<IdentityEditPage />} />}
      />
      <Route
        path="/identities/:id"
        element={<ProtectedRoute children={<IdentityDetailPage />} />}
      />
      <Route
        path="/tools"
        element={<ProtectedRoute children={<ToolsPage />} />}
      />
      <Route
        path="/tools/create"
        element={<ProtectedRoute children={<ToolsCreatePage />} />}
      />
      <Route
        path="/tools/:id/edit"
        element={<ProtectedRoute children={<ToolsEditPage />} />}
      />

      <Route
        path="/tools/:id"
        element={<ProtectedRoute children={<ToolsDetailPage />} />}
      />
      <Route
        path="/relationships"
        element={<ProtectedRoute children={<RelationshipsPage />} />}
      />

      <Route path="/auth" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      {/* Location routes */}

      <Route
        path="/locations/create"
        element={<ProtectedRoute children={<LocationCreate />} />}
      />
      <Route
        path="/locations/:id"
        element={<ProtectedRoute children={<LocationDetail />} />}
      />
      <Route
        path="/locations/:id/edit"
        element={<ProtectedRoute children={<LocationEdit />} />}
      />
      <Route
        path="/locations/countries"
        element={
          <ProtectedRoute children={<LocationsList initialType="COUNTRY" />} />
        }
      />
      <Route
        path="/locations/cities"
        element={
          <ProtectedRoute children={<LocationsList initialType="CITY" />} />
        }
      />
      <Route
        path="/locations/region"
        element={<ProtectedRoute children={<Regions />} />}
      />
      <Route
        path="/locations/region/:regionName"
        element={<ProtectedRoute children={<RegionDetailPage />} />}
      />
      <Route
        path="/locations/administrative-area"
        element={
          <ProtectedRoute
            children={<LocationsList initialType="ADMINISTRATIVE_AREA" />}
          />
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
