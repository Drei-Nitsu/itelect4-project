import { useState, useEffect, useRef } from "react";
import type { Project, Task, LogEntry, User, Course } from "./types";
import { TaskStatus, SubmissionStatus } from "./types";

import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

import ProjectHeader from "./components/ProjectHeader";
import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import TaskItem from "./components/TaskItem";
import ActivityLog from "./components/ActivityLog";

const mockProject: Project = {
  id: 1,
  title: "Project Phoenix",
  description: "A project to rebuild the main application.",
};

const initialTasks: Task[] = [
  { id: 101, projectId: 1, title: "Design new UI mockups", status: TaskStatus.Pending },
  { id: 102, projectId: 1, title: "Develop login component", status: TaskStatus.InProgress },
];

const mockLogs: LogEntry[] = [
  { id: 1, taskId: 101, action: "Status changed to Pending", timestamp: new Date() },
];

const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
};

const mockCourse: Course = {
  id: 101,
  title: "IT Elective 4: Web Development with React and TypeScript",
  description: "An advanced course on modern web development techniques.",
  credits: 3,
};

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearchTerm = usePrevious(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(initialTasks);
      setIsError(false); // Reset error on load
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []); 

  const handleToggleStatus = (taskId: number) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    // Robustly cycle through task statuses
    const statusCycle = [TaskStatus.Pending, TaskStatus.InProgress, TaskStatus.Completed];
    const currentIndex = statusCycle.indexOf(taskToUpdate.status);
    const nextIndex = (currentIndex + 1) % statusCycle.length;
    const nextStatus = statusCycle[nextIndex];
    setTasks(tasks.map((task) => 
      task.id === taskId ? { ...task, status: nextStatus } : task
    ));

    const newLogEntry: LogEntry = {
      id: logs.length + 1,
      taskId: taskId,
      action: `Task ${taskId} status changed to ${nextStatus.replace("_", " ")}`,
      timestamp: new Date(),
    };
    setLogs((prevLogs) => [...prevLogs, newLogEntry]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 p-6 font-sans dark:bg-slate-950">
        <nav className="mb-6 flex items-center justify-end space-x-3">
          <button
            onClick={() => setIsError((e) => !e)}
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-amber-600"
          >
            Toggle Error
          </button>
          <button
            onClick={toggleDarkMode}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 w-28"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </nav>

        {isLoading ? (
          <div className="space-y-6">
            {/* Loading Skeletons */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-3">
                    <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="mt-4 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="mt-4 h-10 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="h-48 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Main Content */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <UserCard user={mockUser} />
                <CourseCard course={mockCourse} />
                <CourseCard course={mockCourse} variant="compact" />
              </div>
              <div className="mt-4">
                <h4 className="mb-2 text-lg font-semibold text-slate-700 dark:text-slate-200">Submission Statuses</h4>
                <div className="flex flex-wrap gap-2">
                  <SubmissionBadge status={SubmissionStatus.Submitted} />
                  <SubmissionBadge status={SubmissionStatus.Late} />
                  <SubmissionBadge status={SubmissionStatus.Graded} />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <ProjectHeader project={mockProject} />
              <button
                onClick={toggleDetails}
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600"
              >
                {showDetails ? "Hide" : "Show"} Project Details
              </button>
              {showDetails && (
                <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <p className="text-slate-600 dark:text-slate-300">
                    Additional project details can be shown here when toggled.
                  </p>
                </div>
              )}
            </div>

            {isError && (
              <div className="rounded-xl border border-red-300 bg-red-100 p-4 text-red-800 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300">
                <h4 className="font-bold">Error</h4>
                <p>Something went wrong while fetching data. Please try again.</p>
              </div>
            )}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-slate-100">Tasks</h3>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 w-full rounded-md border border-slate-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-gray-500"
              />
              {previousSearchTerm !== undefined && (
                <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                  Previous search: <span className="font-medium text-slate-700 dark:text-slate-300">{previousSearchTerm}</span>
                </p>
              )}
              <div className="space-y-3">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggleStatus={() => handleToggleStatus(task.id)}
                    />
                  ))
                ) : (
                  <p className="mt-4 text-center text-slate-500 dark:text-slate-400">No tasks found matching your search.</p>
                )}
              </div>
            </div>

            <ActivityLog logs={logs} />
          </div>
        )}
      </div>
    </div>
  );
}