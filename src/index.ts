import type {
  User,
  Course,
  Submission,
  ApiResponse,
  UserProfile,
  CourseUpdate,
} from "../types/index.js";
import { SubmissionStatus } from "../types/index.js";


function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

//MOCK DATA
const users: User[] = [
  { id: 1, name: "Ian Manimtim", email: "ian@example.com", role: "student", isActive: true },
  { id: 2, name: "Lance Fedelicio", email: "lance@example.com", role: "student", isActive: true },
  { id: 3, name: "Aaron Manalo", email: "aaron@example.com", role: "instructor", isActive: true },
];

const courses: Course[] = [
  { id: 1, code: "CS101", title: "Intro to Computer Science", units: 3, semester: "1st" },
  { id: 2, code: "ITELECT4", title: "Web Development", units: 3, semester: "1st" },
];

//DEMONSTRATIONS
console.log("--- Demonstrating Generic Function ---");
const student = getById(users, 2);
console.log("Found Student:", student); 

const course = getById(courses, 2); 

console.log("\n--- Demonstrating Enum & Updated Interface ---");
const submissions: Submission[] = [
  {
    id: 1,
    studentId: 1,
    courseCode: "ITELECT4",
    repoUrl: "https://github.com/juan/project1",
    status: SubmissionStatus.Graded,
    submittedAt: new Date(),
    score: 95,
  },
  {
    id: 2,
    studentId: 2,
    courseCode: "ITELECT4",
    repoUrl: "https://github.com/maria/project1",
    status: SubmissionStatus.Pending, // Using the enum
    submittedAt: new Date(),
  },
];

console.log("Submissions:", submissions);

console.log("\n--- Demonstrating Generic ApiResponse Interface ---");

const userResponse: ApiResponse<User | null> = {
  success: student !== undefined,
  data: student ?? null, // Use the nullish coalescing operator for a fallback
  message: student ? "User fetched successfully" : "User not found",
};

const errorResponse: ApiResponse<null> = {
  success: false,
  data: null,
  message: "User not found.",
};

console.log("Successful API Response:", userResponse);
console.log("Error API Response:", errorResponse);

console.log("\n--- Demonstrating Utility Types ---");
// 1. UserProfile (using Pick)
if (student) {
  const userProfile: UserProfile = {
    id: student.id,
    name: student.name,
    email: student.email,
  };
  console.log("User Profile (from Pick):", userProfile);
}

// 2. CourseUpdate (using Partial)
const courseUpdate: CourseUpdate = {
  title: "Advanced Web Development", 
};
console.log("Course Update Object (from Partial):", courseUpdate);