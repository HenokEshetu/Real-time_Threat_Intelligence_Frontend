import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import {
  AreaChartGradient,
  BarChartCustomLabel,
  BarChartHorizontal,
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
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';

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
  const summaryData = [
    {
      id: 1,
      title: 'Threat Actors',
      total: 245,
      daily: 12,
      icon: <ShieldAlert className="h-6 w-6" />,
    },
    {
      id: 2,
      title: 'Intrusion Sets',
      total: 143,
      daily: 8,
      icon: <Network className="h-6 w-6" />,
    },
    {
      id: 3,
      title: 'Campaigns',
      total: 89,
      daily: 5,
      icon: <Activity className="h-6 w-6" />,
    },
    {
      id: 4,
      title: 'Malwares',
      total: 367,
      daily: 23,
      icon: <Bug className="h-6 w-6" />,
    },
    {
      id: 5,
      title: 'Indicators',
      total: 1567,
      daily: 145,
      icon: <List className="h-6 w-6" />,
    },
    {
      id: 6,
      title: 'Observables',
      total: 4789,
      daily: 389,
      icon: <Globe className="h-6 w-6" />,
    },
  ];

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

  const position = [0, 0];
  const zoom = 1;

  return (
    <div className="w-full p-6 space-y-6 mx-auto">
      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {summaryData.map((item) => (
          <Card key={item.id} className="!shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
              {item.icon}
              <Badge variant="outline" className="text-green-600">
                +{item.daily}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.total}</div>
              <p className="text-xs text-muted-foreground">{item.title}</p>
            </CardContent>
          </Card>
        ))}
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
                zoomControl={true}
                dragging={true}
                doubleClickZoom={true}
                attributionControl={false}
              >
                <ResizeHandler />

                {/* Add zoom control in bottom right */}
                <ZoomControl position="bottomright" />

                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto">
        <RadialChart />
        <BarChartInteractive className="lg:col-span-2" />
        <BarChartCustomLabel />
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

export default Dashboard;
