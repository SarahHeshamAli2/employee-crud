# Employee Management CRUD

A full-stack Employee Management application built as part of a technical assessment.

## Live Demo

Frontend: https://employee-crud-ten.vercel.app/

Backend API: /swagger (run locally)

---

## Tech Stack

### Frontend

- React
- TypeScript
- React Query
- React Hook Form
- Zod
- Tailwind CSS

### Backend (.NET Core)

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server / PostgreSQL (Neon)
- Swagger / OpenAPI

### Backend (.NET Framework)

- ASP.NET Framework 4.7 Web API
- Entity Framework
- SQL Server

---

## Backend Branches

- main → SQL Server (local development)
- deploy-postgres → PostgreSQL (Neon cloud)

Both branches share the same API contract (endpoints, DTOs, validation rules).

---

## Features

- Full CRUD operations for employees
- Search employees by name
- Form validation (backend + frontend)
- RESTful API with proper HTTP status codes
- Swagger API documentation
- React Query for caching & server state management

---

## Architecture

Frontend (React) ↔ ASP.NET Core Web API ↔ Database

---

## Employee Entity

```json
{
  "id": 1,
  "name": "John Doe",
  "age": 30,
  "salary": 10000,
  "department": "IT",
  "createdAt": "2026-06-25T10:00:00",
  "updatedAt": "2026-06-25T10:00:00"
}
```

---

## API Documentation

Swagger UI:

http://localhost:{port}/swagger

---

## Running the Application

### Frontend

```bash
pnpm install
pnpm run dev
```

### Backend (.NET Core - SQL Server)

```bash
git checkout main
dotnet restore
dotnet run
```

### Backend (.NET Core - PostgreSQL)

```bash
git checkout deploy-postgres
dotnet restore
dotnet ef database update
dotnet run
```

### Backend (.NET Framework 4.7)

Open solution in Visual Studio and run.

---

## Notes

- Frontend is connected to ASP.NET Core API
- Two backend variants exist (SQL Server / PostgreSQL)
- Swagger available for API testing
