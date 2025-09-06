import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const AnnouncementsContent = () => {
    return (
        <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-white flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Announcements
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="p-4 bg-brand-gray/30 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Round 2 Task Released</h4>
                        <p className="text-gray-400 text-sm">The Round 2 task has been released. Please review the requirements and submit your solution by the deadline.</p>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="p-4 bg-brand-gray/30 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Application Deadline Reminder</h4>
                        <p className="text-gray-400 text-sm">Don't forget to submit your application before the deadline. Late submissions will not be accepted.</p>
                        <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AnnouncementsContent;
