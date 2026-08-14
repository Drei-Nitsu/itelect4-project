import { useEffect, useRef, useState } from "react";
import type { Task } from "../types";
import { initialTasks, mockLogs } from "../data/mockData";
import TaskItem from "../components/TaskItem";
import ActivityLog from "../components/ActivityLog";
import usePrevious from "../hooks/usePrevious";

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState(mockLogs);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious(searchTerm);

  useEffect(() => {
    const t = setTimeout(() => {
      setTasks(initialTasks);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const handleToggleStatus = (taskId: number) => {
    const taskToUpdate = tasks.find((t) => t.id === taskId);
    if (!taskToUpdate) return;
    const statusCycle = ["pending", "in_progress", "completed"] as const;
    const current = taskToUpdate.status;
    const idx = statusCycle.indexOf(current as any);
    const next = statusCycle[(idx + 1) % statusCycle.length] as any;
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: next } : t)));
    const newLog = { id: logs.length + 1, taskId, action: `Task ${taskId} status changed to ${next}`, timestamp: new Date() };
    setLogs((p) => [...p, newLog]);
  };

  const filtered = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading) return <div className="animate-pulse p-6">Loading tasks...</div>;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Tasks</h2>
      <input ref={searchInputRef} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search tasks..." className="w-full rounded border border-gray-300 p-2" />
      {previousSearch !== undefined && previousSearch !== searchTerm && <p className="mt-1 text-sm text-gray-500">Previous search: "{previousSearch}"</p>}

      <div className="mt-4 space-y-3">
        {filtered.length > 0 ? (
          filtered.map((task) => <TaskItem key={task.id} task={task} onToggleStatus={() => handleToggleStatus(task.id)} />)
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
