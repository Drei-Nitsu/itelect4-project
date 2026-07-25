import React, { useState } from "react";
import type { Project, Task, LogEntry } from "./types";
import { TaskStatus } from "./types";

import ProjectHeader from "./components/ProjectHeader";
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

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleToggleStatus = (_: React.MouseEvent<HTMLButtonElement>, taskId: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status:
                t.status === TaskStatus.Pending
                  ? TaskStatus.InProgress
                  : t.status === TaskStatus.InProgress
                  ? TaskStatus.Completed
                  : TaskStatus.Pending,
            }
          : t
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <ProjectHeader project={mockProject} />
      <hr />
      <h3>Tasks</h3>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={(e) => handleToggleStatus(e, task.id)}
        />
      ))}
      <hr />
      <ActivityLog logs={mockLogs} />
    </div>
  );
}