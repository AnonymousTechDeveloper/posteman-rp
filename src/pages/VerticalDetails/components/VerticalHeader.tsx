import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, CheckCircle2, Clock, XCircle, Upload } from "lucide-react";
import { VerticalData } from "../types";
import { VERTICAL_ICONS } from "../constants";
import { DetailedApplication } from "@/types/common";

interface VerticalHeaderProps {
    verticalData: VerticalData;
    verticalId: string;
    onBackClick: () => void;
    onApply: () => void;
    onOpenSubmission: () => void;
    applicationStatus: string;
    detailedApplication: DetailedApplication | null;
}

const VerticalHeader = ({
    verticalData,
    verticalId,
    onBackClick,
    onApply,
    onOpenSubmission,
    applicationStatus,
    detailedApplication,
}: VerticalHeaderProps) => {
    const Icon = VERTICAL_ICONS[verticalId as keyof typeof VERTICAL_ICONS];

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
            case 'in-progress':
                return <Clock className="h-4 w-4" />;
            case 'accepted':
                return <CheckCircle2 className="h-4 w-4" />;
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
            case 'in-progress':
                return 'text-blue-500';
            case 'accepted':
                return 'text-green-500';
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
            case 'in-progress':
                return 'In Progress';
            case 'accepted':
                return 'Accepted';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="bg-gradient-to-r from-purple-600 to-purple-800">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            onClick={onBackClick}
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
                            {detailedApplication?.currentRound && (
                                <p className="text-white/90 mt-2">Round {detailedApplication.currentRound.roundNumber} in Progress</p>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-8 text-white">
                        {detailedApplication?.currentRound && (
                            <div className="text-center">
                                <div className="text-4xl font-bold text-yellow-400">Round {detailedApplication.currentRound.roundNumber}</div>
                                <div className="text-sm opacity-80">Current Round</div>
                            </div>
                        )}
                        {detailedApplication?.lastParticipatedRound && (
                            <div className="text-center">
                                <div className="text-4xl font-bold text-red-400">Round {detailedApplication.lastParticipatedRound.roundNumber}</div>
                                <div className="text-sm opacity-80">Last Participated</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                        <CardContent className="p-4">
                            <div className="text-white font-medium mb-2">Application Status</div>
                            <div className={`flex items-center space-x-2 ${getStatusColor(detailedApplication?.overallStatus || 'not_applied')}`}>
                                {getStatusIcon(detailedApplication?.overallStatus || 'not_applied')}
                                <span className="text-sm">{getStatusText(detailedApplication?.overallStatus || 'not_applied')}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex space-x-4">
                        {detailedApplication?.overallStatus === 'not_applied' && (
                            <Button
                                onClick={onApply}
                                className="bg-white text-purple-600 hover:bg-white/90"
                            >
                                Apply Now
                            </Button>
                        )}

                        {detailedApplication?.overallStatus === 'in-progress' && detailedApplication.currentRound && (
                            <Button
                                onClick={onOpenSubmission}
                                className="bg-white text-purple-600 hover:bg-white/90"
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                Submit Task
                            </Button>
                        )}

                        {detailedApplication?.overallStatus === 'accepted' && (
                            <div className="flex items-center space-x-2 text-green-400">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-sm">Application Accepted</span>
                            </div>
                        )}

                        {detailedApplication?.overallStatus === 'rejected' && (
                            <div className="flex items-center space-x-2 text-red-400">
                                <XCircle className="h-4 w-4" />
                                <span className="text-sm">Application Rejected</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerticalHeader;
