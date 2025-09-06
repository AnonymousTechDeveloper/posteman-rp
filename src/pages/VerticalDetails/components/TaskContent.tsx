import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { VerticalData } from "../types";

interface TaskContentProps {
    verticalData: VerticalData;
}

const TaskContent = ({ verticalData }: TaskContentProps) => {
    return (
        <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-white flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Round {verticalData.currentRound} Task
                </CardTitle>
                {verticalData.submissionDeadline && (
                    <CardDescription className="text-gray-400">
                        Deadline: {new Date(verticalData.submissionDeadline).toLocaleDateString()}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: verticalData.task }}
                />
            </CardContent>
        </Card>
    );
};

export default TaskContent;
