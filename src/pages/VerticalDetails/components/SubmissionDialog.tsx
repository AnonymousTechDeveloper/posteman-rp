import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DetailedApplication } from "@/types/common";
import { TaskSubmissionForm } from "./TaskSubmissionForm";

interface SubmissionDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    detailedApplication: DetailedApplication | null;
    onSubmissionSuccess: () => void;
}

const SubmissionDialog = ({
    isOpen,
    onOpenChange,
    detailedApplication,
    onSubmissionSuccess,
}: SubmissionDialogProps) => {
    if (!detailedApplication || detailedApplication.overallStatus !== "in-progress" || !detailedApplication.currentRound) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-brand-black border-brand-gray text-white max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Submit Your Task</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Complete your task submission for {detailedApplication.verticalName}
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto">
                    <TaskSubmissionForm
                        applicationId={detailedApplication.applicationId}
                        roundId={detailedApplication.currentRound.roundId}
                        formConfig={detailedApplication.currentRound.task.formConfig}
                        onSubmissionSuccess={() => {
                            onSubmissionSuccess();
                            onOpenChange(false);
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubmissionDialog;
