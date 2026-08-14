import SubmissionBadge from "../components/SubmissionBadge";
import { allSubmissions } from "../data/mockData";
import { Submission, SubmissionStatus } from "../types";

function SubmissionsPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Submissions</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {allSubmissions.map((s: Submission) => (
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
