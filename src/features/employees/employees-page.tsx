import { useState } from "react";
import type { Employee } from "./types/employee.types";
import Button from "../../shared/ui/button";
import EmployeeTable from "./components/employee-table";
import mockEmployees from "./mock-employees";
import EmployeeFormModal from "./components/emloyee-form-modal";
import type { EmployeeFormOutput } from "../schemes/employee.schema";
import ConfirmDeleteModal from "../../shared/ui/confirm-delete-modal";

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const handleSubmit = (data: EmployeeFormOutput) => {
    if (employeeToEdit) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employeeToEdit.id ? { ...employeeToEdit, ...data } : emp,
        ),
      );
    } else {
      setEmployees((prev) => [
        {
          id: crypto.randomUUID(),
          ...data,
        },
        ...prev,
      ]);
    }

    setIsFormOpen(false);
    setEmployeeToEdit(null);
  };

  const handleEdit = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setIsFormOpen(true);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Employees</h1>
        <Button
          onClick={() => {
            setEmployeeToEdit(null);
            setIsFormOpen(true);
          }}>
          + Add new employee
        </Button>{" "}
      </div>

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={() => setIsDeleteOpen(true)}
      />

      <EmployeeFormModal
        isOpen={isFormOpen}
        employee={employeeToEdit}
        onSubmit={handleSubmit}
        onClose={() => {
          setIsFormOpen(false);
          setEmployeeToEdit(null);
        }}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {}}
        itemName="My File.pdf"
      />
    </div>
  );
}
