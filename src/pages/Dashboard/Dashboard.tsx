import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarStore } from "@/stores/sidebarStore";
import AppSidebar from "@/components/AppSidebar";
import { useUserData } from "@/hooks/useUserData";
import { useApplications } from "@/hooks/useApplications";
import { useDetailedApplications } from "@/hooks/useDetailedApplications";
import { WelcomeSection, VerticalsGrid, TaskDeadlinesSection } from "./components";


const Dashboard = () => {
  const { userData, isLoading: userLoading } = useUserData();
  const { applications, isLoading: applicationsLoading, error: applicationsError } = useApplications();
  const { taskDeadlines, isLoading: tasksLoading, error: tasksError } = useDetailedApplications(applications);
  const { isOpen: sidebarOpen, setOpen: setSidebarOpen } = useSidebarStore();


  if (userLoading || !userData) {
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
              <WelcomeSection userData={userData} />
              <VerticalsGrid
                applications={applications}
                isLoading={applicationsLoading}
                error={applicationsError}
              />
              <TaskDeadlinesSection
                taskDeadlines={taskDeadlines}
                isLoading={tasksLoading}
                error={tasksError}
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;