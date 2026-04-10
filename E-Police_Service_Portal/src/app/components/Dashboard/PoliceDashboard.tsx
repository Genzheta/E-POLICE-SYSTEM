// src/app/components/Dashboard/PoliceDashboard.tsx

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  FileText, 
  AlertCircle, 
  DollarSign, 
  CheckCircle,
  Users,
  TrendingUp,
  Plus,
  Search,
  Eye,
  Edit,
  Clock
} from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { toast } from 'sonner';

interface PoliceDashboardProps {
  userName: string;
}

// Mock Data
const mockCases = [
  { id: 'CS-2026-234', type: 'Stolen Vehicle', citizen: 'John Smith', filedDate: '2026-02-01', status: 'investigating', priority: 'high' },
  { id: 'CS-2026-198', type: 'Identity Theft', citizen: 'Sarah Johnson', filedDate: '2026-01-10', status: 'investigating', priority: 'medium' },
  { id: 'CS-2026-145', type: 'Burglary', citizen: 'Mike Brown', filedDate: '2025-12-15', status: 'closed', priority: 'high' },
];

const mockComplaints = [
  { id: 'CP-2026-045', citizen: 'Emma Wilson', type: 'Noise Complaint', date: '2026-02-12', status: 'in-progress', priority: 'medium' },
  { id: 'CP-2026-032', citizen: 'David Lee', type: 'Theft Report', date: '2026-01-20', status: 'resolved', priority: 'high' },
  { id: 'CP-2026-018', citizen: 'Lisa Garcia', type: 'Vandalism', date: '2025-12-15', status: 'new', priority: 'medium' },
];

const mockFines = [
  { id: 'TF-2026-001', citizen: 'John Doe', violation: 'Speeding', location: 'Highway 5', amount: 150, status: 'pending', date: '2026-02-10' },
  { id: 'TF-2026-002', citizen: 'Jane Smith', violation: 'Illegal Parking', location: 'Main Street', amount: 50, status: 'paid', date: '2026-01-28' },
];

const mockReportRequests = [
  { id: 'RP-2026-089', citizen: 'Robert Clark', type: 'Character Certificate', requestDate: '2026-02-14', status: 'pending' },
  { id: 'RP-2026-076', citizen: 'Maria Rodriguez', type: 'Accident Report', requestDate: '2026-01-25', status: 'approved' },
];

const mockCitizens = [
  { id: 'CTZ-001', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', registeredDate: '2025-08-15' },
  { id: 'CTZ-002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', registeredDate: '2025-09-20' },
  { id: 'CTZ-003', name: 'Mike Johnson', email: 'mike@example.com', phone: '+1234567892', registeredDate: '2025-10-10' },
];

export function PoliceDashboard({ userName }: PoliceDashboardProps) {
  const [showIssueTicketForm, setShowIssueTicketForm] = useState(false);
  const [showNewCaseForm, setShowNewCaseForm] = useState(false);
  const [cases, setCases] = useState(mockCases);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
      case 'new':
        return <Badge variant="destructive">New</Badge>;
      case 'paid':
      case 'approved':
        return <Badge className="bg-green-600">Approved</Badge>;
      case 'in-progress':
      case 'investigating':
        return <Badge className="bg-blue-600">In Progress</Badge>;
      case 'resolved':
      case 'closed':
        return <Badge className="bg-green-600">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge className="bg-orange-600">Medium</Badge>;
      case 'low':
        return <Badge className="bg-gray-600">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const handleIssueTicket = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('E-Ticket issued successfully!');
    setShowIssueTicketForm(false);
  };

  const handleUpdateCase = () => {
    toast.success('Case updated successfully!');
  };

  const handleNewCase = (e: React.FormEvent) => {
    e.preventDefault();
    const citizenName = (document.getElementById('citizen-name') as HTMLInputElement)?.value || 'Unknown Reporter';
    
    const newCase = {
      id: `CS-2026-${Math.floor(Math.random() * 900) + 100}`,
      type: 'General Case',
      citizen: citizenName,
      filedDate: new Date().toISOString().split('T')[0],
      status: 'investigating',
      priority: 'high'
    };

    setCases([newCase, ...cases]);
    toast.success('Case successfully created!');
    setShowNewCaseForm(false);
  };

  const handleProcessReport = () => {
    toast.success('Report processed and sent to citizen!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl mb-2">Officer Dashboard</h1>
          <p className="text-blue-100">Welcome, {userName} - Manage cases, complaints, and citizen services</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Cases</p>
                  <p className="text-2xl">{cases.filter(c => c.status === 'investigating').length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Complaints</p>
                  <p className="text-2xl">{mockComplaints.filter(c => c.status !== 'resolved').length}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Fines Issued</p>
                  <p className="text-2xl">{mockFines.length}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Report Requests</p>
                  <p className="text-2xl">{mockReportRequests.filter(r => r.status === 'pending').length}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="cases" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="cases">
              <FileText className="h-4 w-4 mr-2" />
              Cases
            </TabsTrigger>
            <TabsTrigger value="complaints">
              <AlertCircle className="h-4 w-4 mr-2" />
              Complaints
            </TabsTrigger>
            <TabsTrigger value="fines">
              <DollarSign className="h-4 w-4 mr-2" />
              E-Ticketing
            </TabsTrigger>
            <TabsTrigger value="reports">
              <CheckCircle className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="citizens">
              <Users className="h-4 w-4 mr-2" />
              Citizens
            </TabsTrigger>
          </TabsList>

          {/* Cases Management Tab */}
          <TabsContent value="cases">
            <div className="grid gap-6">
              {!showNewCaseForm ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Case Management</CardTitle>
                        <CardDescription>Manage and track all active cases</CardDescription>
                      </div>
                      <Button className="bg-blue-900" onClick={() => setShowNewCaseForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Case
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex gap-2">
                        <Input placeholder="Search cases..." className="max-w-sm" />
                        <Button variant="outline" onClick={() => toast.info('Searching cases...')}>
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Case ID</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Citizen</TableHead>
                          <TableHead>Filed Date</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cases.map((caseItem) => (
                          <TableRow key={caseItem.id}>
                            <TableCell className="font-mono text-sm">{caseItem.id}</TableCell>
                            <TableCell>{caseItem.type}</TableCell>
                            <TableCell>{caseItem.citizen}</TableCell>
                            <TableCell>{caseItem.filedDate}</TableCell>
                            <TableCell>{getPriorityBadge(caseItem.priority)}</TableCell>
                            <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => toast.info('View case details loading...')}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={handleUpdateCase}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Open New Case</CardTitle>
                    <CardDescription>File a new case report into the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleNewCase} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="case-type">Case Type</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="theft">Theft</SelectItem>
                              <SelectItem value="burglary">Burglary</SelectItem>
                              <SelectItem value="assault">Assault</SelectItem>
                              <SelectItem value="fraud">Fraud / Identity Theft</SelectItem>
                              <SelectItem value="vehicle">Stolen Vehicle</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="priority">Priority</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="citizen-name">Citizen/Reporter Name</Label>
                          <Input id="citizen-name" placeholder="John Doe" required />
                        </div>
                        <div>
                          <Label htmlFor="citizen-contact">Citizen Contact</Label>
                          <Input id="citizen-contact" placeholder="+1234567890" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="case-description">Case Description</Label>
                        <Textarea 
                          id="case-description" 
                          placeholder="Provide a detailed description of the incident..." 
                          rows={5}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="case-evidence">Upload Initial Evidence (Optional)</Label>
                        <Input id="case-evidence" type="file" multiple />
                      </div>

                      <div className="flex gap-3">
                        <Button type="submit" className="bg-blue-900">
                          Create Case
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setShowNewCaseForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Complaints Tab */}
          <TabsContent value="complaints">
            <Card>
              <CardHeader>
                <CardTitle>Complaint Management</CardTitle>
                <CardDescription>Handle citizen complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Complaint ID</TableHead>
                      <TableHead>Citizen</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockComplaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-mono text-sm">{complaint.id}</TableCell>
                        <TableCell>{complaint.citizen}</TableCell>
                        <TableCell>{complaint.type}</TableCell>
                        <TableCell>{complaint.date}</TableCell>
                        <TableCell>{getPriorityBadge(complaint.priority)}</TableCell>
                        <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => toast.info('View complaint details loading...')}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => toast.success('Response draft opened')}>
                              Respond
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

          {/* E-Ticketing Tab */}
          <TabsContent value="fines">
            <div className="grid gap-6">
              {!showIssueTicketForm ? (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Traffic Fine Management</CardTitle>
                          <CardDescription>Issue and manage traffic violations</CardDescription>
                        </div>
                        <Button 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => setShowIssueTicketForm(true)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Issue E-Ticket
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ticket ID</TableHead>
                            <TableHead>Citizen</TableHead>
                            <TableHead>Violation</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockFines.map((fine) => (
                            <TableRow key={fine.id}>
                              <TableCell className="font-mono text-sm">{fine.id}</TableCell>
                              <TableCell>{fine.citizen}</TableCell>
                              <TableCell>{fine.violation}</TableCell>
                              <TableCell>{fine.location}</TableCell>
                              <TableCell className="font-semibold">${fine.amount}</TableCell>
                              <TableCell>{fine.date}</TableCell>
                              <TableCell>{getStatusBadge(fine.status)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Issue E-Ticket</CardTitle>
                    <CardDescription>Create a new traffic violation ticket</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleIssueTicket} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="vehicle-number">Vehicle Number</Label>
                          <Input id="vehicle-number" placeholder="ABC-1234" required />
                        </div>
                        <div>
                          <Label htmlFor="driver-license">Driver License</Label>
                          <Input id="driver-license" placeholder="DL123456789" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="violation-type">Violation Type</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select violation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="speeding">Speeding</SelectItem>
                            <SelectItem value="parking">Illegal Parking</SelectItem>
                            <SelectItem value="redlight">Running Red Light</SelectItem>
                            <SelectItem value="phone">Using Phone While Driving</SelectItem>
                            <SelectItem value="seatbelt">Not Wearing Seatbelt</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" placeholder="Highway 5, Mile 23" required />
                        </div>
                        <div>
                          <Label htmlFor="fine-amount">Fine Amount ($)</Label>
                          <Input id="fine-amount" type="number" placeholder="150" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="violation-details">Violation Details</Label>
                        <Textarea 
                          id="violation-details" 
                          placeholder="Describe the violation in detail..." 
                          rows={4}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="evidence">Upload Evidence (Photos/Videos)</Label>
                        <Input id="evidence" type="file" multiple />
                      </div>

                      <div className="flex gap-3">
                        <Button type="submit" className="bg-red-600 hover:bg-red-700">
                          Issue Ticket
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setShowIssueTicketForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Report Requests</CardTitle>
                <CardDescription>Process citizen report requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Citizen</TableHead>
                      <TableHead>Report Type</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReportRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-mono text-sm">{request.id}</TableCell>
                        <TableCell>{request.citizen}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => toast.info('View request details loading...')}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            {request.status === 'pending' && (
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={handleProcessReport}
                              >
                                Process
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Citizens Tab */}
          <TabsContent value="citizens">
            <Card>
              <CardHeader>
                <CardTitle>Citizen Records</CardTitle>
                <CardDescription>View registered citizen information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex gap-2">
                    <Input placeholder="Search citizens..." className="max-w-sm" />
                    <Button variant="outline" onClick={() => toast.info('Searching citizens...')}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Citizen ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Registered Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCitizens.map((citizen) => (
                      <TableRow key={citizen.id}>
                        <TableCell className="font-mono text-sm">{citizen.id}</TableCell>
                        <TableCell>{citizen.name}</TableCell>
                        <TableCell>{citizen.email}</TableCell>
                        <TableCell>{citizen.phone}</TableCell>
                        <TableCell>{citizen.registeredDate}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => toast.info('View citizen profile loading...')}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
