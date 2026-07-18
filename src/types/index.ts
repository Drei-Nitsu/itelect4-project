export enum TaskStatus {
  ToDo = "TO_DO",
  InProgress = "IN_PROGRESS",
  Done = "DONE",
}

export interface Project {
  id: string;
  name: string;
  dueDate: Date;
}

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  assignee?: string;
}

export interface LogEntry {
  id: number;
  timestamp: Date;
  author: string;
  action: string;
}
