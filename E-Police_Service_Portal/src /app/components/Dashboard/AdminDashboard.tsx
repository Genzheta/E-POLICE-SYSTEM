import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Users, 
  Shield, 
  TrendingUp, 
  Activity,
  DollarSign,
  AlertCircle,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  userName: string;
}

// Mock Analytics Data
const monthlyFinesData = [
  { month: 'Aug', fines: 45, revenue: 6750 },
  { month: 'Sep', fines: 52, revenue: 7800 },
  { month: 'Oct', fines: 38, revenue: 5700 },
  { month: 'Nov', fines: 61, revenue: 9150 },
  { month: 'Dec', fines: 55, revenue: 8250 },
  { month: 'Jan', fines: 48, revenue: 7200 },
  { month: 'Feb', fines: 67, revenue: 10050 },
];

const casesData = [
  { month: 'Aug', opened: 12, closed: 8 },
  { month: 'Sep', opened: 15, closed: 11 },
  { month: 'Oct', opened: 18, closed: 14 },
  { month: 'Nov', opened: 14, closed: 16 },
  { month: 'Dec', opened: 20, closed: 15 },
  { month: 'Jan', opened: 17, closed: 19 },
  { month: 'Feb', opened: 22, closed: 18 },
];

const violationTypes = [
  { name: 'Speeding', value: 145, color: '#ef4444' },
  { name: 'Parking', value: 98, color: '#f59e0b' },
  { name: 'Red Light', value: 76, color: '#eab308' },
  { name: 'Phone Usage', value: 54, color: '#3b82f6' },
  { name: 'Other', value: 32, color: '#8b5cf6' },
];

const complaintTypes = [
  { name: 'Theft', value: 28, color: '#ef4444' },
  { name: 'Noise', value: 45, color: '#f59e0b' },
  { name: 'Vandalism', value: 32, color: '#eab308' },
  { name: 'Harassment', value: 19, color: '#3b82f6' },
  { name: 'Other', value: 23, color: '#8b5cf6' },
];

const mockUsers = [
  { id: 'U-001', name: 'John Doe', email: 'john@example.com', role: 'citizen', status: 'active', registered: '2025-08-15' },
  { id: 'U-002', name: 'Officer Davis', email: 'davis@police.gov', role: 'police', status: 'active', registered: '2024-05-10' },
  { id: 'U-003', name: 'Jane Smith', email: 'jane@example.com', role: 'citizen', status: 'active', registered: '2025-09-20' },
  { id: 'U-004', name: 'Officer Johnson', email: 'johnson@police.gov', role: 'police', status: 'active', registered: '2024-03-15' },
];

const systemLogs = [
  { id: 1, timestamp: '2026-02-17 14:23:45', user: 'Officer Davis', action: 'Issued traffic fine TF-2026-001', type: 'fine' },
  { id: 2, timestamp: '2026-02-17 13:15:22', user: 'John Doe', action: 'Paid fine TF-2026-002', type: 'payment' },
  { id: 3, timestamp: '2026-02-17 12:45:10', user: 'Admin', action: 'Updated system settings', type: 'system' },
  { id: 4, timestamp: '2026-02-17 11:30:05', user: 'Officer Johnson', action: 'Closed case CS-2026-145', type: 'case' },
  { id: 5, timestamp: '2026-02-17 10:22:33', user: 'Jane Smith', action: 'Submitted complaint CP-2026-045', type: 'complaint' },
];

export function AdminDashboard({ userName }: AdminDashboardProps) {
  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-green-600">Active</Badge>
      : <Badge variant="destructive">Inactive</Badge>;
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-600">Admin</Badge>;
      case 'police':
        return <Badge className="bg-blue-600">Police</Badge>;
      case 'citizen':
        return <Badge className="bg-gray-600">Citizen</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl mb-2">Admin Control Panel</h1>
          <p className="text-purple-100">Welcome, {userName} - System Overview & Management</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl">10,248</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% this month</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Officers</p>
                  <p className="text-2xl">156</p>
                  <p className="text-xs text-green-600 mt-1">98% online</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl">$10,050</p>
                  <p className="text-xs text-green-600 mt-1">↑ 8% vs last month</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">System Health</p>
                  <p className="text-2xl">99.8%</p>
                  <p className="text-xs text-green-600 mt-1">All systems operational</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="logs">
              <Activity className="h-4 w-4 mr-2" />
              System Logs
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Shield className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid gap-6">
              {/* Overview Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Total Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Open</span>
                        <span className="text-2xl font-bold">45</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Closed</span>
                        <span className="text-2xl font-bold text-green-600">238</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Success Rate</span>
                        <span className="text-lg font-bold text-blue-600">84%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Complaints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Pending</span>
                        <span className="text-2xl font-bold text-orange-600">23</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Resolved</span>
                        <span className="text-2xl font-bold text-green-600">512</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Response Time</span>
                        <span className="text-lg font-bold text-blue-600">2.3h</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Traffic Fines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Issued</span>
                        <span className="text-2xl font-bold">405</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Paid</span>
                        <span className="text-2xl font-bold text-green-600">338</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Payment Rate</span>
                        <span className="text-lg font-bold text-blue-600">83%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row 1 */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Fine Statistics</CardTitle>
                    <CardDescription>Traffic fines issued and revenue collected</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyFinesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="fines" stroke="#3b82f6" strokeWidth={2} name="Fines Issued" />
                        <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue ($)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Case Management Trends</CardTitle>
                    <CardDescription>Cases opened vs closed over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={casesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="opened" fill="#f59e0b" name="Opened" />
                        <Bar dataKey="closed" fill="#10b981" name="Closed" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row 2 - Pie Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Violation Types Distribution</CardTitle>
                    <CardDescription>Breakdown of traffic violations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RePieChart>
                        <Pie
                          data={violationTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {violationTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Complaint Categories</CardTitle>
                    <CardDescription>Distribution of complaint types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RePieChart>
                        <Pie
                          data={complaintTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {complaintTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage all system users and their permissions</CardDescription>
                  </div>
                  <Button className="bg-purple-900">
                    <Users className="h-4 w-4 mr-2" />
                    Add New User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-mono text-sm">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.registered}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Logs Tab */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>System Activity Logs</CardTitle>
                <CardDescription>Real-time system activity and audit trail</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Activity className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{log.action}</p>
                        <div className="flex gap-4 mt-1 text-sm text-gray-600">
                          <span>User: {log.user}</span>
                          <span>•</span>
                          <span>{log.timestamp}</span>
                        </div>
                      </div>
                      <Badge className="capitalize">{log.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Security Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
                          </div>
                          <Badge className="bg-green-600">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">Session Timeout</p>
                            <p className="text-sm text-gray-600">Auto-logout after 30 minutes</p>
                          </div>
                          <Button size="sm" variant="outline">Configure</Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Payment Gateway</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">Payment Provider</p>
                            <p className="text-sm text-gray-600">Stripe Integration</p>
                          </div>
                          <Badge className="bg-green-600">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">Auto-Receipt Generation</p>
                            <p className="text-sm text-gray-600">Email receipts automatically</p>
                          </div>
                          <Badge className="bg-green-600">Enabled</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Notification Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-600">Send updates via email</p>
                          </div>
                          <Badge className="bg-green-600">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">SMS Alerts</p>
                            <p className="text-sm text-gray-600">Critical alerts via SMS</p>
                          </div>
                          <Badge className="bg-green-600">Enabled</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Database Management</CardTitle>
                  <CardDescription>Database backup and maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded">
                      <div>
                        <p className="font-medium">Last Backup</p>
                        <p className="text-sm text-gray-600">February 17, 2026 at 2:00 AM</p>
                      </div>
                      <Button variant="outline">Backup Now</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded">
                      <div>
                        <p className="font-medium">Database Size</p>
                        <p className="text-sm text-gray-600">2.4 GB</p>
                      </div>
                      <Button variant="outline">Optimize</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
