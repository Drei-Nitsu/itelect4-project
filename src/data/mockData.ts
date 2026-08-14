import type { Project, Task, LogEntry, User, Course } from "../types";
import { TaskStatus } from "../types";

export const mockProject: Project = {
  id: 1,
  title: "Project Phoenix",
  description: "A project to rebuild the main application.",
};

export const initialTasks: Task[] = [
  { id: 101, projectId: 1, title: "Design new UI mockups", status: TaskStatus.Pending },
  { id: 102, projectId: 1, title: "Develop login component", status: TaskStatus.InProgress },
];

export const mockLogs: LogEntry[] = [
  { id: 1, taskId: 101, action: "Status changed to Pending", timestamp: new Date() },
];

export const mockUser: User = {
  id: 1,
  name: "Lance Lenard Fedelicio",
  email: "lance.fedelicio@example.com",
};

export const secondUser: User = {
  id: 2,
  name: "Marc Lawrence Dela Pena",
  email: "marc.delapena@example.com",
};

export const mockCourse: Course = {
  id: 101,
  title: "IT Elective 4: Web Development with React and TypeScript",
  description: "An advanced course on modern web development techniques.",
  credits: 3,
};

export const allSubmissions = [
  { id: 1, studentId: 1, courseCode: "ITELECT4", repoUrl: "github.com/juan/itelect4-project", submittedAt: new Date(), score: 95 },
  { id: 2, studentId: 1, courseCode: "ITELECT3", repoUrl: "github.com/juan/itelect3-final", submittedAt: new Date() },
];
