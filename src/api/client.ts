import useAuthStore from "../store/authStore";
import type {
  ApiTask,
  ApiSubmission,
  NewSubmissionBody,
  Course,
  AuthResponse,
  User,
} from "../types";
import { TaskStatus } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL || "";

export interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

/**
 * Central HTTP request helper function.
 * Uses `import.meta.env.VITE_API_URL` as the base URL.
 * Automatically attaches `Authorization: Bearer <token>` for authenticated calls.
 */
export async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = true, headers = {}, ...rest } = options;
  const token = useAuthStore.getState().token;

  const resolvedHeaders = new Headers(headers);

  if (!resolvedHeaders.has("Content-Type") && !(rest.body instanceof FormData)) {
    resolvedHeaders.set("Content-Type", "application/json");
  }

  if (requiresAuth && token) {
    resolvedHeaders.set("Authorization", `Bearer ${token}`);
  }

  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const res = await fetch(url, {
    ...rest,
    headers: resolvedHeaders,
  });

  if (!res.ok) {
    let errorMessage = `Request failed: ${res.status}`;
    try {
      const errorData = await res.json();
      if (errorData?.error) {
        errorMessage = errorData.error;
      }
    } catch {
      // response was not JSON
    }
    throw new Error(errorMessage);
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}

/* ==========================================================================
 * Authentication Endpoints
 * ========================================================================== */

export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    requiresAuth: false,
  });
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  return request<User>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
    requiresAuth: false,
  });
}

/* ==========================================================================
 * Submissions Endpoints
 * ========================================================================== */

export async function getSubmissions(): Promise<ApiSubmission[]> {
  return request<ApiSubmission[]>("/api/submissions");
}

export async function createSubmission(
  submission: NewSubmissionBody
): Promise<ApiSubmission> {
  return request<ApiSubmission>("/api/submissions", {
    method: "POST",
    body: JSON.stringify(submission),
  });
}

/* ==========================================================================
 * Reference Data (Courses) Endpoints — Public (No Auth)
 * ========================================================================== */

export async function getCourses(): Promise<Course[]> {
  return request<Course[]>("/api/courses", { requiresAuth: false });
}

export async function getCourseById(id: string): Promise<Course> {
  return request<Course>(`/api/courses/${id}`, { requiresAuth: false });
}

/* ==========================================================================
 * Tasks Endpoints (with graceful fallback for decoupled project modules)
 * ========================================================================== */

const DEFAULT_TASKS: ApiTask[] = [
  { id: "101", projectId: 1, title: "Design new UI mockups", status: TaskStatus.Pending },
  { id: "102", projectId: 1, title: "Develop login component", status: TaskStatus.InProgress },
  { id: "103", projectId: 1, title: "Write API integration tests", status: TaskStatus.Completed },
];

export async function getTasks(): Promise<ApiTask[]> {
  try {
    return await request<ApiTask[]>("/api/tasks", { requiresAuth: false });
  } catch {
    return DEFAULT_TASKS;
  }
}

export async function getTaskById(id: string): Promise<ApiTask> {
  try {
    return await request<ApiTask>(`/api/tasks/${id}`, { requiresAuth: false });
  } catch {
    const task = DEFAULT_TASKS.find((t) => t.id === id);
    if (task) return task;
    throw new Error(`Task ${id} not found`);
  }
}


/* ==========================================================================
 * AI Review Endpoints (GT5)
 * ========================================================================== */

import type { AiReply } from "../types";

export async function askAi(prompt: string): Promise<AiReply> {
  return request<AiReply>("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}
