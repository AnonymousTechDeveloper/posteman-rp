import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { VerticalData } from "../types";
import { DetailedApplication } from "@/types/common";

interface TaskContentProps {
    verticalData: VerticalData;
    detailedApplication: DetailedApplication | null;
}

const TaskContent = ({ verticalData, detailedApplication }: TaskContentProps) => {
    if (!detailedApplication) {
        return (
            <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardContent className="p-6">
                    <div className="text-center text-gray-400">
                        <Clock className="mx-auto h-12 w-12 mb-4" />
                        <p>Loading application details...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Handle different application statuses
    if (detailedApplication.overallStatus === "not_applied") {
        return (
            <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white flex items-center">
                        <FileText className="mr-2 h-5 w-5" />
                        Vertical Overview
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Apply to this vertical to participate in tasks
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-2">
                                {verticalData.name} Challenge
                            </h3>
                            <div
                                className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-em:text-gray-300 prose-ul:text-gray-300 prose-li:text-gray-300"
                                dangerouslySetInnerHTML={{ __html: verticalData.task }}
                            />
                        </div>
                        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <p className="text-yellow-400 text-sm">
                                <strong>Note:</strong> You need to apply to this vertical to participate in the actual tasks and submit your work.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (detailedApplication.overallStatus === "rejected") {
        return (
            <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white flex items-center">
                        <XCircle className="mr-2 h-5 w-5 text-red-500" />
                        Application Rejected
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Last participated in Round {detailedApplication.lastParticipatedRound?.roundNumber}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-white font-medium mb-2">
                                {detailedApplication.lastParticipatedRound?.title}
                            </h4>
                            <p className="text-gray-400">
                                {detailedApplication.lastParticipatedRound?.taskTitle}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // In-progress application with current round
    if (detailedApplication.currentRound) {
        return (
            <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white flex items-center">
                        <FileText className="mr-2 h-5 w-5" />
                        Round {detailedApplication.currentRound.roundNumber} Task
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Deadline: {new Date(detailedApplication.currentRound.deadline).toLocaleDateString()}
                        {detailedApplication.currentRound.submissionStatus === "submitted" && (
                            <span className="ml-2 text-green-400 flex items-center">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Submitted
                            </span>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-2">
                                {detailedApplication.currentRound.title}
                            </h3>
                            <div
                                className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-em:text-gray-300 prose-ul:text-gray-300 prose-li:text-gray-300"
                                dangerouslySetInnerHTML={{ __html: detailedApplication.currentRound.description }}
                            />
                        </div>
                        <div className="mt-6 p-4 bg-brand-gray/30 rounded-lg">
                            <h4 className="text-white font-medium mb-2">
                                Task: {detailedApplication.currentRound.task.title}
                            </h4>
                            <p className="text-gray-400 text-sm">
                                Form configuration: {detailedApplication.currentRound.task.formConfig.urlLabel}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
            <CardContent className="p-6">
                <div className="text-center text-gray-400">
                    <FileText className="mx-auto h-12 w-12 mb-4" />
                    <p>No active tasks available.</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default TaskContent;
