import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarStore } from "@/stores/sidebarStore";
import AppSidebar from "@/components/AppSidebar";
import {
  ArrowLeft,
  Brain,
  Zap,
  Code,
  Server,
  Palette,
  Gamepad2,
  Calendar,
  Users,
  TrendingUp,
  BookOpen,
  Award,
  Clock,
  MapPin,
  DollarSign,
  ExternalLink,
  CheckCircle,
  Clock3,
  AlertCircle,
  Target,
  MessageCircle,
  Send,
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
  phone: string;
  verticals: string[];
}

interface VerticalData {
  id: string;
  name: string;
  icon: string;
  currentRound: number;
  task: string; // HTML markup from backend
  applicationStatus: 'not_applied' | 'applied' | 'submitted' | 'rejected';
  submissionDeadline?: string;
}

interface SubmissionData {
  githubLink: string;
  documents: File[];
  notes: string;
}

const VERTICAL_ICONS = {
  "ai-ml": Brain,
  "neurotech": Zap,
  "frontend": Code,
  "backend": Server,
  "design": Palette,
  "gamedev": Gamepad2,
  "events": Calendar,
};


const VerticalDetails = () => {
  const { verticalId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [verticalData, setVerticalData] = useState<VerticalData | null>(null);
  const [submissionData, setSubmissionData] = useState<SubmissionData>({
    githubLink: '',
    documents: [],
    notes: ''
  });
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false);
  const { isOpen: sidebarOpen, setOpen: setSidebarOpen } = useSidebarStore();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      navigate("/");
      return;
    }

    try {
      const parsed = JSON.parse(storedData);
      setUserData(parsed);

      // Check if user has access to this vertical
      if (!parsed.verticals.includes(verticalId)) {
        navigate("/dashboard");
      }
    } catch (error) {
      navigate("/");
    }
  }, [navigate, verticalId]);

  // Simulate fetching vertical data from backend
  useEffect(() => {
    if (verticalId) {
      // This would be replaced with actual API call
      const mockVerticalData: VerticalData = {
        id: verticalId,
        name: VERTICAL_ICONS[verticalId as keyof typeof VERTICAL_ICONS] ?
          (verticalId === 'ai-ml' ? 'AI/ML' :
            verticalId === 'neurotech' ? 'NeuroTech' :
              verticalId === 'frontend' ? 'Frontend' :
                verticalId === 'backend' ? 'Backend' :
                  verticalId === 'design' ? 'Design' :
                    verticalId === 'gamedev' ? 'Game Dev' :
                      verticalId === 'events' ? 'Events' : verticalId) : verticalId,
        icon: verticalId,
        currentRound: 2,
        task: `
          <div class="p-6 bg-white rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Round 2 Task: Build a Machine Learning Model</h2>
            <div class="space-y-4">
              <p class="text-gray-600">Create a machine learning model that can classify images of cats and dogs.</p>
              <h3 class="text-lg font-semibold text-gray-800">Requirements:</h3>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Use Python and any ML framework (TensorFlow, PyTorch, or scikit-learn)</li>
                <li>Achieve at least 85% accuracy on the test set</li>
                <li>Include proper data preprocessing and visualization</li>
                <li>Document your approach and results</li>
              </ul>
              <h3 class="text-lg font-semibold text-gray-800">Dataset:</h3>
              <p class="text-gray-600">Use the CIFAR-10 dataset or any publicly available cat/dog dataset.</p>
              <h3 class="text-lg font-semibold text-gray-800">Submission:</h3>
              <p class="text-gray-600">Submit your code via GitHub repository with a detailed README.</p>
            </div>
          </div>
        `,
        applicationStatus: 'applied',
        submissionDeadline: '2024-03-25T23:59:59Z'
      };
      setVerticalData(mockVerticalData);
    }
  }, [verticalId]);

  if (!verticalId || !VERTICAL_ICONS[verticalId as keyof typeof VERTICAL_ICONS]) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Vertical Not Found</h1>
          <Button onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (!verticalData) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading vertical details...</p>
        </div>
      </div>
    );
  }

  const Icon = VERTICAL_ICONS[verticalId as keyof typeof VERTICAL_ICONS];

  const handleApply = () => {
    // This would make an API call to apply for the vertical
    console.log('Applying for vertical:', verticalId);
    // Update application status
    if (verticalData) {
      setVerticalData({ ...verticalData, applicationStatus: 'applied' });
    }
  };

  const handleSubmit = () => {
    // This would make an API call to submit the application
    console.log('Submitting application:', submissionData);
    // Update application status
    if (verticalData) {
      setVerticalData({ ...verticalData, applicationStatus: 'submitted' });
    }
    setIsSubmissionDialogOpen(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'not_applied':
        return <Clock className="h-4 w-4" />;
      case 'applied':
        return <CheckCircle className="h-4 w-4" />;
      case 'submitted':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_applied':
        return 'text-yellow-500';
      case 'applied':
        return 'text-blue-500';
      case 'submitted':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'not_applied':
        return 'Not Applied';
      case 'applied':
        return 'Applied';
      case 'submitted':
        return 'Submitted';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="min-h-screen flex w-full bg-gradient-dark dark">
        <AppSidebar userData={userData} currentVerticalId={verticalId || ""} />

        <div className="flex-1 flex flex-col">
          {/* Header with Purple Gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/dashboard")}
                    className="text-white hover:text-white/80 hover:bg-white/10"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white">{verticalData.name}</h1>
                    <p className="text-white/80 text-lg">Vertical</p>
                    <p className="text-white/90 mt-2">Round {verticalData.currentRound} in Progress</p>
                  </div>
                </div>

                <div className="flex space-x-8 text-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold">98</div>
                    <div className="text-sm opacity-80">Applicants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm opacity-80">Selected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{verticalData.currentRound}</div>
                    <div className="text-sm opacity-80">Current Round</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4">
                    <div className="text-white font-medium mb-2">Application Status</div>
                    <div className={`flex items-center space-x-2 ${getStatusColor(verticalData.applicationStatus)}`}>
                      {getStatusIcon(verticalData.applicationStatus)}
                      <span className="text-sm">{getStatusText(verticalData.applicationStatus)}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-4">
                  {verticalData.applicationStatus === 'not_applied' && (
                    <Button
                      onClick={handleApply}
                      className="bg-white text-purple-600 hover:bg-white/90"
                    >
                      Apply Now
                    </Button>
                  )}

                  {verticalData.applicationStatus === 'applied' && (
                    <Dialog open={isSubmissionDialogOpen} onOpenChange={setIsSubmissionDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-white text-purple-600 hover:bg-white/90">
                          <Upload className="mr-2 h-4 w-4" />
                          Submit Application
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-brand-black border-brand-gray text-white">
                        <DialogHeader>
                          <DialogTitle>Submit Your Application</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Upload your project files and provide additional information.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-white mb-2 block">GitHub Repository Link</label>
                            <Input
                              placeholder="https://github.com/username/repository"
                              value={submissionData.githubLink}
                              onChange={(e) => setSubmissionData({ ...submissionData, githubLink: e.target.value })}
                              className="bg-brand-gray border-brand-gray-light text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-white mb-2 block">Additional Documents</label>
                            <div className="border-2 border-dashed border-brand-gray-light rounded-lg p-4 text-center">
                              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-400">Drag and drop files here or click to browse</p>
                              <input type="file" multiple className="hidden" />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-white mb-2 block">Additional Notes</label>
                            <Textarea
                              placeholder="Any additional information about your submission..."
                              value={submissionData.notes}
                              onChange={(e) => setSubmissionData({ ...submissionData, notes: e.target.value })}
                              className="bg-brand-gray border-brand-gray-light text-white"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => setIsSubmissionDialogOpen(false)}
                              className="border-brand-gray text-white hover:bg-brand-gray"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSubmit}
                              className="bg-primary hover:bg-primary/90"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {verticalData.applicationStatus === 'submitted' && (
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm">Application Submitted</span>
                    </div>
                  )}

                  {verticalData.applicationStatus === 'rejected' && (
                    <div className="flex items-center space-x-2 text-red-400">
                      <XCircle className="h-4 w-4" />
                      <span className="text-sm">Application Rejected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 bg-gradient-dark">
            <div className="max-w-7xl mx-auto">
              <Tabs defaultValue="tasks" className="space-y-6">
                <TabsList className="bg-brand-gray border-brand-gray-light">
                  <TabsTrigger value="tasks" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger value="announcements" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Announcements
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tasks" className="space-y-6">
                  {/* Task HTML Content */}
                  <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <FileText className="mr-2 h-5 w-5" />
                        Round {verticalData.currentRound} Task
                      </CardTitle>
                      {verticalData.submissionDeadline && (
                        <CardDescription className="text-gray-400">
                          Deadline: {new Date(verticalData.submissionDeadline).toLocaleDateString()}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: verticalData.task }}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="announcements" className="space-y-6">
                  <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Announcements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-brand-gray/30 rounded-lg">
                          <h4 className="text-white font-medium mb-2">Round 2 Task Released</h4>
                          <p className="text-gray-400 text-sm">The Round 2 task has been released. Please review the requirements and submit your solution by the deadline.</p>
                          <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <div className="p-4 bg-brand-gray/30 rounded-lg">
                          <h4 className="text-white font-medium mb-2">Application Deadline Reminder</h4>
                          <p className="text-gray-400 text-sm">Don't forget to submit your application before the deadline. Late submissions will not be accepted.</p>
                          <span className="text-xs text-gray-500">1 day ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default VerticalDetails;