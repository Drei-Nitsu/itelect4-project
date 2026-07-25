export interface User {
  id:       number;
  name:     string;
  email:    string;
  role:     "student" | "admin" | "instructor"; 
  isActive: boolean;
  score?:   number; 
}
 
export interface Course {
  code:     string;
  title:    string;
  units:    number;
  semester: string;
}
 
export interface Submission {
  id:          number;
  studentId:   number;
  courseCode:  string;
  repoUrl:     string;
  submittedAt: Date;
  score?:      number; 
}

export type ID = number | string;
 
export type Coordinate = {
  x: number;
  y: number;
};
 
export type Formatter = (value: number) => string;
 
export type StringOrNumber = string | number;
export type Status         = "pending" | "active" | "inactive"; 
 
export declare function printId(id: StringOrNumber): void;
 
export type StudentWithCourse = User & {
  enrolledCourse: Course;
  gpa:            number;
};
 
export declare function processInput(input: StringOrNumber): string;
export declare function formatDate(value: string | Date): string;
