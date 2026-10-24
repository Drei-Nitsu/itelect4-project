import { z } from "zod";

export const aiRequestSchema = z.object({
  prompt: z
    .string()
    .transform((s) => s.trim())
    .pipe(
      z
        .string()
        .min(20, "Description must be at least 20 characters after trimming.")
        .max(2000, "Description must be at most 2000 characters after trimming.")
    ),
});

export type AiFormValues = z.input<typeof aiRequestSchema>;

