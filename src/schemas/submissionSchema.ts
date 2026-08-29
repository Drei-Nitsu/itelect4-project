import { z } from "zod";

// studentId and submittedAt are set by the app at submit time, so only the
// two fields the student actually types are validated here.
export const submissionSchema = z
  .object({
    // matches the course code format in db.json, e.g. ITELECT4
    courseCode: z
      .string()
      .min(1, "Course code is required")
      .regex(/^[A-Z]{2,10}\d{1,2}$/, "Course code must look like ITELECT4 (letters, then a number)"),

    // no .url() — existing repo links have no "https://" prefix
    repoUrl: z
      .string()
      .min(1, "Repo URL is required")
      .regex(/github\.com/i, "Repo URL must be a GitHub link"),
  })
  // the repo should actually belong to the course being submitted
  .refine(
    (data) => data.repoUrl.toLowerCase().includes(data.courseCode.toLowerCase()),
    {
      message: "Repo URL should reference the course code you're submitting for",
      path: ["repoUrl"],
    }
  );

export type SubmissionFormValues = z.infer<typeof submissionSchema>;
