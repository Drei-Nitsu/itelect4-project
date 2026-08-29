export enum TaskStatus {
  Pending = "pending",
  InProgress = "in_progress",
  Completed = "completed",
}

export interface Project {
  id: number;
  title: string;
  description: string;
}
 
export interface Task {
  id: number;
  projectId: number;
  title: string;
  status: TaskStatus;
}
 
export interface LogEntry {
  id: number;
  taskId: number;
  action: string;
  timestamp: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  credits: number;
}

export enum SubmissionStatus {
  Submitted = "Submitted",
  Late = "Late",
  Graded = "Graded",
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number; // Optional, as seen in your mock data
}

// Wire types: json-server returns ids and dates as plain strings.
export type ApiTask = Omit<Task, "id"> & { id: string };

export type ApiSubmission = Omit<Submission, "id" | "submittedAt"> & {
  id: string;
  submittedAt: string;
};

export type NewSubmission = Omit<ApiSubmission, "id">;
