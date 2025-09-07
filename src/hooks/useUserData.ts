import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "@/types/common";

export const useUserData = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (!storedData) {
      // Create mock user data for testing
      const mockUserData = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        verticals: ["backend", "frontend", "ai-ml"],
      };
      localStorage.setItem("userData", JSON.stringify(mockUserData));
      setUserData(mockUserData);
      setIsLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(storedData);
      setUserData(parsed);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return { userData, isLoading };
};
