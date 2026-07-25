import React from "react";
import type { Task } from "../types";
export interface TaskItemProps {
  task: Task;
  onToggleStatus: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleStatus }) => {
  return (
    <div className="task-item">
      <h4>{task.title}</h4>
      <p>Status: {task.status}</p>
      <button onClick={onToggleStatus}>Toggle Status</button>
    </div>
  );
};
export default TaskItem;