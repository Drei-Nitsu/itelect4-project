import { SubmissionStatus } from "../types";
import { FC } from "react";

interface SubmissionBadgeProps {
  status: SubmissionStatus;
}

const SubmissionBadge: FC<SubmissionBadgeProps> = ({ status }) => {
  const badgeStyles = {
    [SubmissionStatus.Submitted]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    [SubmissionStatus.Late]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    [SubmissionStatus.Graded]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-md px-2 py-1 text-xs font-medium
        ${badgeStyles[status]}
      `}
    >
      {status}
    </span>
  );
};

export default SubmissionBadge;