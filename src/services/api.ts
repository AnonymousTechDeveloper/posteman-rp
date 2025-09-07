import axios from "axios";

// Base API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const applicantApi = {
  // Get applicant dashboard data
  getDashboard: async () => {
    try {
      // TODO: Uncomment when backend is ready
      // const response = await api.get("/applicant/dashboard");
      // return response.data;

      // Mock data for now
      const mockData = [
        {
          applicationId: "backend-app-123",
          verticalName: "Backend Development",
          status: "in-progress" as const,
        },
        {
          applicationId: "frontend-app-456",
          verticalName: "Frontend Development",
          status: "in-progress" as const,
        },
        {
          applicationId: "ai-ml-app-789",
          verticalName: "AI/ML",
          status: "rejected" as const,
        },
        {
          applicationId: "design-app-101",
          verticalName: "Design",
          status: "in-progress" as const,
        },
        {
          applicationId: "gamedev-app-202",
          verticalName: "Game Dev",
          status: "not_applied" as const,
        },
        {
          applicationId: "neurotech-app-303",
          verticalName: "NeuroTech",
          status: "in-progress" as const,
        },
        {
          applicationId: "events-app-404",
          verticalName: "Events",
          status: "in-progress" as const,
        },
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockData;
    } catch (error) {
      console.error("Error fetching applicant dashboard:", error);
      throw error;
    }
  },

  // Get detailed application status
  getApplicationDetails: async (applicationId: string) => {
    try {
      // TODO: Uncomment when backend is ready
      // const response = await api.get(`/applicant/applications/${applicationId}`);
      // return response.data;

      // Mock data for each vertical with different statuses
      const mockDetails: Record<string, any> = {
        // Backend Development - In Progress
        "backend-app-123": {
          applicationId: "backend-app-123",
          verticalName: "Backend Development",
          overallStatus: "in-progress",
          currentRound: {
            roundId: "rnd_backend_2",
            roundNumber: 2,
            title: "API Development Task",
            description:
              "<h3>Create a RESTful API</h3><p>Build a comprehensive <strong>CRUD API</strong> using <em>Node.js and Express</em> with the following features:</p><ul><li>User authentication</li><li>Data validation</li><li>Error handling</li><li>Database integration</li></ul><p><strong>Deadline:</strong> Submit your solution by the specified date.</p>",
            deadline: "2025-01-15T23:59:59Z",
            task: {
              title: "Build a Blog API",
              formConfig: {
                urlLabel: "GitHub Repository URL",
                enableAttachments: true,
                commentsLabel: "Implementation notes and setup instructions",
              },
            },
            submissionStatus: "pending",
          },
        },
        // Frontend Development - In Progress
        "frontend-app-456": {
          applicationId: "frontend-app-456",
          verticalName: "Frontend Development",
          overallStatus: "in-progress",
          currentRound: {
            roundId: "rnd_frontend_1",
            roundNumber: 1,
            title: "React Component Challenge",
            description:
              "<h3>Build Interactive Components</h3><p>Create a modern <strong>React application</strong> with the following requirements:</p><ul><li>Responsive design</li><li>State management</li><li>API integration</li><li>Component reusability</li></ul><p>Use <em>TypeScript</em> and <em>Tailwind CSS</em> for styling.</p>",
            deadline: "2025-01-12T23:59:59Z",
            task: {
              title: "E-commerce Dashboard",
              formConfig: {
                urlLabel: "Live Demo URL",
                enableAttachments: true,
                commentsLabel: "Features implemented and design decisions",
              },
            },
            submissionStatus: "pending",
          },
        },
        // AI/ML - Rejected
        "ai-ml-app-789": {
          applicationId: "ai-ml-app-789",
          verticalName: "AI/ML",
          overallStatus: "rejected",
          lastParticipatedRound: {
            roundNumber: 1,
            title: "Machine Learning Model",
            taskTitle: "Image Classification Challenge",
          },
        },
        // Design - In Progress
        "design-app-101": {
          applicationId: "design-app-101",
          verticalName: "Design",
          overallStatus: "in-progress",
          currentRound: {
            roundId: "rnd_design_3",
            roundNumber: 3,
            title: "UI/UX Design Challenge",
            description:
              "<h3>Design System Creation</h3><p>Create a comprehensive <strong>design system</strong> for a mobile application:</p><ul><li>Color palette and typography</li><li>Component library</li><li>User flow diagrams</li><li>Prototype interactions</li></ul><p>Focus on <em>accessibility</em> and <em>user experience</em> principles.</p>",
            deadline: "2025-01-18T23:59:59Z",
            task: {
              title: "Mobile Banking App Design",
              formConfig: {
                urlLabel: "Figma/Design Tool URL",
                enableAttachments: true,
                commentsLabel: "Design rationale and user research insights",
              },
            },
            submissionStatus: "pending",
          },
        },
        // Game Dev - Not Applied
        "gamedev-app-202": {
          applicationId: "gamedev-app-202",
          verticalName: "Game Dev",
          overallStatus: "not_applied",
        },
        // NeuroTech - In Progress
        "neurotech-app-303": {
          applicationId: "neurotech-app-303",
          verticalName: "NeuroTech",
          overallStatus: "in-progress",
          currentRound: {
            roundId: "rnd_neurotech_1",
            roundNumber: 1,
            title: "Brain-Computer Interface",
            description:
              "<h3>EEG Data Processing</h3><p>Develop a <strong>BCI prototype</strong> for real-time data visualization:</p><ul><li>Signal processing algorithms</li><li>Real-time visualization</li><li>User interface design</li><li>Data analysis tools</li></ul><p>Use <em>Python</em> with <em>OpenBCI</em> or similar hardware.</p>",
            deadline: "2025-01-10T23:59:59Z",
            task: {
              title: "EEG Data Visualization",
              formConfig: {
                urlLabel: "GitHub Repository URL",
                enableAttachments: true,
                commentsLabel: "Technical implementation and hardware setup",
              },
            },
            submissionStatus: "pending",
          },
        },
        // Events - Submitted
        "events-app-404": {
          applicationId: "events-app-404",
          verticalName: "Events",
          overallStatus: "in-progress",
          currentRound: {
            roundId: "rnd_events_2",
            roundNumber: 2,
            title: "Event Management System",
            description:
              "<h3>Event Planning Platform</h3><p>Build a comprehensive <strong>event management system</strong> with:</p><ul><li>Event creation and management</li><li>Attendee registration</li><li>Payment processing</li><li>Analytics dashboard</li></ul><p>Focus on <em>scalability</em> and <em>user experience</em>.</p>",
            deadline: "2025-01-08T23:59:59Z",
            task: {
              title: "Event Management Platform",
              formConfig: {
                urlLabel: "Live Application URL",
                enableAttachments: true,
                commentsLabel: "Features implemented and deployment notes",
              },
            },
            submissionStatus: "pending",
          },
        },
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockDetails[applicationId] || null;
    } catch (error) {
      console.error("Error fetching application details:", error);
      throw error;
    }
  },

  // Submit task for current round
  submitTask: async (
    applicationId: string,
    roundId: string,
    submissionData: FormData
  ) => {
    try {
      // TODO: Uncomment when backend is ready
      // const response = await api.post(`/applicant/applications/${applicationId}/rounds/${roundId}/submit`, submissionData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      // return response.data;

      // Mock response for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate random success/failure for testing
      const isSuccess = Math.random() > 0.2; // 80% success rate

      if (isSuccess) {
        return {
          message: "Submission successful!",
          submissionId: `sub_${Math.random().toString(36).substr(2, 9)}`,
        };
      } else {
        throw new Error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      throw error;
    }
  },
};

export default api;
