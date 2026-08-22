import type { ApiTask, ApiSubmission, NewSubmission } from "../types";

const BASE_URL = "http://localhost:3001";

export async function getTasks(): Promise<ApiTask[]> {
  const res = await fetch(`${BASE_URL}/tasks`);
  if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.status}`);
  return res.json();
}

export async function getTaskById(id: string): Promise<ApiTask> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch task ${id}: ${res.status}`);
  return res.json();
}

export async function getSubmissions(): Promise<ApiSubmission[]> {
  const res = await fetch(`${BASE_URL}/submissions`);
  if (!res.ok) throw new Error(`Failed to fetch submissions: ${res.status}`);
  return res.json();
}

export async function createSubmission(submission: NewSubmission): Promise<ApiSubmission> {
  const res = await fetch(`${BASE_URL}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });
  if (!res.ok) throw new Error(`Failed to create submission: ${res.status}`);
  return res.json();
}
