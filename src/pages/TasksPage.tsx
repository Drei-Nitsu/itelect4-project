import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task, ApiTask } from "../types";
import { TaskStatus } from "../types";
import { mockLogs } from "../data/mockData";
import { getTasks } from "../api/client";
import TaskItem from "../components/TaskItem";
import ActivityLog from "../components/ActivityLog";
import usePrevious from "../hooks/usePrevious";
import useUiStore from "../store/uiStore";
import { Link } from "react-router";

function TasksPage() {
  const queryClient = useQueryClient();
  const { data: apiTasks = [], isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  const tasks: Task[] = apiTasks.map((t) => ({ ...t, id: Number(t.id) }));

  const [logs, setLogs] = useState(mockLogs);
  const searchTerm = useUiStore((s) => s.searchTerm);
  const setSearchTerm = useUiStore((s) => s.setSearchTerm);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious(searchTerm);

  const handleToggleStatus = (taskId: number) => {
    const taskToUpdate = tasks.find((t) => t.id === taskId);
    if (!taskToUpdate) return;
    const statusCycle = [TaskStatus.Pending, TaskStatus.InProgress, TaskStatus.Completed];
    const idx = statusCycle.indexOf(taskToUpdate.status);
    const next = statusCycle[(idx + 1) % statusCycle.length];
    queryClient.setQueryData<ApiTask[]>(["tasks"], (old) =>
      old?.map((t) => (Number(t.id) === taskId ? { ...t, status: next } : t))
    );
    const newLog = { id: logs.length + 1, taskId, action: `Task ${taskId} status changed to ${next}`, timestamp: new Date() };
    setLogs((p) => [...p, newLog]);
  };

  const filtered = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading) return <div className="animate-pulse p-6">Loading tasks...</div>;
  if (isError) return <div className="rounded-lg bg-red-50 p-4 text-red-700">Failed to load tasks.</div>;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Tasks</h2>
      <input ref={searchInputRef} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search tasks..." className="w-full rounded border border-gray-300 p-2" />
      {previousSearch !== undefined && previousSearch !== searchTerm && <p className="mt-1 text-sm text-gray-500">Previous search: "{previousSearch}"</p>}

      <div className="mt-4 space-y-3">
        {filtered.length > 0 ? (
          filtered.map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex-1">
                <TaskItem task={task} onToggleStatus={() => handleToggleStatus(task.id)} />
              </div>
              <div className="ml-4">
                <Link to={`/tasks/${task.id}`} className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300">
                  Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No tasks found.</p>
        )}
      </div>

      <div className="mt-6">
        <ActivityLog logs={logs} />
      </div>
    </div>
  );
}

export default TasksPage;
