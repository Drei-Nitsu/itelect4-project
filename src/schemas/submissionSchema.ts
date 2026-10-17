import { z } from "zod";

const GITHUB_REPO_URL = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/i;

// Only the two fields the student actually inputs are validated here.
// studentId is derived from the JWT on the server, and submittedAt is auto-assigned.
export const submissionSchema = z
  .object({
    courseCode: z
      .string()
      .min(1, "Course code is required")
      .regex(/^[A-Z]{2,10}\d{1,4}$/, "Course code must look like ITELECT4 or CS101"),

    repoUrl: z
      .string()
      .min(1, "Repo URL is required")
      .regex(GITHUB_REPO_URL, "Repo URL must be a valid GitHub repo (e.g. https://github.com/user/repo)"),
  })
  .refine(
    (data) => data.repoUrl.toLowerCase().includes(data.courseCode.toLowerCase()),
    {
      message: "Repo URL should reference the course code you're submitting for",
      path: ["repoUrl"],
    }
  );

export type SubmissionFormValues = z.infer<typeof submissionSchema>;
