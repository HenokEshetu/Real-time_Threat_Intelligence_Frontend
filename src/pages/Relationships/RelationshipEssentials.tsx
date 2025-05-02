import {
  AlertCircleIcon,
  AtSignIcon,
  BinaryIcon,
  BugIcon,
  CrosshairIcon,
  DramaIcon,
  EyeIcon,
  FileArchiveIcon,
  FileTextIcon,
  FlagIcon,
  FolderArchiveIcon,
  GlobeIcon,
  HardDriveIcon,
  LayersIcon,
  LightbulbIcon,
  LinkIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  MonitorCogIcon,
  NetworkIcon,
  NotepadTextDashedIcon,
  ScanSearchIcon,
  SearchIcon,
  ServerIcon,
  SettingsIcon,
  ShieldCheckIcon,
  SignalIcon,
  SplinePointerIcon,
  SquareActivityIcon,
  TriangleAlertIcon,
  UserIcon,
  UsersRoundIcon,
} from 'lucide-react';

import * as React from 'react';

export const getRelEssentials = (rel: string) => {
  switch (rel?.toLowerCase()) {
    case 'indicator': {
      return {
        style: 'bg-purple-50 text-purple-600 border-purple-500',
        icon: <ScanSearchIcon />,
      };
    }
    case 'malware':
      return {
        style: 'bg-yellow-50 text-yellow-600 border-yellow-500',
        icon: <BugIcon />,
      };
    case 'attack-pattern':
      return {
        style: 'bg-amber-50 text-amber-600 border-amber-500',
        icon: <CrosshairIcon />,
      };
    case 'intrusion-set':
      return {
        style: 'bg-pink-50 text-pink-600 border-pink-500',
        icon: <LayersIcon />,
      };
    case 'vulnerability':
      return {
        style: 'bg-orange-50 text-orange-600 border-orange-500',
        icon: <TriangleAlertIcon />,
      };
    case 'campaign':
      return {
        style: 'bg-slate-50 text-slate-600 border-slate-500',
        icon: <FlagIcon />,
      };
    case 'course-of-action':
      return {
        style: 'bg-stone-50 text-stone-600 border-stone-500',
        icon: <ShieldCheckIcon />,
      };
    case 'grouping':
      return {
        style: 'bg-blue-50 text-blue-600 border-blue-500',
        icon: <UsersRoundIcon />,
      };
    case 'identity':
      return {
        style: 'bg-lime-50 text-lime-600 border-lime-500',
        icon: <UserIcon />,
      };
    case 'incident':
      return {
        style: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-500',
        icon: <AlertCircleIcon />,
      };
    case 'infrastructure':
      return {
        style: 'bg-gray-50 text-gray-600 border-gray-500',
        icon: <ServerIcon />,
      };
    case 'location':
      return {
        style: 'bg-yellow-50 text-yellow-600 border-yellow-500',
        icon: <MapPinIcon />,
      };
    case 'malware-analysis':
      return {
        style: 'bg-rose-50 text-rose-600 border-rose-500',
        icon: <SearchIcon />,
      };
    case 'note':
      return {
        style: 'bg-teal-50 text-teal-600 border-teal-500',
        icon: <NotepadTextDashedIcon />,
      };
    case 'observed-data':
      return {
        style: 'bg-green-50 text-green-600 border-green-500',
        icon: <EyeIcon />,
      };
    case 'opinion':
      return {
        style: 'bg-neutral-50 text-neutral-600 border-neutral-500',
        icon: <LightbulbIcon />,
      };
    case 'threat-actor':
      return {
        style: 'bg-cyan-50 text-cyan-600 border-cyan-500',
        icon: <DramaIcon />,
      };
    case 'tool':
      return {
        style: 'bg-cyan-50 text-cyan-600 border-cyan-500',
        icon: <SplinePointerIcon />,
      };
    case 'artifact':
      return {
        style: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-500',
        icon: <FileArchiveIcon />,
      };
    case 'autonomous-system':
      return {
        style: 'bg-sky-50 text-sky-600 border-sky-500',
        icon: <GlobeIcon />,
      };
    case 'directory':
      return {
        style: 'bg-violet-50 text-violet-600 border-violet-500',
        icon: <FolderArchiveIcon />,
      };
    case 'domain-name':
      return {
        style: 'bg-indigo-50 text-indigo-600 border-indigo-500',
        icon: <GlobeIcon />,
      };
    case 'email-address':
      return {
        style: 'bg-red-50 text-red-600 border-red-500',
        icon: <AtSignIcon />,
      };
    case 'email-message':
      return {
        style: 'bg-emerald-50 text-emerald-600 border-emerald-500',
        icon: <MailIcon />,
      };
    case 'file':
      return {
        style: 'bg-lime-50 text-lime-600 border-lime-500',
        icon: <FileTextIcon />,
      };
    case 'url':
      return {
        style: 'bg-amber-50 text-amber-600 border-amber-500',
        icon: <LinkIcon />,
      };
    case 'ipv4-address':
      return {
        style: 'bg-blue-50 text-blue-600 border-blue-500',
        icon: <SignalIcon />,
      };
    case 'ipv6-address':
      return {
        style: 'bg-neutral-50 text-neutral-600 border-neutral-500',
        icon: <NetworkIcon />,
      };
    case 'mac-address':
      return {
        style: 'bg-red-50 text-red-600 border-red-500',
        icon: <HardDriveIcon />,
      };
    case 'mutex':
      return {
        style: 'bg-pink-50 text-pink-600 border-pink-500',
        icon: <LockIcon />,
      };
    case 'network-traffic':
      return {
        style: 'bg-violet-50 text-violet-600 border-violet-500',
        icon: <SquareActivityIcon />,
      };
    case 'process':
      return {
        style: 'bg-indigo-50 text-indigo-600 border-indigo-500',
        icon: <SettingsIcon />,
      };
    case 'user-account':
      return {
        style: 'bg-emerald-50 text-emerald-600 border-emerald-500',
        icon: <UserIcon />,
      };
    case 'windows-registry-key':
      return {
        style: 'bg-purple-50 text-purple-600 border-purple-500',
        icon: <MonitorCogIcon />,
      };
    case 'x509-certificate':
      return {
        style: 'bg-teal-50 text-teal-600 border-teal-500',
        icon: <BinaryIcon />,
      };
    default:
      return {
        style: 'bg-gray-100 text-gray-600 border-gray-500',
        icon: '',
      };
  }
};
