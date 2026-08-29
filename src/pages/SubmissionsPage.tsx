import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmissionBadge from "../components/SubmissionBadge";
import { getSubmissions, createSubmission } from "../api/client";
import { SubmissionStatus } from "../types";
import { submissionSchema, type SubmissionFormValues } from "../schemas/submissionSchema";

function SubmissionsPage() {
  const queryClient = useQueryClient();
  const { data: submissions = [], isLoading, isError } = useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
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
    mutation.mutate({ studentId: 1, ...data, submittedAt: new Date().toISOString() });
  };

  if (isLoading) return <div className="animate-pulse p-6">Loading submissions...</div>;
  if (isError) return <div className="rounded-lg bg-red-50 p-4 text-red-700">Failed to load submissions.</div>;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Submissions</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-wrap items-start gap-2">
        <div>
          <Label htmlFor="courseCode" className="text-foreground mb-1">
            Course code
          </Label>
          <Input
            id="courseCode"
            {...register("courseCode")}
            placeholder="Course code"
            aria-invalid={errors.courseCode ? true : undefined}
          />
          {errors.courseCode && (
            <p className="mt-1 text-sm text-red-600">{errors.courseCode.message}</p>
          )}
        </div>

        <div className="flex-1">
          <Label htmlFor="repoUrl" className="text-foreground mb-1">
            Repo URL
          </Label>
          <Input
            id="repoUrl"
            {...register("repoUrl")}
            placeholder="Repo URL"
            aria-invalid={errors.repoUrl ? true : undefined}
          />
          {errors.repoUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.repoUrl.message}</p>
          )}
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
      {mutation.isError && <p className="mb-4 text-sm text-red-600">Failed to submit. Please try again.</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {submissions.map((s) => (
          <div key={s.id}>
            <SubmissionBadge status={s.score ? SubmissionStatus.Graded : SubmissionStatus.Submitted} />
            <p className="text-sm text-gray-500 dark:text-gray-400">Course: {s.courseCode}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubmissionsPage;
