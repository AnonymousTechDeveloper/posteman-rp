import { Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { TaskStatus } from "@/types/common";

export const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
        case 'upcoming':
            return <Clock className="h-4 w-4 text-blue-500" />;
        case 'due-soon':
            return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
        case 'overdue':
            return <AlertTriangle className="h-4 w-4 text-red-500" />;
        case 'completed':
            return <CheckCircle className="h-4 w-4 text-green-500" />;
        default:
            return <Clock className="h-4 w-4 text-gray-500" />;
    }
};

export const getStatusColor = (status: TaskStatus) => {
    switch (status) {
        case 'upcoming':
            return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'due-soon':
            return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        case 'overdue':
            return 'bg-red-500/20 text-red-400 border-red-500/30';
        case 'completed':
            return 'bg-green-500/20 text-green-400 border-green-500/30';
        default:
            return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};
