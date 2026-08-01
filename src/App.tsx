import { useState, useEffect, useRef } from "react";
import type { Project, Task, LogEntry } from "./types";
import { TaskStatus } from "./types";

import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDetails, toggleDetails] = useToggle(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearchTerm = usePrevious(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(initialTasks);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer); 
  }, []); 

  const handleToggleStatus = (taskId: number) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    const nextStatus = taskToUpdate.status === TaskStatus.Pending ? TaskStatus.InProgress : taskToUpdate.status === TaskStatus.InProgress ? TaskStatus.Completed : TaskStatus.Pending;

  
    setTasks(tasks.map((task) => 
      task.id === taskId ? { ...task, status: nextStatus } : task
    ));

    // Add a new log entry
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

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <ProjectHeader project={mockProject} />
      <button onClick={toggleDetails}>{showDetails ? "Hide" : "Show"} Project Details</button>
      {showDetails && (
        <div style={{ padding: "10px", border: "1px solid #ccc", margin: "10px 0" }}>
          <p>Additional project details can be shown here when toggled.</p>
        </div>
      )}
      <hr />
      <h3>Tasks</h3>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {previousSearchTerm !== undefined && (
        <p style={{ fontSize: "0.8em", color: "gray" }}>
          Previous search: {previousSearchTerm}
        </p>
      )}
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={() => handleToggleStatus(task.id)}
        />
      ))}
      <hr />
      <ActivityLog logs={logs} />
    </div>
  );
}