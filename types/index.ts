//INTERFACES
// Core data models for the application

export enum SubmissionStatus {
  Pending = "PENDING",
  Graded = "GRADED",
  Revising = "REVISING",
}
export interface User {
id: number;
name: string;
email: string;
role: "student" | "instructor"; // only these values
isActive: boolean;
}
export interface Course {
id: number;
code: string;
title: string;
units: number;
semester: string;
}
export interface Submission {
id: number;
studentId: number;
courseCode: string;
repoUrl: string;
status: SubmissionStatus;
submittedAt: Date;
score?: number; 
}

//GENERIC INTERFACE
// A standard wrapper for my API calls
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

//UTILITY TYPES
// For showing a user's public profile info.
export type UserProfile = Pick<User, "id" | "name" | "email">;

// To allow updating a course without sending all fields.
export type CourseUpdate = Partial<Course>;
