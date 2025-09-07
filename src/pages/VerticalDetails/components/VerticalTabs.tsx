import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskContent from "./TaskContent";
import AnnouncementsContent from "./AnnouncementsContent";
import { VerticalData } from "../types";
import { DetailedApplication } from "@/types/common";

interface VerticalTabsProps {
    verticalData: VerticalData;
    detailedApplication: DetailedApplication | null;
}

const VerticalTabs = ({ verticalData, detailedApplication }: VerticalTabsProps) => {
    return (
        <Tabs defaultValue="tasks" className="space-y-6">
            <TabsList className="bg-brand-gray border-brand-gray-light">
                <TabsTrigger value="tasks" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Tasks
                </TabsTrigger>
                <TabsTrigger value="announcements" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Announcements
                </TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-6">
                <TaskContent verticalData={verticalData} detailedApplication={detailedApplication} />
            </TabsContent>

            <TabsContent value="announcements" className="space-y-6">
                <AnnouncementsContent />
            </TabsContent>
        </Tabs>
    );
};

export default VerticalTabs;
