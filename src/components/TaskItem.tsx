import type { FC, MouseEvent } from "react";
import type { Task } from "../types/index.js";

interface TaskItemProps {
  task: Task;
  onToggleStatus: (taskId: number) => void;
}

const TaskItem: FC<TaskItemProps> = ({ task, onToggleStatus }) => {
  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onToggleStatus(task.id);
  };

  return (
    <div className="task-item">
      <h4>{task.title}</h4>
      <p>Status: {task.status}</p>
      <p>Assignee: {task.assignee ?? "Unassigned"}</p>
      <button onClick={handleToggle}>Toggle Status</button>
    </div>
  );
};

export default TaskItem;