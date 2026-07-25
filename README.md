# Project & Task Management System (`itelect4-project`)

## Project Overview
This is a TypeScript-based application for tracking projects, task lifecycles, and system logs. It demonstrates advanced TypeScript features including Enums, Generic Interfaces, Generic Functions, and Built-in Utility Types.

## TypeScript Implementation Summary (`GT1 Part 2`)

### 1. Base Interfaces & Enums (`types/index.ts`)
* `Project`: Core structure for high-level project details.
* `Task`: Core structure for actionable items.
* `LogEntry`: Structure for tracking activity history.
* `TaskStatus` (Enum): Defines strict status constants (`pending`, `in_progress`, `completed`).

### 2. Generics & Utility Types
* `ApiResponse<T>`: Generic interface wrapper for standardized API responses.
* `TaskUpdate`: `Partial<Task>` for handling optional fields during updates.
* `TaskPreview`: `Pick<Task, "id" | "title" | "status">` for lightweight task summary views.
* `PublicProject`: `Omit<Project, "description">` for public project payload responses.
* `TaskStatusCount`: `Record<TaskStatus, number>` for mapping task status counts.

### 3. Application Execution (`src/index.ts`)
* Imports defined types and interfaces from `../types/index`.
* Demonstrates mock data creation and generic API response functions.
* Implements utility functions using `TaskPreview` and `ApiResponse<T>`.

---

## How to Run

1. **Install Dependencies:**
   ```bash
   npm install