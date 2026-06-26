# Employee Management CRUD

A full-stack Employee Management application built as part of a technical assessment.

## Live Demo

Frontend: [employee-crud-ten.vercel.app](https://employee-crud-ten.vercel.app/)

> Note: the deployed frontend currently points to one of the backend branches (`main` or `deploy-postgres`) — update this note with which one it's wired to, since the other will need to be deployed separately for the demo to reflect it.

## Tech Stack

### Frontend

- React
- TypeScript
- React Query
- React Hook Form
- Zod
- Tailwind CSS

### Backend (.NET Core)

- ASP.NET Core Web API (.NET 10)
- Entity Framework Core
- SQL Server (`main` branch) / PostgreSQL via Neon (`deploy-postgres` branch)
- Swagger/OpenAPI

### Backend (.NET Framework)

- ASP.NET Framework 4.7 Web API
- Entity Framework
- SQL Server

---

## Backend Branches

The ASP.NET Core backend is maintained across two branches depending on the target database/hosting setup:

| Branch            | Database              | Hosting                      | Notes                                                                 |
| ----------------- | --------------------- | ---------------------------- | --------------------------------------------------------------------- |
| `main`            | SQL Server            | Local / on-prem              | Default branch, used for local development                            |
| `deploy-postgres` | PostgreSQL (via Neon) | Neon (cloud-hosted Postgres) | Same API/EF Core functionality, swapped provider for cloud deployment |

Both branches expose the same API contract (endpoints, DTOs, validation rules) — only the EF Core database provider and connection string differ.

To run the Postgres/cloud variant:

```bash
git checkout deploy-postgres
dotnet restore
dotnet ef database update
dotnet run
```

> Update the connection string in `appsettings.json` (or via environment variables / user secrets) with your Neon Postgres connection string before running.

---

## Features

### Employee Management

- View all employees
- View certain employee detail
- Search employees by name
- Create employee
- Update employee
- Delete employee

### Validation

Enforced via Data Annotations on both `EmployeeCreateDto` and `EmployeeUpdateDto`, with automatic `400 Bad Request` responses from `[ApiController]` model validation:

- **Name** — required, minimum length 2
- **Age** — must be between 1 and 120
- **Salary** — must be 0 or greater
- **Department** — required
- Consistent API validation responses (`ValidationProblemDetails` / `400 Bad Request` with field-level error messages)
- Create and update requests are held to the same validation rules

### API

- RESTful endpoints
- Proper HTTP status codes
- Dependency Injection
- Entity Framework data access
- CORS configured to allow requests from the frontend origin
- Centralized error handling / normalized error response shape across endpoints

### Frontend

- Server-state caching, background refetching, and invalidation via React Query
- Form state and validation handled with React Hook Form + Zod schemas
- Type-safe API layer (TypeScript interfaces shared with the Employee entity shape)
- Loading, empty, and error states on list/detail views

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

## API Endpoints

Base URL (ASP.NET Core, local dev): `https://localhost:{port}/api`

| Method | Endpoint                   | Description                                                                    | Success          | Error(s)                           |
| ------ | -------------------------- | ------------------------------------------------------------------------------ | ---------------- | ---------------------------------- |
| GET    | `/employees`               | Get all employees                                                              | `200 OK`         | `500 Internal Server Error`        |
| GET    | `/employees?search={name}` | Search employees by name                                                       | `200 OK`         | `500 Internal Server Error`        |
| GET    | `/employees/{id}`          | Get a single employee by id                                                    | `200 OK`         | `404 Not Found`                    |
| POST   | `/employees`               | Create a new employee (returns `Location` header pointing to the new resource) | `201 Created`    | `400 Bad Request` (validation)     |
| PUT    | `/employees/{id}`          | Update an existing employee                                                    | `204 No Content` | `400 Bad Request`, `404 Not Found` |
| DELETE | `/employees/{id}`          | Delete an employee                                                             | `204 No Content` | `404 Not Found`                    |

### Request Body (POST / PUT)

```json
{
  "name": "John Doe",
  "age": 30,
  "salary": 10000,
  "department": "IT"
}
```

### Validation Error Response Shape

```json
{
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Name": ["Name is required."],
    "Age": ["Age must be between 18 and 65."],
    "Salary": ["Salary must be greater than 0."]
  }
}
```

---

## Project Structure

```text
Frontend/
Backend-NetCore/   # main branch: SQL Server | deploy-postgres branch: Neon Postgres
Backend-Net47/
```

---

## Running the Application

### Frontend

```bash
pnpm install
pnpm run dev
```

### ASP.NET Core API — SQL Server (`main` branch)

```bash
git checkout main
dotnet restore
dotnet run
```

### ASP.NET Core API — PostgreSQL / Neon (`deploy-postgres` branch)

```bash
git checkout deploy-postgres
dotnet restore
dotnet ef database update
dotnet run
```

### ASP.NET Framework 4.7 API

Open the solution in Visual Studio and run the project.

---

## Database

- `main` branch: SQL Server, with Entity Framework Migrations used for schema creation
- `deploy-postgres` branch: PostgreSQL hosted on [Neon](https://neon.tech), with Entity Framework Core Migrations targeting the Npgsql provider
- Update the connection string before running the application (per branch — see [Backend Branches](#backend-branches))

---

## API Documentation

Swagger UI is available when running the ASP.NET Core API in Development mode, typically at `/swagger`.

---

## Notes

- Frontend is connected to the ASP.NET Core API.
- Two backend deployment targets are maintained as separate branches: `main` (SQL Server, local/on-prem) and `deploy-postgres` (Neon Postgres, cloud-hosted).
- Both backend implementations (.NET Core and .NET Framework) provide the same CRUD functionality and database schema.
- Validation and proper HTTP status codes are implemented across API endpoints.
- CORS is enabled on the API to allow cross-origin requests from the frontend during local development.
