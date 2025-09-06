import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarStore } from "@/stores/sidebarStore";
import AppSidebar from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import axios from "axios";
import {
  ChevronRight,
  Brain,
  Zap,
  Code,
  Server,
  Palette,
  Gamepad2,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const VERTICAL_ICONS = {
  "ai-ml": Brain,
  "neurotech": Zap,
  "frontend": Code,
  "backend": Server,
  "design": Palette,
  "gamedev": Gamepad2,
  "events": Calendar,
};

const VERTICAL_LABELS = {
  "ai-ml": "AI/ML",
  "neurotech": "NeuroTech",
  "frontend": "Frontend",
  "backend": "Backend",
  "design": "Design",
  "gamedev": "Game Dev",
  "events": "Events",
};

interface UserData {
  name: string;
  email: string;
  phone: string;
  verticals: string[];
}

interface TaskDeadline {
  id: string;
  title: string;
  verticalName: string;
  deadline: string;
  status: 'upcoming' | 'due-soon' | 'overdue' | 'completed';
  roundNumber: number;
}


const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [taskDeadlines, setTaskDeadlines] = useState<TaskDeadline[]>([]);
  const { isOpen: sidebarOpen, setOpen: setSidebarOpen } = useSidebarStore();

  // Mock data for demonstration
  const mockTaskDeadlines: TaskDeadline[] = [
    {
      id: "task_1",
      title: "API Development Task",
      verticalName: "Backend Development",
      deadline: "2024-03-25T23:59:59Z",
      status: "due-soon",
      roundNumber: 2,
    },
    {
      id: "task_2",
      title: "UI Design Challenge",
      verticalName: "UI/UX Design",
      deadline: "2024-03-28T23:59:59Z",
      status: "upcoming",
      roundNumber: 1,
    },
    {
      id: "task_3",
      title: "Machine Learning Model",
      verticalName: "AI/ML",
      deadline: "2024-03-20T23:59:59Z",
      status: "overdue",
      roundNumber: 3,
    },
    {
      id: "task_4",
      title: "Frontend Component Library",
      verticalName: "Frontend",
      deadline: "2024-04-01T23:59:59Z",
      status: "upcoming",
      roundNumber: 1,
    },
  ];

  // Function to fetch task deadlines from API
  const fetchTaskDeadlines = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.get('/applicant/dashboard');
      // const applications = response.data;

      // For now, using mock data
      console.log("Fetching task deadlines...");
      setTaskDeadlines(mockTaskDeadlines);
    } catch (error) {
      console.error("Error fetching task deadlines:", error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      navigate("/");
      return;
    }

    try {
      const parsed = JSON.parse(storedData);
      setUserData(parsed);
      // Fetch task deadlines after user data is loaded
      fetchTaskDeadlines();
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/");
    }
  }, [navigate]);

  // Helper functions
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'due-soon':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'due-soon':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'overdue':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };


  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="min-h-screen flex w-full bg-gradient-dark dark">
        <AppSidebar userData={userData} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-brand-black/50 backdrop-blur-sm flex items-center px-6">
            <div>
              <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Welcome Section */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">
                  Welcome back, {userData.name}!
                </h2>
                <p className="text-gray-400">
                  Track your application deadlines and explore opportunities.
                </p>
              </div>

              {/* Verticals Grid */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Your Verticals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userData.verticals.map((verticalId) => {
                    const Icon = VERTICAL_ICONS[verticalId as keyof typeof VERTICAL_ICONS];
                    const label = VERTICAL_LABELS[verticalId as keyof typeof VERTICAL_LABELS];

                    return (
                      <Card
                        key={verticalId}
                        className="border-brand-gray bg-brand-black/50 backdrop-blur-sm hover:border-primary transition-all duration-200 group cursor-pointer"
                        onClick={() => navigate(`/vertical/${verticalId}`)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-white group-hover:text-primary transition-colors">
                                  {label}
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                  Explore opportunities
                                </CardDescription>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-brand-gray text-gray-300">
                              Active
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Task Deadlines Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Upcoming Task Deadlines</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {taskDeadlines.map((task) => (
                    <Card
                      key={task.id}
                      className="border-brand-gray bg-brand-black/50 backdrop-blur-sm hover:border-primary transition-all duration-200"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-white text-lg mb-1">
                              {task.title}
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                              {task.verticalName} - Round {task.roundNumber}
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(task.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Deadline:</span>
                            <span className="text-white text-sm font-medium">
                              {format(new Date(task.deadline), 'MMM dd, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Status:</span>
                            <Badge
                              className={`text-xs ${getStatusColor(task.status)}`}
                            >
                              {task.status.replace('-', ' ').toUpperCase()}
                            </Badge>
                          </div>
                          <div className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-brand-gray text-white hover:bg-brand-gray"
                              onClick={() => navigate(`/vertical/${task.verticalName.toLowerCase().replace(/\s+/g, '-')}`)}
                            >
                              View Details
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;