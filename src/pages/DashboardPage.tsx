import UserCard from "../components/UserCard";
import CourseCard from "../components/CourseCard";
import SubmissionBadge from "../components/SubmissionBadge";
import { mockUser, mockCourse } from "../data/mockData";
import { SubmissionStatus } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions, getCourses } from "../api/client";
import useAuthStore from "../store/authStore";

function DashboardPage() {
  const token = useAuthStore((s) => s.token);
  const currentUser = useAuthStore((s) => s.user);

  const { data: submissions = [] } = useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
    enabled: Boolean(token),
  });

  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const displayUser = currentUser || mockUser;
  const displayCourse = courses[0] || mockCourse;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UserCard user={displayUser} />
        <CourseCard course={displayCourse} />
        {courses.length > 1 ? (
          <CourseCard course={courses[1]} variant="compact" />
        ) : (
          <CourseCard course={mockCourse} variant="compact" />
        )}
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">Recent Submissions</h3>
        {token ? (
          submissions.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {submissions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{s.courseCode}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(s.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <SubmissionBadge
                    status={s.score !== undefined ? SubmissionStatus.Graded : SubmissionStatus.Submitted}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No submissions yet.</p>
          )
        ) : (
          <p className="text-sm text-gray-500">
            Sign in to view and track your recent submissions.
          </p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
