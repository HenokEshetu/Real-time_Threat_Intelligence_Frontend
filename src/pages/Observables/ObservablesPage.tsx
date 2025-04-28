import { TabsType, TopTab } from '@/components/common/TopTab';
import React from 'react';
import { FileObservablesPage } from './File/FileObservablesPage';
import { URLObservablesPage } from './URL/URLObservablesPage';
import { DomainNameObservablesPage } from './DomainName/DomainNameObservablesPage';
import { IPv4ObservablesPage } from './IPv4Address/IPv4ObservablesPage';
import { IPv6ObservablesPage } from './IPv6Address/IPv6ObservablesPage';
import { MACObservablesPage } from './MACAddress/MACObservablesPage';
import { DirectoryObservablesPage } from './Directory/DirectoryObservablesPage';
import { ProcessObservablesPage } from './Process/ProcessObservablesPage';
import { SoftwareObservablesPage } from './Software/SoftwareObservablesPage';
import { WinRegKeyObservablesPage } from './WindowsRegistryKey/WinRegKeyObservablesPage';
import { NetworkTrafficObservablesPage } from './NetworkTraffic/NetworkTrafficObservablesPage';
import { AutonomousSystemObservablesPage } from './AutonomousSystem/AutonomousSystemObservablesPage';
import { MutexObservablesPage } from './Mutex/MutexObservablesPage';
import { UserAccountObservablesPage } from './UserAccount/UserAccountObservablesPage';
import { X509CertificateObservablesPage } from './X509Certificate/X509CertificateObservablesPage';
import { EmailsObservablesPage } from './EmailsObservablesPage';

export const ObservablesPage = () => {
  const tabs = {
    titles: [
      'files',
      'urls',
      'domains',
      'ipv4-addresses',
      'ipv6-addresses',
      'macs',
      'directories',
      'processes',
      'softwares',
      'win-registry-keys',
      'emails',
      'network-traffics',
      'autonomous-systems',
      'mutexes',
      'user-accounts',
      'x509certificates',
    ],
    comoponents: [
      <FileObservablesPage />,
      <URLObservablesPage />,
      <DomainNameObservablesPage />,
      <IPv4ObservablesPage />,
      <IPv6ObservablesPage />,
      <MACObservablesPage />,
      <DirectoryObservablesPage />,
      <ProcessObservablesPage />,
      <SoftwareObservablesPage />,
      <WinRegKeyObservablesPage />,
      <EmailsObservablesPage />,
      <NetworkTrafficObservablesPage />,
      <AutonomousSystemObservablesPage />,
      <MutexObservablesPage />,
      <UserAccountObservablesPage />,
      <X509CertificateObservablesPage />,
    ],
  } as TabsType;
  return (
    <div>
      <TopTab
        tabs={tabs}
        triggerStyle="text-xs font-semibold"
        listStyle="!gap-3"
        containerStyle="!top-29"
      />
    </div>
  );
};
