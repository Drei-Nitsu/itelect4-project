import type { Project, LogEntry, User, Course } from "../types";

export const mockProject: Project = {
  id: 1,
  title: "Project Phoenix",
  description: "A project to rebuild the main application.",
};

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
