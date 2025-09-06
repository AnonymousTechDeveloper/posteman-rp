import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { SubmissionData } from "../types";

interface SubmissionDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    submissionData: SubmissionData;
    onSubmissionDataChange: (data: SubmissionData) => void;
    onSubmit: () => void;
}

const SubmissionDialog = ({
    isOpen,
    onOpenChange,
    submissionData,
    onSubmissionDataChange,
    onSubmit,
}: SubmissionDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-brand-black border-brand-gray text-white">
                <DialogHeader>
                    <DialogTitle>Submit Your Application</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Upload your project files and provide additional information.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-white mb-2 block">GitHub Repository Link</label>
                        <Input
                            placeholder="https://github.com/username/repository"
                            value={submissionData.githubLink}
                            onChange={(e) => onSubmissionDataChange({ ...submissionData, githubLink: e.target.value })}
                            className="bg-brand-gray border-brand-gray-light text-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-white mb-2 block">Additional Documents</label>
                        <div className="border-2 border-dashed border-brand-gray-light rounded-lg p-4 text-center">
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-400">Drag and drop files here or click to browse</p>
                            <input type="file" multiple className="hidden" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-white mb-2 block">Additional Notes</label>
                        <Textarea
                            placeholder="Any additional information about your submission..."
                            value={submissionData.notes}
                            onChange={(e) => onSubmissionDataChange({ ...submissionData, notes: e.target.value })}
                            className="bg-brand-gray border-brand-gray-light text-white"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="border-brand-gray text-white hover:bg-brand-gray"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onSubmit}
                            className="bg-primary hover:bg-primary/90"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubmissionDialog;
