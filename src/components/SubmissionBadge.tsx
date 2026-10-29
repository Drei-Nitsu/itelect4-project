import { FC } from "react";
import type { ApiSubmission } from "../types/index";

interface SubmissionBadgeProps {
  submission: ApiSubmission;
}

const SubmissionBadge: FC<SubmissionBadgeProps> = ({ submission }) => {
  return (
    <div className="inline-flex flex-col gap-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <span className="text-gray-700 dark:text-gray-300">
        Repo: {submission.repoUrl}
      </span>
      <span className="font-medium text-gray-900 dark:text-white">
        Score: {submission.score !== undefined ? submission.score : "Not graded yet"}
      </span>
    </div>
  );
};

export default SubmissionBadge;
