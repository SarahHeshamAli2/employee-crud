import { useState } from "react";
import type { Employee } from "./types/employee.types";
import Button from "../../shared/ui/button";
import EmployeeTable from "./components/employee-table";
import EmployeeFormModal from "./components/emloyee-form-modal";
import ConfirmDeleteModal from "../../shared/ui/confirm-delete-modal";
import { useEmployees } from "./hooks/use-employees";
import type { EmployeeFormOutput } from "../schemes/employee.schema";
import { useCreateEmployee } from "./hooks/use-create-employee";
import { useUpdateEmployee } from "./hooks/use-update-employee";
import { useDeleteEmployee } from "./hooks/use-delete-employee";

export function EmployeesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  const { employees, isLoading, refetch, isError, error } = useEmployees();
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
    createEmployee.reset();
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteOpen(true);
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
        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          isLoading={isLoading}
        />
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
    </div>
  );
}
