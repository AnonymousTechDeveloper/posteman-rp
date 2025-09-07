import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { TaskDeadline } from "@/types/common";
import { getStatusIcon, getStatusColor } from "@/utils/taskStatus";

interface TaskDeadlinesSectionProps {
    taskDeadlines: TaskDeadline[];
    isLoading?: boolean;
    error?: string | null;
}

export const TaskDeadlinesSection = ({ taskDeadlines, isLoading, error }: TaskDeadlinesSectionProps) => {
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Upcoming Task Deadlines</h3>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Upcoming Task Deadlines</h3>
                <div className="text-center py-8">
                    <p className="text-red-400 mb-4">{error}</p>
                </div>
            </div>
        );
    }

    if (taskDeadlines.length === 0) {
        return (
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Upcoming Task Deadlines</h3>
                <div className="text-center py-8">
                    <p className="text-gray-400">No upcoming deadlines at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Upcoming Task Deadlines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {taskDeadlines.map((task) => (
                    <Card
                        key={task.id}
                        className="border-brand-gray bg-brand-black/50 backdrop-blur-sm hover:border-primary transition-all duration-200"
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-white text-lg mb-1">
                                        {task.title}
                                    </CardTitle>
                                    <CardDescription className="text-gray-400">
                                        {task.verticalName} - Round {task.roundNumber}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(task.status)}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Deadline:</span>
                                    <span className="text-white text-sm font-medium">
                                        {format(new Date(task.deadline), 'MMM dd, yyyy')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Status:</span>
                                    <Badge
                                        className={`text-xs ${getStatusColor(task.status)}`}
                                    >
                                        {task.status.replace('-', ' ').toUpperCase()}
                                    </Badge>
                                </div>
                                <div className="pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full border-brand-gray text-white hover:bg-brand-gray"
                                        onClick={() => navigate(`/vertical/${task.verticalName.toLowerCase().replace(/\s+/g, '-')}`)}
                                    >
                                        View Details
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
