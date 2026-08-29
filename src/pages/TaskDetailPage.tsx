import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../api/client";

function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: task, isLoading, isError } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTaskById(id!),
    enabled: Boolean(id),
  });

  if (isLoading) return <div className="animate-pulse p-6">Loading task...</div>;

  if (isError || !task) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">No task found with id "{id}".</div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{task.title}</h2>
      <p className="text-gray-700 dark:text-gray-300">Status: {task.status.replace("_", " ")}</p>
      <button onClick={() => navigate("/tasks")} className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white">
        Back to Tasks
      </button>
    </div>
  );
}

export default TaskDetailPage;
