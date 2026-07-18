import type { Course, User } from "../types/index.js";


type UserWithScore = User & { score: number };

/**
 * Returns a hardcoded mock user object, assigning the provided ID.
 * @param id The ID to assign to the mock user.
 * @returns A mock user object with a score.
 */
function getUser(id: number): UserWithScore {
  return {
    id: id,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: "student",
    isActive: true,
    score: 95.5,
  };
}

/**
 * Calculates the letter grade based on a score.
 * @param score The student's score.
 * @param maxScore The maximum possible score.
 * @returns A letter grade ('A', 'B', 'C', or 'F').
 */
function calculateGrade(score: number, maxScore: number): "A" | "B" | "C" | "F" {
  // Ensure score is not negative or greater than the max score
  if (score < 0 || score > maxScore) {
    throw new Error("Invalid score provided.");
  }

  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  return "F";
}

/**
 * Formats course details into a string.
 * @param course An object containing course details.
 * @returns A formatted string with course details.
 */
function formatCourse(course: Pick<Course, "title" | "units" | "semester">): string {
  return `${course.title} (${course.units} units) - ${course.semester}`;
}

const user: UserWithScore = getUser(1);
console.log("User Object:", user);

const grade: string = calculateGrade(85, 100);
console.log(`Calculated Grade: ${grade}`);

const sampleCourse: Course = { id: 2, code: "ITELECT4", title: "Web Development", units: 3, semester: "1st" };
const courseInfo: string = formatCourse(sampleCourse);
console.log(`Course Info: ${courseInfo}`);