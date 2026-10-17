export enum TaskStatus {
  Pending = "pending",
  InProgress = "in_progress",
  Completed = "completed",
}

export type Role = "student" | "admin" | "instructor";

export interface Project {
  id: number | string;
  title: string;
  description: string;
}

export interface Task {
  id: number | string;
  projectId: number | string;
  title: string;
  status: TaskStatus;
}

export interface LogEntry {
  id: number | string;
  taskId: number | string;
  action: string;
  timestamp: Date;
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  role?: Role;
  isActive?: boolean;
}

export interface Course {
  id: string | number;
  code?: string;
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
  id: string;
  studentId: string;
  courseCode: string;
  repoUrl: string;
  submittedAt: string;
  score?: number;
}

export type ApiSubmission = Submission;

/**
 * Cleaned up submission payload:
 * No invented studentId or submittedAt — the server automatically derives
 * studentId from the JWT token and submittedAt from the current timestamp.
 */
export interface NewSubmissionBody {
  courseCode: string;
  repoUrl: string;
}

export type NewSubmission = NewSubmissionBody;

export interface AuthResponse {
  token: string;
  user: User;
}

// Wire type for Task
export type ApiTask = Omit<Task, "id"> & { id: string };
