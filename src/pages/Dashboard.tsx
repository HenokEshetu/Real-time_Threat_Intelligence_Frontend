import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import {
  AreaChartGradient,
  BarChartCustomLabel,
  BarChartHorizontal,
  barchartInteractive,
  BarChartInteractive,
  PieChartInteractive,
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
  const { total: observableTotal } = useObservables({
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

  // Chart Data
  const targetedRegions = [
    { region: 'North America', Incidents: 245 },
    { region: 'Europe', Incidents: 189 },
    { region: 'Asia', Incidents: 156 },
  ];

  const targetedSectors = [
    { sector: 'Finance', count: 45 },
    { sector: 'Healthcare', count: 32 },
    { sector: 'Energy', count: 28 },
    { sector: 'Government', count: 41 },
  ];

  const malwareDistribution = [
    { name: 'Ransomware', value: 35 },
    { name: 'Spyware', value: 25 },
    { name: 'Trojan', value: 20 },
  ];

  // Reports Data
  const securityReports = [
    {
      id: 1,
      title: 'Q3 Threat Landscape Analysis',
      date: '2024-09-15',
      type: 'PDF',
      status: 'Published',
    },
    {
      id: 2,
      title: 'APT Group Activity Report',
      date: '2024-09-10',
      type: 'DOCX',
      status: 'Draft',
    },
    {
      id: 3,
      title: 'Monthly Security Audit',
      date: '2024-09-01',
      type: 'PDF',
      status: 'Archived',
    },
  ];

  // Other Data
  const threatTrends = [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 60 },
    { month: 'Mar', count: 75 },
  ];

  const vulnerabilities = [
    { name: 'CVE-2024-1234', severity: 'Critical', count: 45 },
    { name: 'CVE-2024-5678', severity: 'High', count: 32 },
    { name: 'CVE-2024-9012', severity: 'Medium', count: 28 },
  ];

  const ttps = [
    { technique: 'Credential Dumping', frequency: 120 },
    { technique: 'Phishing', frequency: 95 },
    { technique: 'Lateral Movement', frequency: 75 },
  ];

  const activityFeed = [
    { time: '2m ago', event: 'New IOC detected in network logs' },
    { time: '15m ago', event: 'Malware signature updated' },
    { time: '1h ago', event: 'Suspicious domain blocked' },
  ];

  const position: [number, number] = [0, 0];
  const zoom = 1;

  const totalThreatActorQuery = gql`
    query GetThreatActorCount {
      searchThreatActors(page: 1, pageSize: 1) {
        total
      }
    }
  `;

  const threatActorIn24hQuery = gql`
    query ThreatActorsLast24Hours($timestamp: String!) {
      searchThreatActors(
        filters: {
          created: $timestamp # Replace with a dynamic 24h-old timestamp
        }
        page: 1
        pageSize: 1
      ) {
        total # Number of threat actors created in the last 24 hours
      }
    }
  `;

  const totalIntrusionSetQuery = gql`
    query GetIntrusionSetCount {
      searchIntrusionSets(page: 1, pageSize: 1) {
        total
      }
    }
  `;

  const [twentyFourHoursAgo, setTwentyFourHoursAgo] = useState('');

  useEffect(() => {
    // Calculate 24 hours ago timestamp
    const date = new Date();
    date.setHours(date.getHours() - 24);
    setTwentyFourHoursAgo(date.toISOString());
  }, []);

  const {
    data: totalData,
    loading: totalLoading,
    error: totalError,
  } = useQuery(totalThreatActorQuery);

  // Fetch 24h threat actors
  const {
    data: last24hData,
    loading: last24hLoading,
    error: last24hError,
  } = useQuery(threatActorIn24hQuery, {
    variables: { timestamp: twentyFourHoursAgo },
  });

  if (totalLoading || last24hLoading) return <Loading />;
  if (totalError) return <div>Error: {totalError.message}</div>;
  if (last24hError) return <div>Error: {last24hError.message}</div>;

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
            <PieChartInteractive />
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
            <RadialChart />
            <BarChartCustomLabel />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto">
            {/* Targeted Regions */}
            <BarChartHorizontal />
            <BarChartHorizontal />
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Security Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          {report.title}
                        </TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              report.status === 'Published'
                                ? 'default'
                                : report.status === 'Draft'
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {report.status}
                          </Badge>
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
              <Factory className="h-6 w-6" />
              Targeted Sectors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sector</TableHead>
                  <TableHead className="text-right">Incidents</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {targetedSectors.map((sector) => (
                  <TableRow key={sector.sector}>
                    <TableCell>{sector.sector}</TableCell>
                    <TableCell className="text-right">{sector.count}</TableCell>
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
              <Activity className="h-6 w-6" />
              Real-time Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityFeed.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                <div>
                  <p className="font-medium">{activity.event}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Shield className="h-6 w-6" />
            <Badge variant="outline" className="text-green-600">
              +12%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Prevention Rate</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <AlertCircle className="h-6 w-6" />
            <Badge variant="outline" className="text-red-600">
              -8%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4s</div>
            <p className="text-xs text-muted-foreground">Avg. Response Time</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Globe className="h-6 w-6" />
            <Badge variant="outline" className="text-blue-600">
              +23
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Active Connections</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Hammer className="h-6 w-6" />
            <Badge variant="outline" className="text-purple-600">
              +5
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Mitigation Actions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
