// src/app/components/Dashboard/CitizenDashboard.tsx

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  CreditCard, 
  AlertCircle, 
  FileText, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  XCircle,
  Search,
  Bell,
  Download,
  Upload,
  User,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { toast } from 'sonner';

interface CitizenDashboardProps {
  userName: string;
}

// Mock Data
const mockFines = [
  { id: 'TF-2026-001', date: '2026-02-10', violation: 'Speeding (85 km/h in 60 zone)', location: 'Highway 5, Mile 23', amount: 150, status: 'pending', officer: 'Officer Davis' },
  { id: 'TF-2026-002', date: '2026-01-28', violation: 'Illegal Parking', location: 'Main Street', amount: 50, status: 'paid', officer: 'Officer Smith' },
  { id: 'TF-2026-003', date: '2026-01-15', violation: 'Running Red Light', location: '5th Avenue & Oak St', amount: 200, status: 'paid', officer: 'Officer Johnson' },
];

const mockComplaints = [
  { id: 'CP-2026-045', date: '2026-02-12', type: 'Noise Complaint', status: 'in-progress', priority: 'medium' },
  { id: 'CP-2026-032', date: '2026-01-20', type: 'Theft Report', status: 'resolved', priority: 'high' },
  { id: 'CP-2026-018', date: '2025-12-15', type: 'Vandalism', status: 'resolved', priority: 'medium' },
];

const mockReports = [
  { id: 'RP-2026-089', type: 'Character Certificate', requestDate: '2026-02-14', status: 'ready', estimatedDate: '2026-02-17' },
  { id: 'RP-2026-076', type: 'Accident Report', requestDate: '2026-01-25', status: 'processing', estimatedDate: '2026-02-20' },
  { id: 'RP-2026-055', type: 'Lost Item Report', requestDate: '2025-12-10', status: 'delivered', estimatedDate: '2025-12-15' },
];

const mockCases = [
  { id: 'CS-2026-234', type: 'Stolen Vehicle', filedDate: '2026-02-01', status: 'investigating', officer: 'Det. Williams', lastUpdate: '2026-02-15' },
  { id: 'CS-2026-198', type: 'Identity Theft', filedDate: '2026-01-10', status: 'closed', officer: 'Det. Brown', lastUpdate: '2026-02-10' },
];

export function CitizenDashboard({ userName }: CitizenDashboardProps) {
  const [selectedFine, setSelectedFine] = useState<string | null>(null);
  const [fines, setFines] = useState(mockFines);
  const [complaints, setComplaints] = useState(mockComplaints);
  const [complaintType, setComplaintType] = useState('');
  const [reports, setReports] = useState(mockReports);
  const [reportType, setReportType] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: userName,
    email: 'demo@citizen.com',
    phone: '+1 (555) 123-4567',
    nationalId: '123456789V',
    address: '123 Main Street, Capital City, 10001'
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="destructive">Pending</Badge>;
      case 'paid':
        return <Badge className="bg-green-600">Paid</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-600">In Progress</Badge>;
      case 'resolved':
      case 'closed':
        return <Badge className="bg-green-600">Resolved</Badge>;
      case 'ready':
        return <Badge className="bg-green-600">Ready</Badge>;
      case 'processing':
        return <Badge className="bg-orange-600">Processing</Badge>;
      case 'delivered':
        return <Badge className="bg-green-600">Delivered</Badge>;
      case 'investigating':
        return <Badge className="bg-blue-600">Investigating</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handlePayFine = (fineId: string) => {
    setFines(fines.map(f => f.id === fineId ? { ...f, status: 'paid' } : f));
    toast.success('Payment processed successfully! Receipt sent to your email.');
    setSelectedFine(null);
  };

  const handleSubmitComplaint = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = 'CP-2026-' + Math.floor(100 + Math.random() * 900);
    const typeLabels: Record<string, string> = {
      theft: 'Theft Report',
      noise: 'Noise Complaint',
      vandalism: 'Vandalism',
      harassment: 'Harassment',
      other: 'Other'
    };
    const newComplaint = {
      id,
      date: new Date().toISOString().split('T')[0],
      type: complaintType ? (typeLabels[complaintType] || complaintType) : 'General Complaint',
      status: 'in-progress',
      priority: 'medium'
    };
    setComplaints([newComplaint, ...complaints]);
    toast.success(`Complaint submitted successfully! Reference ID: ${id}`);
    e.currentTarget.reset();
    setComplaintType('');
  };

  const handleRequestReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = 'RP-2026-' + Math.floor(100 + Math.random() * 900);
    const typeLabels: Record<string, string> = {
      character: 'Character Certificate',
      accident: 'Accident Report',
      lost: 'Lost Item Report',
      verification: 'Background Verification',
      incident: 'Incident Report'
    };
    const newReport = {
      id,
      type: reportType ? (typeLabels[reportType] || reportType) : 'General Report',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'processing',
      estimatedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setReports([newReport, ...reports]);
    toast.success('Report request submitted! You will receive it via email within 3-5 business days.');
    e.currentTarget.reset();
    setReportType('');
  };

  const totalPending = fines.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = fines.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl mb-2">Welcome back, {userName}!</h1>
          <p className="text-blue-100">Manage your fines, complaints, and reports all in one place</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Fines</p>
                  <p className="text-2xl">${totalPending}</p>
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
                  <p className="text-sm text-gray-600">Total Paid</p>
                  <p className="text-2xl">${totalPaid}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Complaints</p>
                  <p className="text-2xl">{complaints.filter(c => c.status === 'in-progress').length}</p>
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
                  <p className="text-sm text-gray-600">Pending Reports</p>
                  <p className="text-2xl">{reports.filter(r => r.status === 'processing').length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="fines" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="fines">
              <CreditCard className="h-4 w-4 mr-2" />
              My Fines
            </TabsTrigger>
            <TabsTrigger value="complaints">
              <AlertCircle className="h-4 w-4 mr-2" />
              Complaints
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="cases">
              <Search className="h-4 w-4 mr-2" />
              Track Cases
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Traffic Fines Tab */}
          <TabsContent value="fines">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Fines</CardTitle>
                <CardDescription>View and pay your traffic violations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fine ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Violation</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fines.map((fine) => (
                      <TableRow key={fine.id}>
                        <TableCell className="font-mono text-sm">{fine.id}</TableCell>
                        <TableCell>{fine.date}</TableCell>
                        <TableCell>{fine.violation}</TableCell>
                        <TableCell>{fine.location}</TableCell>
                        <TableCell className="font-semibold">${fine.amount}</TableCell>
                        <TableCell>{getStatusBadge(fine.status)}</TableCell>
                        <TableCell>
                          {fine.status === 'pending' ? (
                            <Button 
                              size="sm" 
                              onClick={() => handlePayFine(fine.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Pay Now
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => toast.success(`Downloading receipt for ${fine.id}...`)}>
                              <Download className="h-4 w-4 mr-1" />
                              Receipt
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Complaints Tab */}
          <TabsContent value="complaints">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit New Complaint</CardTitle>
                  <CardDescription>File a complaint with supporting evidence</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitComplaint} className="space-y-4">
                    <div>
                      <Label htmlFor="complaint-type">Complaint Type</Label>
                      <Select required onValueChange={setComplaintType} key={`select-${complaints.length}`}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="theft">Theft</SelectItem>
                          <SelectItem value="noise">Noise Complaint</SelectItem>
                          <SelectItem value="vandalism">Vandalism</SelectItem>
                          <SelectItem value="harassment">Harassment</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Enter incident location" required />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe the incident in detail..." 
                        rows={5}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="evidence">Upload Evidence (Optional)</Label>
                      <Input id="evidence" type="file" multiple />
                      <p className="text-sm text-gray-500 mt-1">Images, videos, or documents</p>
                    </div>
                    <Button type="submit" className="w-full bg-blue-900">
                      <Upload className="h-4 w-4 mr-2" />
                      Submit Complaint
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>My Complaints</CardTitle>
                  <CardDescription>Track your submitted complaints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complaints.map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-mono text-sm text-gray-600">{complaint.id}</p>
                            <h4 className="font-semibold">{complaint.type}</h4>
                          </div>
                          {getStatusBadge(complaint.status)}
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Filed: {complaint.date}</p>
                          <p>Priority: <span className="capitalize">{complaint.priority}</span></p>
                        </div>
                        <Button size="sm" variant="outline" className="mt-3 w-full" onClick={() => toast.info('Complaint details loading...')}>
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request Police Report</CardTitle>
                  <CardDescription>Request various types of police reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRequestReport} className="space-y-4">
                    <div>
                      <Label htmlFor="report-type">Report Type</Label>
                      <Select required onValueChange={setReportType} key={`select-report-${reports.length}`}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="character">Character Certificate</SelectItem>
                          <SelectItem value="accident">Accident Report</SelectItem>
                          <SelectItem value="lost">Lost Item Report</SelectItem>
                          <SelectItem value="verification">Background Verification</SelectItem>
                          <SelectItem value="incident">Incident Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="purpose">Purpose</Label>
                      <Input id="purpose" placeholder="e.g., Job application, Insurance claim" required />
                    </div>
                    <div>
                      <Label htmlFor="details">Additional Details</Label>
                      <Textarea 
                        id="details" 
                        placeholder="Any specific information needed for the report..." 
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="documents">Supporting Documents</Label>
                      <Input id="documents" type="file" multiple />
                    </div>
                    <Button type="submit" className="w-full bg-blue-900">
                      <FileText className="h-4 w-4 mr-2" />
                      Request Report
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Requests</CardTitle>
                  <CardDescription>Track your report requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <div key={report.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-mono text-sm text-gray-600">{report.id}</p>
                            <h4 className="font-semibold">{report.type}</h4>
                          </div>
                          {getStatusBadge(report.status)}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Requested: {report.requestDate}</p>
                          <p>Estimated: {report.estimatedDate}</p>
                        </div>
                        {report.status === 'ready' && (
                          <Button 
                            size="sm" 
                            className="mt-3 w-full bg-green-600 hover:bg-green-700"
                            onClick={() => toast.success(`Downloading report ${report.id}...`)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Report
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases">
            <Card>
              <CardHeader>
                <CardTitle>My Cases</CardTitle>
                <CardDescription>Track investigation progress on your filed cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCases.map((caseItem) => (
                    <div key={caseItem.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-mono text-sm text-gray-600">{caseItem.id}</p>
                          <h3 className="text-xl font-semibold">{caseItem.type}</h3>
                        </div>
                        {getStatusBadge(caseItem.status)}
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Filed Date</p>
                          <p className="font-medium">{caseItem.filedDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Assigned Officer</p>
                          <p className="font-medium">{caseItem.officer}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Last Update</p>
                          <p className="font-medium">{caseItem.lastUpdate}</p>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-blue-50 rounded">
                        <p className="text-sm">
                          {caseItem.status === 'investigating' 
                            ? 'Investigation is ongoing. Our team is actively working on your case.' 
                            : 'This case has been successfully resolved and closed.'}
                        </p>
                      </div>
                      <Button variant="outline" className="mt-4" onClick={() => toast.info('Case timeline loading...')}>
                        View Full Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-900 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl">
                      {profileData.fullName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{profileData.fullName}</h3>
                      <p className="text-gray-600">Registered Citizen</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input 
                        value={profileData.fullName} 
                        readOnly={!isEditingProfile}
                        className={isEditingProfile ? "border-blue-500" : ""}
                        onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input 
                        value={profileData.email} 
                        readOnly={!isEditingProfile}
                        className={isEditingProfile ? "border-blue-500" : ""}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input 
                        value={profileData.phone} 
                        readOnly={!isEditingProfile}
                        className={isEditingProfile ? "border-blue-500" : ""}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>National ID</Label>
                      <Input 
                        value={profileData.nationalId} 
                        readOnly={!isEditingProfile}
                        className={isEditingProfile ? "border-blue-500" : ""}
                        onChange={(e) => setProfileData({...profileData, nationalId: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Address</Label>
                      <Input 
                        value={profileData.address} 
                        readOnly={!isEditingProfile}
                        className={isEditingProfile ? "border-blue-500" : ""}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {isEditingProfile ? (
                      <>
                        <Button className="bg-blue-900" onClick={() => {
                          setIsEditingProfile(false);
                          toast.success('Profile updated successfully!');
                        }}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => setIsEditingProfile(true)}>Edit Profile</Button>
                        <Button variant="outline" onClick={() => toast.info('Change Password feature coming soon.')}>Change Password</Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
