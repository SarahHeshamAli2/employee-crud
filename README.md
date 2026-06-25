# Employee Management CRUD

A full-stack Employee Management application built as part of a technical assessment.

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
- SQL Server
- Swagger/OpenAPI

### Backend (.NET Framework)

- ASP.NET Framework 4.7 Web API
- Entity Framework
- SQL Server

---

## Features

### Employee Management

- View all employees
- Create employee
- Update employee
- Delete employee

### Validation

- Required field validation
- Age range validation
- Salary validation
- Consistent API validation responses

### API

- RESTful endpoints
- Proper HTTP status codes
- Dependency Injection
- Entity Framework data access

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

## Project Structure

```text
Frontend/
Backend-NetCore/
Backend-Net47/
```

---

## Running the Application

### Frontend

```bash
npm install
npm run dev
```

### ASP.NET Core API

```bash
dotnet restore
dotnet run
```

### ASP.NET Framework 4.7 API

Open the solution in Visual Studio and run the project.

---

## Database

- SQL Server
- Entity Framework Migrations used for schema creation
- Update the connection string before running the application

---

## API Documentation

Swagger UI is available when running the ASP.NET Core API in Development mode.

---

## Notes

- Frontend is connected to the ASP.NET Core API.
- Both backend implementations provide the same CRUD functionality and database schema.
- Validation and proper HTTP status codes are implemented across API endpoints.
