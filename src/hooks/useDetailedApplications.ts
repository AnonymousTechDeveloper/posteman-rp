import { useEffect, useState } from "react";
import { applicantApi } from "@/services/api";
import {
  ApplicationData,
  DetailedApplication,
  TaskDeadline,
} from "@/types/common";

export const useDetailedApplications = (applications: ApplicationData[]) => {
  const [taskDeadlines, setTaskDeadlines] = useState<TaskDeadline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetailedApplications = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Filter only in-progress applications to get deadlines
      const inProgressApplications = applications.filter(
        (app) => app.status === "in-progress"
      );

      console.log("All applications:", applications);
      console.log("In-progress applications:", inProgressApplications);

      if (inProgressApplications.length === 0) {
        setTaskDeadlines([]);
        setIsLoading(false);
        return;
      }

      // Fetch detailed data for each in-progress application
      const detailedPromises = inProgressApplications.map((app) =>
        applicantApi.getApplicationDetails(app.applicationId)
      );

      const detailedResults = await Promise.all(detailedPromises);

      console.log("Detailed results:", detailedResults);

      // Convert detailed applications to task deadlines
      const deadlines: TaskDeadline[] = detailedResults
        .filter((result): result is DetailedApplication => result !== null)
        .filter(
          (
            result
          ): result is DetailedApplication & { overallStatus: "in-progress" } =>
            result.overallStatus === "in-progress"
        )
        .map((app) => {
          const currentRound = app.currentRound;
          const deadlineDate = new Date(currentRound.deadline);
          const now = new Date();
          const timeDiff = deadlineDate.getTime() - now.getTime();
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

          console.log(
            `Task: ${currentRound.title}, Deadline: ${currentRound.deadline}, Days diff: ${daysDiff}, Submission: ${currentRound.submissionStatus}`
          );

          // Determine status based on deadline and submission status
          let status: TaskDeadline["status"];
          if (currentRound.submissionStatus === "submitted") {
            status = "completed";
          } else if (daysDiff < 0) {
            status = "overdue";
          } else if (daysDiff <= 3) {
            status = "due-soon";
          } else {
            status = "upcoming";
          }

          return {
            id: currentRound.roundId,
            title: currentRound.title,
            verticalName: app.verticalName,
            deadline: currentRound.deadline,
            status,
            roundNumber: currentRound.roundNumber,
          };
        });

      setTaskDeadlines(deadlines);
    } catch (err) {
      console.error("Error fetching detailed applications:", err);
      setError("Failed to fetch application details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (applications.length > 0) {
      fetchDetailedApplications();
    } else {
      setTaskDeadlines([]);
      setIsLoading(false);
    }
  }, [applications]);

  return {
    taskDeadlines,
    isLoading,
    error,
    refetch: fetchDetailedApplications,
  };
};
