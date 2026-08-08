import { Task, TaskStatus } from "../types";
import { FC } from "react";

export interface TaskItemProps {
  task: Task;
  onToggleStatus: () => void;
}

const getStatusBadgeStyles = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.Pending:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case TaskStatus.InProgress:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case TaskStatus.Completed:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

const TaskItem: FC<TaskItemProps> = ({ task, onToggleStatus }) => {
  const statusBadgeClasses = getStatusBadgeStyles(task.status);
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-500/50 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center space-x-3">
        <h4 className="font-medium text-slate-800 dark:text-slate-100">{task.title}</h4>
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClasses}`}>
          {task.status.replace("_", " ")}
        </span>
      </div>
      <button
        onClick={onToggleStatus}
        className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600"
      >
        Toggle Status
      </button>
    </div>
  );
};
export default TaskItem;