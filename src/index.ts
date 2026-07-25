import {
  Project,
  Task,
  TaskStatus,
  ApiResponse,
  TaskPreview,
  TaskStatusCount,
} from "../types/index";
 
// --- Mock Data ---
const projects: Project[] = [
  { id: 1, title: "Project Phoenix", description: "A project to rebuild the main application." },
  { id: 2, title: "Project Titan", description: "A project for data infrastructure." },
];
 
const tasks: Task[] = [
  { id: 101, projectId: 1, title: "Design new UI mockups", status: TaskStatus.Completed, assignedTo: "Alice" },
  { id: 102, projectId: 1, title: "Develop login component", status: TaskStatus.InProgress, assignedTo: "Bob" },
  { id: 103, projectId: 1, title: "Setup CI/CD pipeline", status: TaskStatus.Pending },
  { id: 104, projectId: 2, title: "Migrate user database", status: TaskStatus.InProgress, assignedTo: "Charlie" },
];

// --- Mock API Function ---
function fetchTasksForProject(projectId: number): ApiResponse<Task[]> {
  const projectTasks = tasks.filter(task => task.projectId === projectId);
  
  if (projectTasks.length > 0) {
    return {
      success: true,
      data: projectTasks,
      message: `Found ${projectTasks.length} tasks for project ${projectId}.`
    };
  } else {
    return {
      success: false,
      data: [],
      message: `No tasks found for project ${projectId}.`
    };
  }
}
 
// --- Utility Functions ---
function getTaskPreviews(taskList: Task[]): TaskPreview[] {
  return taskList.map(({ id, title, status }) => ({ id, title, status }));
}
 
function getStatusCounts(taskList: Task[]): TaskStatusCount {
  const counts: TaskStatusCount = {
    [TaskStatus.Pending]: 0,
    [TaskStatus.InProgress]: 0,
    [TaskStatus.Completed]: 0,
  };

  for (const task of taskList) {
    counts[task.status]++;
  }
  return counts;
}
 
// --- Generic Functions ---
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}
 
// Finds an item by its ID in an array of objects that have an 'id' property.
function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}
 
const project1TasksResponse = fetchTasksForProject(1);
console.log("--- API Response for Project 1 ---");
console.log(project1TasksResponse);

if (project1TasksResponse.success) {
  console.log("\n--- Task Previews for Project 1 ---");
  const previews = getTaskPreviews(project1TasksResponse.data);
  console.log(previews);

  console.log("\n--- Status Counts for Project 1 ---");
  const counts = getStatusCounts(project1TasksResponse.data);
  console.log(counts);
}

console.log("\n--- DEMONSTRATING GENERIC FUNCTIONS ---");

const firstProject = getFirst(projects);
console.log("First Project:", firstProject);

const task102 = getById(tasks, 102);
console.log("Task with ID 102:", task102);

const project2 = getById(projects, 2);
console.log("Project with ID 2:", project2);
