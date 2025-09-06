import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Brain, 
  Zap, 
  Code, 
  Server, 
  Palette, 
  Gamepad2, 
  Calendar,
  ChevronRight,
  User,
  Mail,
  LogOut,
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
  verticals: string[];
}

const AppSidebar = ({ userData }: { userData: UserData | null }) => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const handleVerticalClick = (verticalId: string) => {
    navigate(`/vertical/${verticalId}`);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} border-brand-gray bg-brand-black`}>
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b border-brand-gray">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="h-4 w-4 text-white" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-semibold truncate">RecruitPortal</h2>
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        {!collapsed && userData && (
          <div className="p-4 border-b border-brand-gray">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium truncate">{userData.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-xs truncate">{userData.email}</span>
              </div>
            </div>
          </div>
        )}

        {/* Verticals */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Your Verticals</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userData?.verticals.map((verticalId) => {
                const Icon = VERTICAL_ICONS[verticalId as keyof typeof VERTICAL_ICONS];
                const label = VERTICAL_LABELS[verticalId as keyof typeof VERTICAL_LABELS];
                
                return (
                  <SidebarMenuItem key={verticalId}>
                    <SidebarMenuButton
                      onClick={() => handleVerticalClick(verticalId)}
                      className="hover:bg-brand-gray text-white hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                      {!collapsed && <span>{label}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sign Out */}
        <div className="mt-auto p-4 border-t border-brand-gray">
          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-brand-gray"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      navigate("/");
      return;
    }
    
    try {
      const parsed = JSON.parse(storedData);
      setUserData(parsed);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/");
    }
  }, [navigate]);

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dark">
        <AppSidebar userData={userData} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-brand-gray bg-brand-black/50 backdrop-blur-sm flex items-center px-6">
            <SidebarTrigger className="text-white hover:text-primary" />
            <div className="ml-4">
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
                  Explore your selected verticals and discover new opportunities.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm">Selected Verticals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">
                      {userData.verticals.length}
                    </div>
                    <p className="text-xs text-gray-400">areas of interest</p>
                  </CardContent>
                </Card>

                <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm">Profile Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">Active</div>
                    <p className="text-xs text-gray-400">ready for opportunities</p>
                  </CardContent>
                </Card>

                <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm">Experience Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-400">Entry</div>
                    <p className="text-xs text-gray-400">level assessment</p>
                  </CardContent>
                </Card>
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
                            <span className="text-sm text-gray-400">Click to explore</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-gray-400">
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="border-brand-gray text-white hover:bg-brand-gray hover:border-primary"
                    >
                      Update Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-brand-gray text-white hover:bg-brand-gray hover:border-primary"
                    >
                      View Applications
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-brand-gray text-white hover:bg-brand-gray hover:border-primary"
                    >
                      Upload Resume
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-brand-gray text-white hover:bg-brand-gray hover:border-primary"
                    >
                      Browse Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;