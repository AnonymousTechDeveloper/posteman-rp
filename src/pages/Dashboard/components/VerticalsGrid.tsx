import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus } from "lucide-react";
import { VERTICAL_ICONS, VERTICAL_LABELS } from "@/constants/verticals";
import { ApplicationData } from "@/types/common";
import { getApplicationStatusIcon, getApplicationStatusColor, getApplicationStatusLabel } from "@/utils/applicationStatus";

interface VerticalsGridProps {
    applications: ApplicationData[];
    isLoading: boolean;
    error: string | null;
}

export const VerticalsGrid = ({ applications, isLoading, error }: VerticalsGridProps) => {
    const navigate = useNavigate();

    // Helper function to get vertical ID from vertical name
    const getVerticalId = (verticalName: string): string => {
        const nameToIdMap: Record<string, string> = {
            "Backend Development": "backend",
            "UI/UX Design": "design",
            "AI/ML": "ai-ml",
            "Frontend Development": "frontend",
            "NeuroTech": "neurotech",
            "Game Development": "gamedev",
            "Events": "events",
        };
        return nameToIdMap[verticalName] || verticalName.toLowerCase().replace(/\s+/g, '-');
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Your Applications</h3>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Your Applications</h3>
                <div className="text-center py-8">
                    <p className="text-red-400 mb-4">{error}</p>
                    <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        className="border-brand-gray text-white hover:bg-brand-gray"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    if (applications.length === 0) {
        return (
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Your Applications</h3>
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-brand-gray/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">No Applications Yet</h4>
                    <p className="text-gray-400 mb-6">
                        You haven't applied to any verticals yet. Start exploring opportunities!
                    </p>
                    <Button
                        onClick={() => navigate("/")}
                        className="bg-primary hover:bg-primary/90 text-white"
                    >
                        Browse Verticals
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Your Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map((application) => {
                    const verticalId = getVerticalId(application.verticalName);
                    const Icon = VERTICAL_ICONS[verticalId as keyof typeof VERTICAL_ICONS] || VERTICAL_ICONS["ai-ml"];
                    const label = VERTICAL_LABELS[verticalId as keyof typeof VERTICAL_LABELS] || application.verticalName;

                    return (
                        <Card
                            key={application.applicationId}
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
                                    <div className="flex items-center space-x-2">
                                        {getApplicationStatusIcon(application.status)}
                                        <Badge
                                            className={`text-xs ${getApplicationStatusColor(application.status)}`}
                                        >
                                            {getApplicationStatusLabel(application.status)}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
