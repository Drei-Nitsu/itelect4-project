import { useState } from "react";
import ProjectHeader from "./components/ProjectHeader.js";
import TaskItem from "./components/TaskItem.js";
import ActivityLog from "./components/ActivityLog.js";
import type { Project, Task, LogEntry } from "./types/index.js";
import { TaskStatus } from "./types/index.js";

const initialProject: Project = {
  id: "proj-001",
  name: "Q1 Marketing Campaign",
  dueDate: new Date("2026-10-31"),
};

const initialTask: Task = {
  id: 101,
  title: "Draft initial campaign brief",
  status: TaskStatus.InProgress,
  assignee: "Alice",
};

const initialLog: LogEntry = {
  id: 1,
  timestamp: new Date(),
  author: "Bob",
  action: "updated the project timeline",
};

function App() {
  const [task, setTask] = useState<Task>(initialTask);

  const handleToggleTask = (taskId: number) => {
    // This logic is for demonstration. It cycles through the statuses.
    if (taskId === task.id) {
      setTask((prevTask) => {
        let nextStatus: TaskStatus;
        if (prevTask.status === TaskStatus.ToDo) {
          nextStatus = TaskStatus.InProgress;
        } else if (prevTask.status === TaskStatus.InProgress) {
          nextStatus = TaskStatus.Done;
        } else {
          nextStatus = TaskStatus.ToDo;
        }
        return { ...prevTask, status: nextStatus };
      });
    }
  };

  return (
    <div className="app">
      <ProjectHeader project={initialProject} />

      <hr />

      <h3>Current Task</h3>
      <TaskItem task={task} onToggleStatus={handleToggleTask} />

      <hr />

      <h3>Recent Activity</h3>
      <ActivityLog entry={initialLog} />
    </div>
  );
}

export default App;