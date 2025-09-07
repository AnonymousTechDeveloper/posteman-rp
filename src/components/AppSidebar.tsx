import { useNavigate, useLocation } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
    Users,
    LogOut,
    LayoutDashboard,
} from "lucide-react";
import { VERTICAL_ICONS, VERTICAL_LABELS } from "@/constants/verticals";
import { UserData } from "@/types/common";

interface AppSidebarProps {
    userData: UserData | null;
    currentVerticalId?: string;
}

const AppSidebar = ({ userData, currentVerticalId }: AppSidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();
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
        <Sidebar
            collapsible="icon"
            className="border-brand-gray bg-brand-black"
            style={{
                '--sidebar-background': 'hsl(var(--brand-black))',
                '--sidebar-foreground': 'hsl(0 0% 98%)',
                '--sidebar-primary': 'hsl(var(--brand-orange))',
                '--sidebar-primary-foreground': 'hsl(0 0% 98%)',
                '--sidebar-accent': 'hsl(var(--brand-gray))',
                '--sidebar-accent-foreground': 'hsl(0 0% 98%)',
                '--sidebar-border': 'hsl(var(--brand-gray))',
                '--sidebar-ring': 'hsl(var(--brand-orange))',
                '--sidebar-width': '15rem',
                '--sidebar-width-icon': '4rem',
            } as React.CSSProperties}
        >
            <SidebarContent className="bg-brand-black">
                {/* Header */}
                <div className="px-4 py-4 pr-6 border-b border-brand-gray">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 group-data-[collapsible=icon]:hidden">
                                <Users className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                                <h2 className="text-white font-semibold truncate">RecruitPortal</h2>
                            </div>
                        </div>
                        <SidebarTrigger className="text-white hover:text-white/80 hover:bg-white/10" />
                    </div>
                </div>

                {/* Dashboard Button */}
                <SidebarGroup className="px-2 pr-6 -mb-4">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => navigate("/dashboard")}
                                    isActive={location.pathname === "/dashboard"}
                                    className="text-white hover:bg-brand-gray hover:text-primary data-[active=true]:bg-brand-gray data-[active=true]:text-primary mx-1 rounded-md"
                                    tooltip={collapsed ? "Dashboard" : undefined}
                                >
                                    <LayoutDashboard className="h-2 w-4" />
                                    <span className="truncate group-data-[collapsible=icon]:hidden">Dashboard</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Verticals */}
                <SidebarGroup className="px-2 pr-6">
                    <SidebarGroupLabel className="text-gray-400 px-2 py-2 text-xs font-medium group-data-[collapsible=icon]:hidden">Your Verticals</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {userData?.verticals.map((verticalId) => {
                                const Icon = VERTICAL_ICONS[verticalId as keyof typeof VERTICAL_ICONS];
                                const label = VERTICAL_LABELS[verticalId as keyof typeof VERTICAL_LABELS];
                                const isActive = verticalId === currentVerticalId;

                                return (
                                    <SidebarMenuItem key={verticalId}>
                                        <SidebarMenuButton
                                            onClick={() => handleVerticalClick(verticalId)}
                                            isActive={isActive}
                                            className="text-white hover:bg-brand-gray hover:text-primary data-[active=true]:bg-brand-gray data-[active=true]:text-primary mx-1 rounded-md"
                                            tooltip={collapsed ? label : undefined}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span className="truncate group-data-[collapsible=icon]:hidden">{label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Sign Out */}
                <div className="mt-auto px-2 py-4 pr-6 border-t border-brand-gray">
                    <Button
                        onClick={handleSignOut}
                        variant="ghost"
                        className="w-full justify-start text-gray-400 hover:text-white hover:bg-brand-gray"
                        title={collapsed ? "Sign Out" : undefined}
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="ml-2 group-data-[collapsible=icon]:hidden">Sign Out</span>
                    </Button>
                </div>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
