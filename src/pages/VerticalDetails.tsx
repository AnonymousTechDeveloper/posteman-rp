import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";

const VERTICAL_CONFIG = {
  "ai-ml": {
    name: "AI/ML",
    icon: Brain,
    description: "Artificial Intelligence & Machine Learning",
    color: "from-purple-600 to-blue-600",
    jobs: [
      {
        title: "Machine Learning Engineer",
        company: "TechCorp AI",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120k - $180k",
        description: "Build and deploy ML models at scale",
        posted: "2 days ago",
      },
      {
        title: "AI Research Scientist",
        company: "DeepMind Labs",
        location: "London, UK",
        type: "Full-time",
        salary: "$150k - $220k",
        description: "Research next-generation AI algorithms",
        posted: "1 week ago",
      },
      {
        title: "Data Scientist",
        company: "Analytics Pro",
        location: "Remote",
        type: "Contract",
        salary: "$80k - $120k",
        description: "Extract insights from complex datasets",
        posted: "3 days ago",
      },
    ],
    skills: ["Python", "TensorFlow", "PyTorch", "Statistics", "Deep Learning"],
    trends: [
      { name: "Generative AI", growth: 85 },
      { name: "Computer Vision", growth: 72 },
      { name: "NLP", growth: 68 },
      { name: "MLOps", growth: 78 },
    ],
  },
  "neurotech": {
    name: "NeuroTech",
    icon: Zap,
    description: "Neurotechnology & Brain-Computer Interfaces",
    color: "from-green-600 to-teal-600",
    jobs: [
      {
        title: "BCI Engineer",
        company: "NeuraLink",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$140k - $200k",
        description: "Develop brain-computer interface systems",
        posted: "5 days ago",
      },
      {
        title: "Neuroscience Researcher",
        company: "Brain Institute",
        location: "Boston, MA",
        type: "Full-time",
        salary: "$90k - $130k",
        description: "Research neural signal processing",
        posted: "1 week ago",
      },
    ],
    skills: ["Neuroscience", "Signal Processing", "MATLAB", "C++", "Hardware Design"],
    trends: [
      { name: "Brain-Computer Interfaces", growth: 92 },
      { name: "Neural Prosthetics", growth: 76 },
      { name: "Neurofeedback", growth: 64 },
    ],
  },
  "frontend": {
    name: "Frontend",
    icon: Code,
    description: "Frontend Development & UI/UX",
    color: "from-orange-600 to-red-600",
    jobs: [
      {
        title: "Senior Frontend Developer",
        company: "WebFlow Inc",
        location: "New York, NY",
        type: "Full-time",
        salary: "$100k - $150k",
        description: "Build responsive web applications",
        posted: "1 day ago",
      },
      {
        title: "React Developer",
        company: "StartupXYZ",
        location: "Remote",
        type: "Full-time",
        salary: "$80k - $120k",
        description: "Develop modern React applications",
        posted: "4 days ago",
      },
    ],
    skills: ["React", "TypeScript", "CSS", "JavaScript", "Next.js"],
    trends: [
      { name: "React", growth: 88 },
      { name: "TypeScript", growth: 95 },
      { name: "Next.js", growth: 82 },
      { name: "Tailwind CSS", growth: 78 },
    ],
  },
  "backend": {
    name: "Backend",
    icon: Server,
    description: "Backend Development & APIs",
    color: "from-blue-600 to-indigo-600",
    jobs: [
      {
        title: "Backend Engineer",
        company: "CloudTech",
        location: "Seattle, WA",
        type: "Full-time",
        salary: "$110k - $160k",
        description: "Build scalable backend systems",
        posted: "2 days ago",
      },
      {
        title: "DevOps Engineer",
        company: "InfraCorp",
        location: "Denver, CO",
        type: "Full-time",
        salary: "$120k - $170k",
        description: "Manage cloud infrastructure",
        posted: "1 week ago",
      },
    ],
    skills: ["Node.js", "Python", "Docker", "Kubernetes", "AWS"],
    trends: [
      { name: "Microservices", growth: 84 },
      { name: "Kubernetes", growth: 89 },
      { name: "Serverless", growth: 76 },
      { name: "GraphQL", growth: 71 },
    ],
  },
  "design": {
    name: "Design",
    icon: Palette,
    description: "Product Design & User Experience",
    color: "from-pink-600 to-purple-600",
    jobs: [
      {
        title: "UX Designer",
        company: "DesignStudio",
        location: "Los Angeles, CA",
        type: "Full-time",
        salary: "$80k - $120k",
        description: "Design user-centered experiences",
        posted: "3 days ago",
      },
      {
        title: "Product Designer",
        company: "TechGiant",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120k - $180k",
        description: "Lead product design initiatives",
        posted: "5 days ago",
      },
    ],
    skills: ["Figma", "Sketch", "Prototyping", "User Research", "Design Systems"],
    trends: [
      { name: "Design Systems", growth: 87 },
      { name: "Accessibility", growth: 79 },
      { name: "Micro-interactions", growth: 65 },
      { name: "Voice UI", growth: 58 },
    ],
  },
  "gamedev": {
    name: "Game Dev",
    icon: Gamepad2,
    description: "Game Development & Interactive Media",
    color: "from-yellow-600 to-orange-600",
    jobs: [
      {
        title: "Game Developer",
        company: "GameStudio",
        location: "Montreal, CA",
        type: "Full-time",
        salary: "$70k - $110k",
        description: "Develop engaging game experiences",
        posted: "4 days ago",
      },
      {
        title: "Unity Developer",
        company: "IndieGames",
        location: "Remote",
        type: "Contract",
        salary: "$60k - $90k",
        description: "Create Unity-based games",
        posted: "1 week ago",
      },
    ],
    skills: ["Unity", "C#", "Unreal Engine", "3D Modeling", "Game Design"],
    trends: [
      { name: "VR Gaming", growth: 94 },
      { name: "Mobile Games", growth: 73 },
      { name: "Indie Games", growth: 67 },
      { name: "AR Games", growth: 81 },
    ],
  },
  "events": {
    name: "Events",
    icon: Calendar,
    description: "Event Management & Coordination",
    color: "from-cyan-600 to-blue-600",
    jobs: [
      {
        title: "Event Manager",
        company: "EventPro",
        location: "Chicago, IL",
        type: "Full-time",
        salary: "$50k - $80k",
        description: "Plan and execute corporate events",
        posted: "2 days ago",
      },
      {
        title: "Conference Coordinator",
        company: "TechEvents",
        location: "Austin, TX",
        type: "Part-time",
        salary: "$30k - $50k",
        description: "Coordinate tech conferences",
        posted: "6 days ago",
      },
    ],
    skills: ["Project Management", "Vendor Relations", "Budget Management", "Marketing", "Logistics"],
    trends: [
      { name: "Virtual Events", growth: 88 },
      { name: "Hybrid Events", growth: 82 },
      { name: "Event Tech", growth: 75 },
      { name: "Sustainability", growth: 69 },
    ],
  },
};

const VerticalDetails = () => {
  const { verticalId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

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

  if (!verticalId || !VERTICAL_CONFIG[verticalId as keyof typeof VERTICAL_CONFIG]) {
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

  const vertical = VERTICAL_CONFIG[verticalId as keyof typeof VERTICAL_CONFIG];
  const Icon = vertical.icon;

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="border-b border-brand-gray bg-brand-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="text-white hover:text-primary hover:bg-brand-gray"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${vertical.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{vertical.name}</h1>
                  <p className="text-gray-400">{vertical.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-brand-gray border-brand-gray-light">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Job Opportunities
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Skills & Trends
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Learning Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Available Jobs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{vertical.jobs.length}</div>
                  <p className="text-xs text-gray-400">open positions</p>
                </CardContent>
              </Card>

              <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Growth Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">+23%</div>
                  <p className="text-xs text-gray-400">year over year</p>
                </CardContent>
              </Card>

              <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Avg. Salary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">$125k</div>
                  <p className="text-xs text-gray-400">median range</p>
                </CardContent>
              </Card>

              <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    Skills Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">{vertical.skills.length}</div>
                  <p className="text-xs text-gray-400">core skills</p>
                </CardContent>
              </Card>
            </div>

            {/* Featured Jobs */}
            <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Featured Opportunities</CardTitle>
                <CardDescription className="text-gray-400">
                  Top job openings in {vertical.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vertical.jobs.slice(0, 2).map((job, index) => (
                    <div key={index} className="p-4 border border-brand-gray rounded-lg hover:border-primary transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-white font-semibold">{job.title}</h3>
                          <p className="text-gray-400 text-sm">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {job.posted}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">{job.description}</p>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge variant="secondary" className="bg-brand-gray text-gray-300">
                            {job.type}
                          </Badge>
                          <p className="text-primary font-semibold text-sm">{job.salary}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="space-y-4">
              {vertical.jobs.map((job, index) => (
                <Card key={index} className="border-brand-gray bg-brand-black/50 backdrop-blur-sm hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                          <Button size="sm" className="bg-gradient-primary hover:bg-brand-orange-dark">
                            Apply Now
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-6 text-gray-400">
                          <span className="font-medium text-primary">{job.company}</span>
                          <span className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {job.posted}
                          </span>
                        </div>
                        <p className="text-gray-300">{job.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-brand-gray text-gray-300">
                              {job.type}
                            </Badge>
                          </div>
                          <span className="text-primary font-semibold">{job.salary}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Core Skills */}
              <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Core Skills</CardTitle>
                  <CardDescription className="text-gray-400">
                    Essential skills for {vertical.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {vertical.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Skills */}
              <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Trending Skills</CardTitle>
                  <CardDescription className="text-gray-400">
                    Skills with highest growth
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vertical.trends.map((trend, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm">{trend.name}</span>
                          <span className="text-primary text-sm font-medium">+{trend.growth}%</span>
                        </div>
                        <Progress value={trend.growth} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Learning Paths */}
              <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Learning Paths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Structured learning paths to master {vertical.name}
                  </p>
                  <Button variant="outline" className="border-brand-gray text-white hover:bg-brand-gray hover:border-primary">
                    Explore Courses
                  </Button>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Industry-recognized certifications
                  </p>
                  <Button variant="outline" className="border-brand-gray text-white hover:bg-brand-gray hover:border-primary">
                    View Certifications
                  </Button>
                </CardContent>
              </Card>

              {/* Community */}
              <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Connect with other {vertical.name} professionals
                  </p>
                  <Button variant="outline" className="border-brand-gray text-white hover:bg-brand-gray hover:border-primary">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VerticalDetails;