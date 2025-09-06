import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    CheckCircle,
    CheckCircle2,
    Clock,
    XCircle,
    Upload
} from "lucide-react";

interface ApplicationStatusProps {
    status: 'not_applied' | 'applied' | 'submitted' | 'rejected';
    onApply: () => void;
    onOpenSubmission: () => void;
}

const ApplicationStatus = ({ status, onApply, onOpenSubmission }: ApplicationStatusProps) => {
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
        <div className="mt-8 flex justify-between items-center">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4">
                    <div className="text-white font-medium mb-2">Application Status</div>
                    <div className={`flex items-center space-x-2 ${getStatusColor(status)}`}>
                        {getStatusIcon(status)}
                        <span className="text-sm">{getStatusText(status)}</span>
                    </div>
                </CardContent>
            </Card>

            <div className="flex space-x-4">
                {status === 'not_applied' && (
                    <Button
                        onClick={onApply}
                        className="bg-white text-purple-600 hover:bg-white/90"
                    >
                        Apply Now
                    </Button>
                )}

                {status === 'applied' && (
                    <Button
                        onClick={onOpenSubmission}
                        className="bg-white text-purple-600 hover:bg-white/90"
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Application
                    </Button>
                )}

                {status === 'submitted' && (
                    <div className="flex items-center space-x-2 text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm">Application Submitted</span>
                    </div>
                )}

                {status === 'rejected' && (
                    <div className="flex items-center space-x-2 text-red-400">
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm">Application Rejected</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationStatus;
