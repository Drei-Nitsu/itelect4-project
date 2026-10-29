[![CI](https://github.com/Drei-Nitsu/itelect4-project/actions/workflows/ci.yml/badge.svg)](https://github.com/Drei-Nitsu/itelect4-project/actions/workflows/ci.yml)

# itelect4-project (GT4 Part 2)

Frontend application for IT Elective 4 (GT4 Part 2: Deploy both repos, then connect them).
Built with React, TypeScript, Tailwind CSS, TanStack Query, and Vite. Deployed on Vercel.

## Live Deployment Links
- **Live Frontend App**: https://itelect4-project-beta.vercel.app
- **Live Backend API**: https://itelect4-backend-beryl.vercel.app

## GT4 Part 2 Implementations
- **Central API Client**: `request()` helper in `src/api/client.ts` consuming `import.meta.env.VITE_API_URL` with automatic Bearer token injection.
- **Cleaned Derived Types**: Removed mock fields (`studentId`, dummy client-side `submittedAt`).
- **Real JWT Authentication**: Real Login and Registration pages (`LoginPage.tsx`, `RegisterPage.tsx`) connected to backend API.
- **Course Dropdown Integration**: Course selection on `SubmissionsPage.tsx` dynamically populated from `GET /api/courses`.
- **Deprecated Mock Environment**: Deleted `db.json` and removed `json-server` dependency.

## Tech Stack
- **Framework**: React with Vite
- **Language**: TypeScript
- **State Management**: Zustand (auth & UI)
- **Data Fetching**: TanStack React Query
- **Styling**: Tailwind CSS
- **Form Validation**: React Hook Form + Zod
