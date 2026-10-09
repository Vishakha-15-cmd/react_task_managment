# TaskFlow — React + TypeScript + Tailwind CSS

A complete React rewrite of the original TaskFlow project.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Lucide React
- Native Fetch API

## Backend

The original API is preserved:

`https://intern-crud-task-api.onrender.com`

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `PATCH /api/tasks/:id/status`
- `DELETE /api/tasks/:id`

The real access token returned by login is stored in:

`localStorage.accessToken`

Authenticated requests automatically send:

`Authorization: Bearer <token>`

## Architecture

```text
src/
├── app/
│   └── App.tsx
├── components/
│   ├── layout/
│   │   ├── AuthShell.tsx
│   │   └── PublicNavbar.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Modal.tsx
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   └── ProtectedRoute.tsx
│   │   └── hooks/
│   │       └── useAuth.ts
│   └── tasks/
│       ├── components/
│       │   ├── DashboardHeader.tsx
│       │   ├── StatCard.tsx
│       │   ├── TaskItem.tsx
│       │   └── TaskSidebar.tsx
│       └── hooks/
│           └── useTasks.ts
├── lib/
│   └── storage.ts
├── pages/
│   ├── DashboardPage.tsx
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   └── SignupPage.tsx
├── services/
│   └── api/
│       ├── authApi.ts
│       ├── client.ts
│       └── taskApi.ts
├── styles/
│   └── index.css
└── types/
    ├── auth.ts
    └── task.ts
```

## Run

```bash
npm install
npm run dev
```

For production:

```bash
npm run build
npm run preview
```

## Important

The dashboard reloads task data from the API after add/edit/delete/status changes. It does not use localStorage for task persistence. This means an edited task title will remain after a browser refresh when the API successfully stores the update.
