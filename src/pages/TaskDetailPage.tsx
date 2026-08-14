import { useParams, useNavigate } from "react-router";
import { initialTasks } from "../data/mockData";

function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const taskId = id ? parseInt(id, 10) : NaN;
  const task = initialTasks.find((t) => t.id === taskId);

  if (!task) {
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
