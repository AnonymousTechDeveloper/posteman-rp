import { UserData } from "@/types/common";

interface WelcomeSectionProps {
    userData: UserData;
}

export const WelcomeSection = ({ userData }: WelcomeSectionProps) => {
    return (
        <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">
                Welcome back, {userData.name}!
            </h2>
            <p className="text-gray-400">
                Track your application deadlines and explore opportunities.
            </p>
        </div>
    );
};
