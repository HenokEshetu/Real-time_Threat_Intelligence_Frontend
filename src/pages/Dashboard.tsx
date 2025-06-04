import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import {
  AreaChartGradient,
  barChart_chartData,
  LineChartCustomLabel,
  BarChartHorizontal,
  barchartInteractive,
  BarChartInteractive,
  PieChartDonut,
  radial_chartData,
  // PieChart,
  RadialChart,
} from '@/components/ui/charts';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  Bug,
  Globe,
  ShieldAlert,
  Activity,
  Network,
  List,
  Factory,
  Hammer,
  Shield,
  AlertTriangle,
  FileText,
  FileTextIcon,
  Link2Icon,
  ServerIcon,
  CpuIcon,
  HammerIcon,
  TriangleAlert,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

// countries.json is imported and visualized in the map below
import countries from './Location/countries.json';
import { gql, useQuery } from '@apollo/client';
import { Loading } from '@/components/common/Loading/Loading';
import { useReports } from '@/hooks/useReports';
import { useIntrusionSets } from '@/hooks/useintrusionSet';
import { useCampaigns } from '@/hooks/useCampaigns';
import { useMalware } from '@/hooks/useMalware';
import { useIndicators } from '@/hooks/useIndicators';
import { useObservables } from '@/hooks/observables/useObservables';
import { useAttackPatterns } from '@/hooks/observables/useAttackPattern';
import { useCoursesOfAction } from '@/hooks/useCourseOfAction';
import { useTools } from '@/hooks/useTools';
import { useNavigate } from 'react-router-dom';
import { useVulnerabilities } from '@/hooks/useVulnerability';

// delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return <></>;
}

export const Dashboard = () => {
  const { total: reportTotal } = useReports({
    page: 1,
    pageSize: 1,
  });
  const { total: intrusionTotal } = useIntrusionSets({
    page: 1,
    pageSize: 1,
  });
  const { total: campaignTotal } = useCampaigns({
    page: 1,
    pageSize: 1,
  });
  const { total: malwareTotal } = useMalware({
    page: 1,
    pageSize: 1,
  });
  const { total: indicatorTotal } = useIndicators({
    page: 1,
    pageSize: 1,
  });
  const {
    fileTotal: filesDataTotal,
    urlTotal: urlsDataTotal,
    domainTotal: domainsDataTotal,
    ipv4Total: ipv4sDataTotal,
    total: observableTotal,
  } = useObservables({
    page: 1,
    pageSize: 1,
  });

  const { total: campaignEnterpriseTotal } = useCampaigns({
    filters: {
      x_mitre_domains: ['enterprise-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: malwareEnterpriseTotal } = useMalware({
    filters: {
      x_mitre_domains: ['enterprise-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: intrusionEnterpriseTotal } = useIntrusionSets({
    filters: {
      x_mitre_domains: ['enterprise-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: attackPatternEnterpriseTotal } = useAttackPatterns({
    filters: {
      x_mitre_domains: ['enterprise-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: courseOfActionEnterpriseTotal } = useCoursesOfAction({
    filters: {
      x_mitre_domains: ['enterprise-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: toolEnterpriseTotal } = useTools({
    filters: {
      x_mitre_domains: ['enterprise-attack'],
    },
    page: 1,
    pageSize: 1,
  });

  const { total: campaignMobileTotal } = useCampaigns({
    filters: {
      x_mitre_domains: ['mobile-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: malwareMobileTotal } = useMalware({
    filters: {
      x_mitre_domains: ['mobile-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: intrusionMobileTotal } = useIntrusionSets({
    filters: {
      x_mitre_domains: ['mobile-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: attackPatternMobileTotal } = useAttackPatterns({
    filters: {
      x_mitre_domains: ['mobile-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: courseOfActionMobileTotal } = useCoursesOfAction({
    filters: {
      x_mitre_domains: ['mobile-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: toolMobileTotal } = useTools({
    filters: {
      x_mitre_domains: ['mobile-attack'],
    },
    page: 1,
    pageSize: 1,
  });

  const { total: campaignICSTotal } = useCampaigns({
    filters: {
      x_mitre_domains: ['ics-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: malwareICSTotal } = useMalware({
    filters: {
      x_mitre_domains: ['ics-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: intrusionICSTotal } = useIntrusionSets({
    filters: {
      x_mitre_domains: ['ics-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: attackPatternICSTotal } = useAttackPatterns({
    filters: {
      x_mitre_domains: ['ics-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: courseOfActionICSTotal } = useCoursesOfAction({
    filters: {
      x_mitre_domains: ['ics-attack'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: toolICSTotal } = useTools({
    filters: {
      x_mitre_domains: ['ics-attack'],
    },
    page: 1,
    pageSize: 1,
  });

  const { total: windowsMalwareTotal } = useMalware({
    filters: {
      x_mitre_platforms: ['Windows'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: macOSMalwareTotal } = useMalware({
    filters: {
      x_mitre_platforms: ['macOS'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: linuxMalwareTotal } = useMalware({
    filters: {
      x_mitre_platforms: ['Linux'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: networkDevicesMalwareTotal } = useMalware({
    filters: {
      x_mitre_platforms: ['Network Devices'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: esxiMalwareTotal } = useMalware({
    filters: {
      x_mitre_platforms: ['ESXi'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: saasMalwareTotal } = useMalware({
    filters: {
      x_mitre_platforms: ['SaaS'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: iaasMalwareTotal } = useMalware({
    filters: {
      x_mitre_platforms: ['IaaS'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: containersMalwareTotal } = useMalware({
    filters: {
      x_mitre_platforms: ['Containers'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: preMalwareTotal } = useMalware({
    filters: {
      x_mitre_platforms: ['PRE'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: officeSuiteMalwareTotal } = useMalware({
    filters: {
      x_mitre_platforms: ['Office Suite'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: office365MalwareTotal } = useMalware({
    filters: {
      x_mitre_platforms: ['Office 365'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: identityProviderMalwareTotal } = useMalware({
    filters: {
      x_mitre_platforms: ['Identity Provider'],
    },
    page: 1,
    pageSize: 1,
  });

  const { total: windowsAttackPatternTotal } = useAttackPatterns({
    filters: {
      x_mitre_platforms: ['Windows'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: macOSAttackPatternTotal } = useAttackPatterns({
    filters: {
      x_mitre_platforms: ['macOS'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: linuxAttackPatternTotal } = useAttackPatterns({
    filters: {
      x_mitre_platforms: ['Linux'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: networkDevicesAttackPatternTotal } = useAttackPatterns({
    filters: {
      x_mitre_platforms: ['Network Devices'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: esxiAttackPatternTotal } = useAttackPatterns({
    filters: {
      x_mitre_platforms: ['ESXi'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: saasAttackPatternTotal } = useAttackPatterns({
    filters: {
      x_mitre_platforms: ['SaaS'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: iaasAttackPatternTotal } = useAttackPatterns({
    filters: {
      x_mitre_platforms: ['IaaS'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: containersAttackPatternTotal } = useAttackPatterns({
    filters: {
      x_mitre_platforms: ['Containers'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: preAttackPatternTotal } = useAttackPatterns({
    filters: {
      x_mitre_platforms: ['PRE'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: officeSuiteAttackPatternTotal } = useAttackPatterns({
    filters: {
      x_mitre_platforms: ['Office Suite'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: office365AttackPatternTotal } = useAttackPatterns({
    filters: {
      x_mitre_platforms: ['Office 365'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: identityProviderAttackPatternTotal } = useAttackPatterns({
    filters: {
      x_mitre_platforms: ['Identity Provider'],
    },
    page: 1,
    pageSize: 1,
  });

  const { total: windowsToolTotal } = useTools({
    filters: {
      x_mitre_platforms: ['Windows'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: macOSToolTotal } = useTools({
    filters: {
      x_mitre_platforms: ['macOS'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: linuxToolTotal } = useTools({
    filters: {
      x_mitre_platforms: ['Linux'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: officeSuiteToolTotal } = useTools({
    filters: {
      x_mitre_platforms: ['Office Suite'],
    },
    page: 1,
    pageSize: 1,
  });
  const { total: SaaSToolTotal } = useTools({
    filters: {
      x_mitre_platforms: ['SaaS'],
    },
    page: 1,
    pageSize: 1,
  });

  const { reports: reportData } = useReports({
    filters: {},
    page: 1,
    pageSize: 6,
  });

  const { tools: toolsData } = useTools({
    filters: {},
    page: 1,
    pageSize: 5,
  });

  const { vulnerabilities: vulnerabilitiesData } = useVulnerabilities({
    filters: {},
    page: 1,
    pageSize: 5,
  });

  const position: [number, number] = [0, 0];
  const zoom = 1;

  const navigate = useNavigate();
  const handleViewReport = (id: string) => navigate(`/reports/${id}`);
  const handleViewTool = (id: string) => navigate(`/tools/${id}`);
  const handleViewVulnerability = (id: string) =>
    navigate(`/vulnerabilities/${id}`);

  return (
    <div className="w-full p-6 space-y-6 mx-auto">
      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="!shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <FileText className="h-6 w-6" />
            <Badge variant="outline" className="text-green-600">
              +{}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportTotal}</div>
            <p className="text-xs text-muted-foreground">Reports</p>
          </CardContent>
        </Card>
        <Card className="!shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <Network className="h-6 w-6" />
            <Badge variant="outline" className="text-green-600">
              +{}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{intrusionTotal}</div>
            <p className="text-xs text-muted-foreground">Intrusion Sets</p>
          </CardContent>
        </Card>
        <Card className="!shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <Activity className="h-6 w-6" />
            <Badge variant="outline" className="text-green-600">
              +{}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaignTotal}</div>
            <p className="text-xs text-muted-foreground">Campaigns</p>
          </CardContent>
        </Card>
        <Card className="!shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <Bug className="h-6 w-6" />
            <Badge variant="outline" className="text-green-600">
              +{}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{malwareTotal}</div>
            <p className="text-xs text-muted-foreground">Malware</p>
          </CardContent>
        </Card>
        <Card className="!shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <List className="h-6 w-6" />
            <Badge variant="outline" className="text-green-600">
              +{}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{indicatorTotal}</div>
            <p className="text-xs text-muted-foreground">Indicators</p>
          </CardContent>
        </Card>
        <Card className="!shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <Globe className="h-6 w-6" />
            <Badge variant="outline" className="text-green-600">
              +{}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{observableTotal}</div>
            <p className="text-xs text-muted-foreground">Observables</p>
          </CardContent>
        </Card>
      </div>

      {/* Threat Landscape Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Threat Trend Analysis */}
          <div className="grid grid-cols-4 gap-4 h-auto">
            {/* <RadialChart /> */}
            <PieChartDonut />
            <div className="lg:col-span-2 h-112 overflow-hidden border rounded-xl shadow-sm">
              <MapContainer
                center={position}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                dragging={true}
                doubleClickZoom={true}
                attributionControl={false}
              >
                <ResizeHandler />

                {/* Minimal basemap: CartoDB Positron (light, minimal borders, no green) */}
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Overlay country borders */}
                <GeoJSON
                  data={countries as any}
                  style={{ color: '#222', weight: 1, fillOpacity: 0 }}
                />
              </MapContainer>
            </div>
            {/* <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  Critical Vulnerabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CVE ID</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right">
                        Affected Systems
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vulnerabilities.map((vuln) => (
                      <TableRow key={vuln.name}>
                        <TableCell>{vuln.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              vuln.severity === 'Critical'
                                ? 'destructive'
                                : vuln.severity === 'High'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {vuln.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {vuln.count}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card> */}
            <AreaChartGradient />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto">
            <BarChartInteractive
              title="Industry Targeted Threats"
              titleDescription="Industry areas which are targeted by different threats"
              chartData={
                [
                  {
                    object: 'Campaign',
                    enterprise: campaignEnterpriseTotal || 0,
                    ics: campaignICSTotal || 0,
                    mobile: campaignMobileTotal || 0,
                  },
                  {
                    object: 'Malware',
                    enterprise: malwareEnterpriseTotal || 0,
                    ics: malwareICSTotal || 0,
                    mobile: malwareMobileTotal || 0,
                  },
                  {
                    object: 'Intrusion Set',
                    enterprise: intrusionEnterpriseTotal || 0,
                    ics: intrusionICSTotal || 0,
                    mobile: intrusionMobileTotal || 0,
                  },
                  {
                    object: 'Attack Pattern',
                    enterprise: attackPatternEnterpriseTotal || 0,
                    ics: attackPatternICSTotal || 0,
                    mobile: attackPatternMobileTotal || 0,
                  },
                  {
                    object: 'Course of Action',
                    enterprise: courseOfActionEnterpriseTotal || 0,
                    ics: courseOfActionICSTotal || 0,
                    mobile: courseOfActionMobileTotal || 0,
                  },
                  {
                    object: 'Tool',
                    enterprise: toolEnterpriseTotal || 0,
                    ics: toolICSTotal || 0,
                    mobile: toolMobileTotal || 0,
                  },
                ] as (typeof barchartInteractive)[]
              }
              className="lg:col-span-2"
            />
            <RadialChart
              title="Tools Target Platforms"
              titleDescription="Distribution of tools across different platforms"
              chartData={[
                {
                  platform: 'windows',
                  tools: windowsToolTotal,
                  fill: 'var(--color-windows)',
                },
                {
                  platform: 'macos',
                  tools: macOSToolTotal,
                  fill: 'var(--color-macos)',
                },
                {
                  platform: 'linux',
                  tools: linuxToolTotal,
                  fill: 'var(--color-linux)',
                },
                {
                  platform: 'saas',
                  tools: SaaSToolTotal,
                  fill: 'var(--color-saas)',
                },
                {
                  platform: 'office_suite',
                  tools: officeSuiteToolTotal,
                  fill: 'var(--color-office_suite)',
                },
              ]}
            />
            <LineChartCustomLabel
              title="Threat Distribution"
              titleDescription="The threat distribution focused on malicious objects"
              chartData={[
                {
                  object: 'urls',
                  entities: urlsDataTotal,
                  fill: 'var(--color-urls)',
                },
                {
                  object: 'domain_names',
                  entities: domainsDataTotal,
                  fill: 'var(--color-domain_names)',
                },
                {
                  object: 'ipv4_addresses',
                  entities: ipv4sDataTotal,
                  fill: 'var(--color-ipv4_addresses)',
                },
                {
                  object: 'files',
                  entities: filesDataTotal,
                  fill: 'var(--color-files)',
                },
                {
                  object: 'indicators',
                  entities: indicatorTotal,
                  fill: 'var(--color-indicators)',
                },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto">
            {/* Targeted Regions */}
            <BarChartHorizontal
              title="Malware Target Platforms"
              titleDescription="Distribution of malware across different platforms"
              label="Malware"
              chartData={
                [
                  {
                    platform: 'Windows',
                    entity: windowsMalwareTotal,
                  },
                  {
                    platform: 'macOS',
                    entity: macOSMalwareTotal,
                  },
                  {
                    platform: 'Linux',
                    entity: linuxMalwareTotal,
                  },
                  {
                    platform: 'Network Devices',
                    entity: networkDevicesMalwareTotal,
                  },
                  {
                    platform: 'ESXi',
                    entity: esxiMalwareTotal,
                  },
                  {
                    platform: 'SaaS',
                    entity: saasMalwareTotal,
                  },
                  {
                    platform: 'IaaS',
                    entity: iaasMalwareTotal,
                  },
                  {
                    platform: 'Containers',
                    entity: containersMalwareTotal,
                  },
                  {
                    platform: 'PRE',
                    entity: preMalwareTotal,
                  },
                  {
                    platform: 'Office Suite',
                    entity: officeSuiteMalwareTotal,
                  },
                  {
                    platform: 'Office 365',
                    entity: office365MalwareTotal,
                  },
                  {
                    platform: 'Identity Provider',
                    entity: identityProviderMalwareTotal,
                  },
                ] as (typeof barChart_chartData)[]
              }
            />
            <BarChartHorizontal
              title="Attack Pattern Target Platforms"
              titleDescription="Distribution of attack patterns across different platforms"
              label="Attack Patterns"
              chartData={
                [
                  {
                    platform: 'Windows',
                    entity: windowsAttackPatternTotal,
                  },
                  {
                    platform: 'macOS',
                    entity: macOSAttackPatternTotal,
                  },
                  {
                    platform: 'Linux',
                    entity: linuxAttackPatternTotal,
                  },
                  {
                    platform: 'Network Devices',
                    entity: networkDevicesAttackPatternTotal,
                  },
                  {
                    platform: 'ESXi',
                    entity: esxiAttackPatternTotal,
                  },
                  {
                    platform: 'SaaS',
                    entity: saasAttackPatternTotal,
                  },
                  {
                    platform: 'IaaS',
                    entity: iaasAttackPatternTotal,
                  },
                  {
                    platform: 'Containers',
                    entity: containersAttackPatternTotal,
                  },
                  {
                    platform: 'PRE',
                    entity: preAttackPatternTotal,
                  },
                  {
                    platform: 'Office Suite',
                    entity: officeSuiteAttackPatternTotal,
                  },
                  {
                    platform: 'Office 365',
                    entity: office365AttackPatternTotal,
                  },
                  {
                    platform: 'Identity Provider',
                    entity: identityProviderAttackPatternTotal,
                  },
                ] as (typeof barChart_chartData)[]
              }
            />
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-violet-500" />
                  Security Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Report Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.map((report) => (
                      <TableRow
                        key={report.id}
                        onClick={() => handleViewReport(report.id)}
                        className="hover:bg-gray-50 transition-colors border-b border-gray-300 cursor-pointer"
                      >
                        <TableCell className="p-4">
                          <Badge
                            variant="outline"
                            className="text-violet-500 border-violet-500 bg-violet-50 px-8"
                          >
                            <FileTextIcon className="h-5 w-5 text-violet-600" />
                            Report
                          </Badge>
                        </TableCell>
                        <TableCell className="p-4 font-medium text-gray-900 hover:underline max-w-100 truncate">
                          {report.name}
                        </TableCell>
                        <TableCell className="p-4 text-gray-700">
                          {Array.isArray(report.report_types)
                            ? report.report_types.join(', ')
                            : typeof report.report_types === 'string' &&
                              report.report_types
                            ? report.report_types
                            : ''}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Vulnerability & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Vulnerabilities */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HammerIcon className="h-6 w-6 text-fuchsia-500" />
              Recently Used Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Modified</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {toolsData.map((tool) => (
                  <TableRow
                    key={tool.id}
                    onClick={() => handleViewTool(tool.id)}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-300 cursor-pointer"
                  >
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-fuchsia-500 border-fuchsia-500 bg-fuchsia-50 px-8"
                      >
                        <HammerIcon className="h-5 w-5 text-fuchsia-600" />
                        Tool
                      </Badge>
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-900 hover:underline max-w-100 truncate">
                      {tool.name}
                    </TableCell>
                    <TableCell className="p-4">
                      {tool.x_mitre_platforms != null ? (
                        tool.x_mitre_platforms.map((platform) => (
                          <Badge
                            variant="outline"
                            className="border-2 text-amber-500 border-amber-500 bg-amber-50 px-4"
                          >
                            {platform}
                          </Badge>
                        ))
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-2 text-neutral-500 border-neutral-500 bg-neutral-50 px-4"
                        >
                          Unknown
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="p-4">
                      {new Date(tool.created).toUTCString()}
                    </TableCell>
                    <TableCell className="p-4">
                      {new Date(tool.modified).toUTCString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Real-time Activity Feed */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TriangleAlert className="h-6 w-6 text-red-500" />
              Recent Vulnerabilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Platforms</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vulnerabilitiesData.map((vulnerability) => (
                  <TableRow
                    key={vulnerability.id}
                    onClick={() => handleViewVulnerability(vulnerability.id)}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-300 cursor-pointer"
                  >
                    <TableCell className="p-4">
                      <Badge
                        variant="outline"
                        className="text-red-500 border-red-500 bg-red-50 px-4"
                      >
                        <ShieldAlert className="h-5 w-5 text-red-600" />
                        Vulnerability
                      </Badge>
                    </TableCell>
                    <TableCell className="p-4 font-medium text-gray-900 hover:underline max-w-100 truncate">
                      {vulnerability.name}
                    </TableCell>
                    <TableCell className="p-4">
                      {vulnerability.x_mitre_platforms != null ? (
                        vulnerability.x_mitre_platforms.map((platform) => (
                          <Badge
                            variant="outline"
                            className="border-2 text-amber-500 border-amber-500 bg-amber-50 px-4"
                          >
                            {platform}
                          </Badge>
                        ))
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-2 text-neutral-500 border-neutral-500 bg-neutral-50 px-4"
                        >
                          Unknown
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <FileText className="h-6 w-6" />
            <Badge variant="outline" className="text-green-600">
              +
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filesDataTotal}</div>
            <p className="text-xs text-muted-foreground">Files</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Link2Icon className="h-6 w-6" />
            <Badge variant="outline" className="text-green-600">
              +
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{urlsDataTotal}</div>
            <p className="text-xs text-muted-foreground">URLs</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <ServerIcon className="h-6 w-6" />
            <Badge variant="outline" className="text-green-600">
              +
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{domainsDataTotal}</div>
            <p className="text-xs text-muted-foreground">Domain Names</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CpuIcon className="h-6 w-6" />
            <Badge variant="outline" className="text-green-600">
              +
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ipv4sDataTotal}</div>
            <p className="text-xs text-muted-foreground">IPv4 Addresses</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
