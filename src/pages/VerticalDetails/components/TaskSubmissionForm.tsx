import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Link } from "lucide-react";
import { applicantApi } from "@/services/api";
import { SubmissionResponse } from "@/types/common";
import { useToast } from "@/hooks/use-toast";

interface TaskSubmissionFormProps {
    applicationId: string;
    roundId: string;
    formConfig: {
        urlLabel: string;
        enableAttachments: boolean;
        commentsLabel: string;
    };
    onSubmissionSuccess: () => void;
}

export const TaskSubmissionForm = ({
    applicationId,
    roundId,
    formConfig,
    onSubmissionSuccess,
}: TaskSubmissionFormProps) => {
    const [taskUrl, setTaskUrl] = useState("");
    const [comments, setComments] = useState("");
    const [attachmentLinks, setAttachmentLinks] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const addAttachmentInput = () => {
        setAttachmentLinks([...attachmentLinks, ""]);
    };

    const removeAttachmentInput = (index: number) => {
        setAttachmentLinks(attachmentLinks.filter((_, i) => i !== index));
    };

    const handleLinkChange = (index: number, link: string) => {
        const newLinks = [...attachmentLinks];
        newLinks[index] = link;
        setAttachmentLinks(newLinks);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!taskUrl.trim()) {
            toast({
                title: "Error",
                description: "Please enter a task URL",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("taskUrl", taskUrl);
            formData.append("comments", comments);

            // Add attachments as comma-separated string
            const validLinks = attachmentLinks.filter(link => link.trim() !== "");
            formData.append("attachments", validLinks.join(","));

            const response: SubmissionResponse = await applicantApi.submitTask(
                applicationId,
                roundId,
                formData
            );

            toast({
                title: "Success!",
                description: response.message,
            });

            // Reset form
            setTaskUrl("");
            setComments("");
            setAttachmentLinks([]);

            // Notify parent component
            onSubmissionSuccess();
        } catch (error) {
            console.error("Submission error:", error);
            toast({
                title: "Submission Failed",
                description: error instanceof Error ? error.message : "An error occurred while submitting",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-white">Submit Your Task</CardTitle>
                <CardDescription className="text-gray-400">
                    Complete your submission for this round
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Task URL */}
                    <div className="space-y-2">
                        <Label htmlFor="taskUrl" className="text-white">
                            {formConfig.urlLabel}
                        </Label>
                        <Input
                            id="taskUrl"
                            type="url"
                            placeholder="https://github.com/username/repository"
                            value={taskUrl}
                            onChange={(e) => setTaskUrl(e.target.value)}
                            className="bg-brand-black border-brand-gray text-white placeholder:text-gray-500"
                            required
                        />
                    </div>

                    {/* Comments */}
                    <div className="space-y-2">
                        <Label htmlFor="comments" className="text-white">
                            {formConfig.commentsLabel}
                        </Label>
                        <Textarea
                            id="comments"
                            placeholder="Add any notes or comments for the reviewer..."
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="bg-brand-black border-brand-gray text-white placeholder:text-gray-500 min-h-[100px]"
                        />
                    </div>

                    {/* Attachments */}
                    {formConfig.enableAttachments && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-white">Additional Attachments</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addAttachmentInput}
                                    className="border-brand-gray text-white hover:bg-brand-gray"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Link
                                </Button>
                            </div>

                            {attachmentLinks.length === 0 ? (
                                <div className="text-center py-8 border-2 border-dashed border-brand-gray rounded-lg">
                                    <Link className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-400 text-sm">No attachment links added</p>
                                    <p className="text-gray-500 text-xs">Click "Add Link" to add attachment URLs</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {attachmentLinks.map((link, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <Input
                                                type="url"
                                                placeholder="https://example.com/attachment.pdf"
                                                value={link}
                                                onChange={(e) => handleLinkChange(index, e.target.value)}
                                                className="bg-brand-black border-brand-gray text-white placeholder:text-gray-500"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeAttachmentInput(index)}
                                                className="border-red-500 text-red-500 hover:bg-red-500/10"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setTaskUrl("");
                                setComments("");
                                setAttachmentLinks([]);
                            }}
                            className="border-brand-gray text-white hover:bg-brand-gray"
                            disabled={isSubmitting}
                        >
                            Clear
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary hover:bg-primary/90 text-white"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Task"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
