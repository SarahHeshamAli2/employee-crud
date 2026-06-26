import { useState } from "react";
import type { Employee } from "./types/employee.types";
import Button from "../../shared/ui/button";
import EmployeeTable from "./components/employee-table";
import EmployeeFormModal from "./components/emloyee-form-modal";
import ConfirmDeleteModal from "../../shared/ui/confirm-delete-modal";
import { useEmployees } from "./hooks/use-employees";
import type { EmployeeFormOutput } from "./schemes/employee.schema";
import { useCreateEmployee } from "./hooks/use-create-employee";
import { useUpdateEmployee } from "./hooks/use-update-employee";
import { useDeleteEmployee } from "./hooks/use-delete-employee";
import EmployeeDetailModal from "./components/employee-detail-modal";
import { useDebounce } from "./hooks/use-debounce";
import Input from "../../shared/ui/input";

export function EmployeesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [employeeToView, setEmployeeToView] = useState<Employee | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { employees, isLoading, refetch, isError, error } = useEmployees(
    debouncedSearch.trim() || undefined,
  );
  const { createEmployee, errorMessage } = useCreateEmployee();
  const { updateEmployee } = useUpdateEmployee();
  const { deleteEmployee } = useDeleteEmployee({
    onSuccess: () => {
      setIsDeleteOpen(false);
      setEmployeeToDelete(null);
    },
  });

  const handleSubmit = (data: EmployeeFormOutput) => {
    if (employeeToEdit) {
      updateEmployee.mutate(
        { id: employeeToEdit.id, data },
        {
          onSuccess: () => setIsFormOpen(false),
        },
      );
    } else {
      createEmployee.mutate(data, {
        onSuccess: () => setIsFormOpen(false),
      });
    }
    setEmployeeToEdit(null);
  };

  const handleEdit = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setIsFormOpen(true);
    setIsViewOpen(false);
    createEmployee.reset();
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteOpen(true);
  };

  const handleView = (employee: Employee) => {
    setEmployeeToView(employee);
    setIsViewOpen(true);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Employees</h1>
        <Button
          onClick={() => {
            setEmployeeToEdit(null);
            setIsFormOpen(true);
            createEmployee.reset();
          }}>
          + Add new employee
        </Button>{" "}
      </div>
      {isError ? (
        <div className="flex flex-col items-center gap-2 py-8 text-sm text-red-600">
          <p>
            Failed to load employees
            {error instanceof Error ? `: ${error.message}` : ""}
          </p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      ) : (
        <>
          {(employees.length > 0 || debouncedSearch) && (
            <Input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-2 text-sm mb-4 w-64"
            />
          )}
          <EmployeeTable
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            isLoading={isLoading}
            onView={handleView}
            emptyMessage={
              debouncedSearch
                ? `No employees found for "${debouncedSearch}".`
                : "No employees found."
            }
          />
        </>
      )}
      {isFormOpen && (
        <EmployeeFormModal
          errorMessage={errorMessage}
          isOpen={isFormOpen}
          employee={employeeToEdit}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setEmployeeToEdit(null);
            createEmployee.reset();
          }}
          isSubmitting={createEmployee.isPending || updateEmployee.isPending}
        />
      )}
      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setEmployeeToDelete(null);
        }}
        onConfirm={() => {
          if (employeeToDelete) deleteEmployee.mutate(employeeToDelete.id);
        }}
        itemName={employeeToDelete?.name ?? ""}
        isLoading={deleteEmployee.isPending}
      />

      <EmployeeDetailModal
        isOpen={isViewOpen}
        onClose={() => {
          setIsViewOpen(false);
          setEmployeeToView(null);
        }}
        employee={employeeToView}
        onEdit={handleEdit}
      />
    </div>
  );
}
