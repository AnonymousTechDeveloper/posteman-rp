export interface UserData {
  name: string;
  email: string;
  phone: string;
  verticals: string[];
}

export interface TaskDeadline {
  id: string;
  title: string;
  verticalName: string;
  deadline: string;
  status: "upcoming" | "due-soon" | "overdue" | "completed";
  roundNumber: number;
}

export type TaskStatus = TaskDeadline["status"];

// New API response types
export interface ApplicationData {
  applicationId: string;
  verticalName: string;
  status: "applied" | "in-progress" | "accepted" | "rejected";
}

export type ApplicationStatus = ApplicationData["status"];

// Detailed application status types
export interface TaskFormConfig {
  urlLabel: string;
  enableAttachments: boolean;
  commentsLabel: string;
}

export interface Task {
  title: string;
  formConfig: TaskFormConfig;
}

export interface CurrentRound {
  roundId: string;
  roundNumber: number;
  title: string;
  description: string;
  deadline: string;
  task: Task;
  submissionStatus: "pending" | "submitted";
}

export interface LastParticipatedRound {
  roundNumber: number;
  title: string;
  taskTitle: string;
}

export interface DetailedApplicationInProgress {
  applicationId: string;
  verticalName: string;
  overallStatus: "in-progress";
  currentRound: CurrentRound;
}

export interface DetailedApplicationRejected {
  applicationId: string;
  verticalName: string;
  overallStatus: "rejected";
  lastParticipatedRound: LastParticipatedRound;
}

export type DetailedApplication =
  | DetailedApplicationInProgress
  | DetailedApplicationRejected;

// Submission types
export interface SubmissionRequest {
  taskUrl: string;
  comments: string;
  attachments: string; // Comma-separated string of links
}

export interface SubmissionResponse {
  message: string;
  submissionId: string;
}
