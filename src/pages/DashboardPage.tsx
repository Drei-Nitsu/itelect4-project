import UserCard from "../components/UserCard";
import CourseCard from "../components/CourseCard";
import SubmissionBadge from "../components/SubmissionBadge";
import { mockUser, mockCourse } from "../data/mockData";
import { SubmissionStatus } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "../api/client";

function DashboardPage() {
  const { data: submissions = [] } = useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
  });

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UserCard user={mockUser} />
        <CourseCard course={mockCourse} />
        <CourseCard course={mockCourse} variant="compact" />
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">Recent Submissions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {submissions.map((s) => (
          <SubmissionBadge key={s.id} status={s.score ? SubmissionStatus.Graded : SubmissionStatus.Submitted} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
