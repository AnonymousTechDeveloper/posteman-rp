export interface UserData {
  name: string;
  email: string;
  phone: string;
  verticals: string[];
}

export interface VerticalData {
  id: string;
  name: string;
  icon: string;
  currentRound: number;
  task: string; // HTML markup from backend
  applicationStatus: "not_applied" | "applied" | "submitted" | "rejected";
  submissionDeadline?: string;
}

export interface SubmissionData {
  githubLink: string;
  documents: File[];
  notes: string;
}
