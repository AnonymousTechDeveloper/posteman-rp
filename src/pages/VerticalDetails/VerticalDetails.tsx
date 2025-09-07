import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarStore } from "@/stores/sidebarStore";
import AppSidebar from "@/components/AppSidebar";
import { ArrowLeft } from "lucide-react";

// Import types and constants
import { UserData, VerticalData, SubmissionData } from "./types";
import { VERTICAL_ICONS } from "./constants";
import { createMockVerticalData } from "./utils";
import { DetailedApplication } from "@/types/common";
import { applicantApi } from "@/services/api";

// Import components
import { VerticalHeader, SubmissionDialog, VerticalTabs } from "./components";
import { TaskSubmissionForm } from "./components/TaskSubmissionForm";


const VerticalDetails = () => {
  const { verticalId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [verticalData, setVerticalData] = useState<VerticalData | null>(null);
  const [detailedApplication, setDetailedApplication] = useState<DetailedApplication | null>(null);
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
      const mockVerticalData = createMockVerticalData(verticalId);
      setVerticalData(mockVerticalData);
    }
  }, [verticalId]);

  // Fetch detailed application data
  useEffect(() => {
    const fetchDetailedApplication = async () => {
      if (verticalId && userData) {
        try {
          // Find the application ID for this vertical
          const applicationIdMap: Record<string, string> = {
            'backend': 'backend-app-123',
            'frontend': 'frontend-app-456',
            'ai-ml': 'ai-ml-app-789',
            'design': 'design-app-101',
            'gamedev': 'gamedev-app-202',
            'neurotech': 'neurotech-app-303',
            'events': 'events-app-404',
          };
          const applicationId = applicationIdMap[verticalId || ''] || 'backend-app-123';
          const detailed = await applicantApi.getApplicationDetails(applicationId);
          setDetailedApplication(detailed);
        } catch (error) {
          console.error("Error fetching detailed application:", error);
        }
      }
    };

    fetchDetailedApplication();
  }, [verticalId, userData]);

  const handleSubmissionSuccess = () => {
    // Update submission status to submitted
    if (detailedApplication && detailedApplication.overallStatus === "in-progress") {
      setDetailedApplication({
        ...detailedApplication,
        currentRound: {
          ...detailedApplication.currentRound,
          submissionStatus: "submitted"
        }
      });
    }
  };

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

  const handleOpenSubmission = () => {
    setIsSubmissionDialogOpen(true);
  };

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="min-h-screen flex w-full bg-gradient-dark dark">
        <AppSidebar userData={userData} currentVerticalId={verticalId || ""} />

        <div className="flex-1 flex flex-col">
          {/* Header with Purple Gradient */}
          <VerticalHeader
            verticalData={verticalData}
            verticalId={verticalId || ""}
            onBackClick={() => navigate("/dashboard")}
            onApply={handleApply}
            onOpenSubmission={handleOpenSubmission}
            applicationStatus={verticalData?.applicationStatus || 'not_applied'}
            detailedApplication={detailedApplication}
          />

          {/* Main Content */}
          <div className="flex-1 p-6 bg-gradient-dark">
            <div className="max-w-7xl mx-auto space-y-6">
              {verticalData && <VerticalTabs verticalData={verticalData} detailedApplication={detailedApplication} />}

            </div>
          </div>
        </div>
      </div>

      {/* Submission Dialog with Task Submission Form */}
      <SubmissionDialog
        isOpen={isSubmissionDialogOpen}
        onOpenChange={setIsSubmissionDialogOpen}
        detailedApplication={detailedApplication}
        onSubmissionSuccess={handleSubmissionSuccess}
      />
    </SidebarProvider>
  );
};

export default VerticalDetails;