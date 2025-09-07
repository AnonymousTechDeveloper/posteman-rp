import { useEffect, useState } from "react";
import { applicantApi } from "@/services/api";
import { ApplicationData } from "@/types/common";

export const useApplications = () => {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await applicantApi.getDashboard();
      setApplications(data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to fetch applications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return {
    applications,
    isLoading,
    error,
    refetch: fetchApplications,
  };
};
