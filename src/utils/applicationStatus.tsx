import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { ApplicationStatus } from "@/types/common";

export const getApplicationStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
        case 'applied':
            return <Clock className="h-4 w-4 text-blue-500" />;
        case 'in-progress':
            return <AlertCircle className="h-4 w-4 text-yellow-500" />;
        case 'accepted':
            return <CheckCircle className="h-4 w-4 text-green-500" />;
        case 'rejected':
            return <XCircle className="h-4 w-4 text-red-500" />;
        default:
            return <Clock className="h-4 w-4 text-gray-500" />;
    }
};

export const getApplicationStatusColor = (status: ApplicationStatus) => {
    switch (status) {
        case 'applied':
            return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'in-progress':
            return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        case 'accepted':
            return 'bg-green-500/20 text-green-400 border-green-500/30';
        case 'rejected':
            return 'bg-red-500/20 text-red-400 border-red-500/30';
        default:
            return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};

export const getApplicationStatusLabel = (status: ApplicationStatus) => {
    switch (status) {
        case 'applied':
            return 'Applied';
        case 'in-progress':
            return 'In Progress';
        case 'accepted':
            return 'Accepted';
        case 'rejected':
            return 'Rejected';
        default:
            return 'Unknown';
    }
};
