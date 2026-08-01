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
  assignedTo?: string; 
}
 
export interface LogEntry {
  id: number;
  taskId: number;
  action: string;
  timestamp: Date;
}
