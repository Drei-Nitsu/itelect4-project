import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SubmissionBadge from "../components/SubmissionBadge";
import { getSubmissions, createSubmission } from "../api/client";
import { SubmissionStatus } from "../types";

function SubmissionsPage() {
  const queryClient = useQueryClient();
  const { data: submissions = [], isLoading, isError } = useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
  });

  const [courseCode, setCourseCode] = useState("");
  const [repoUrl, setRepoUrl] = useState("");

  const mutation = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      setCourseCode("");
      setRepoUrl("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCode || !repoUrl) return;
    mutation.mutate({ studentId: 1, courseCode, repoUrl, submittedAt: new Date().toISOString() });
  };

  if (isLoading) return <div className="animate-pulse p-6">Loading submissions...</div>;
  if (isError) return <div className="rounded-lg bg-red-50 p-4 text-red-700">Failed to load submissions.</div>;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Submissions</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2">
        <input
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          placeholder="Course code"
          className="rounded border border-gray-300 p-2"
        />
        <input
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Repo URL"
          className="flex-1 rounded border border-gray-300 p-2"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white disabled:bg-gray-400"
        >
          {mutation.isPending ? "Submitting..." : "Submit"}
        </button>
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
