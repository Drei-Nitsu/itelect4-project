import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmissionBadge from "../components/SubmissionBadge";
import { getSubmissions, createSubmission, getCourses } from "../api/client";
import { SubmissionStatus } from "../types";
import { submissionSchema, type SubmissionFormValues } from "../schemas/submissionSchema";

function SubmissionsPage() {
  const queryClient = useQueryClient();

  const { data: submissions = [], isLoading, isError } = useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
  });

  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    mode: "onBlur",
    defaultValues: { courseCode: "", repoUrl: "" },
  });

  const mutation = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      reset();
    },
  });

  const onSubmit = (data: SubmissionFormValues) => {
    mutation.mutate({
      courseCode: data.courseCode,
      repoUrl: data.repoUrl,
    });
  };

  if (isLoading) return <div className="animate-pulse p-6">Loading submissions...</div>;
  if (isError) return <div className="rounded-lg bg-red-50 p-4 text-red-700">Failed to load submissions.</div>;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Submissions</h2>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-850">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">New Submission</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="courseCode" className="text-foreground mb-1 block">
                Course Reference
              </Label>
              {courses.length > 0 ? (
                <select
                  id="courseCode"
                  {...register("courseCode")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-invalid={errors.courseCode ? true : undefined}
                >
                  <option value="">-- Select a Course --</option>
                  {courses.map((c) => {
                    const code = c.code || (typeof c.id === "string" ? c.id : "");
                    return (
                      <option key={String(c.id)} value={code}>
                        {code ? `${code}: ` : ""}{c.title}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <Input
                  id="courseCode"
                  {...register("courseCode")}
                  placeholder="e.g. ITELECT4"
                  aria-invalid={errors.courseCode ? true : undefined}
                />
              )}
              {errors.courseCode && (
                <p className="mt-1 text-sm text-red-600">{errors.courseCode.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="repoUrl" className="text-foreground mb-1 block">
                GitHub Repository URL
              </Label>
              <Input
                id="repoUrl"
                {...register("repoUrl")}
                placeholder="https://github.com/username/ITELECT4-project"
                aria-invalid={errors.repoUrl ? true : undefined}
              />
              {errors.repoUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.repoUrl.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Submit Project"}
            </Button>
            {mutation.isError && (
              <p className="text-sm text-red-600">
                {mutation.error instanceof Error ? mutation.error.message : "Failed to submit. Please try again."}
              </p>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {submissions.length > 0 ? (
          submissions.map((s) => (
            <div
              key={s.id}
              className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{s.courseCode}</h4>
                  <SubmissionBadge
                    status={s.score !== undefined ? SubmissionStatus.Graded : SubmissionStatus.Submitted}
                  />
                </div>
                <a
                  href={s.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block truncate text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  {s.repoUrl}
                </a>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Submitted: {new Date(s.submittedAt).toLocaleDateString()}</span>
                {s.score !== undefined && <span className="font-medium text-green-600">Score: {s.score}/100</span>}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No submissions found.</p>
        )}
      </div>
    </div>
  );
}

export default SubmissionsPage;
