import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../shared/ui/button";
import Modal from "../../../shared/ui/modal";
import ControlledInput from "../../../shared/ui/controlled-input";
import type { Employee } from "../types/employee.types";
import {
  employeeFormSchema,
  type EmployeeFormInput,
  type EmployeeFormOutput,
} from "../schemes/employee.schema";
import { useEffect } from "react";

export interface EmployeeFormModalProps {
  isOpen: boolean;
  employee?: Employee | null;
  onClose: () => void;
  onSubmit: (data: EmployeeFormOutput) => void;
  errorMessage?: string | null;
}

export default function EmployeeFormModal({
  isOpen,
  onClose,
  onSubmit,
  employee,
  errorMessage,
}: EmployeeFormModalProps) {
  const isEdit = !!employee;

  const { control, handleSubmit, reset } = useForm<
    EmployeeFormInput,
    unknown,
    EmployeeFormOutput
  >({
    resolver: zodResolver(employeeFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      age: "",
      department: "",
      salary: "",
    },
  });
  const submitForm = (data: EmployeeFormOutput) => {
    onSubmit(data);
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  useEffect(() => {
    if (isOpen) {
      reset(
        employee
          ? {
              name: employee.name,
              age: String(employee.age),
              department: employee.department,
              salary: String(employee.salary),
            }
          : {
              name: "",
              age: "",
              department: "",
              salary: "",
            },
      );
    }
  }, [isOpen, employee, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? "Edit Employee" : "Create Employee"}
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(submitForm)}>Save</Button>
        </>
      }>
      <div className="space-y-4">
        <ControlledInput name="name" control={control} label="Employee Name" />
        <ControlledInput
          name="age"
          control={control}
          label="Age"
          type="number"
        />
        <ControlledInput
          name="department"
          control={control}
          label="Department"
        />
        <ControlledInput
          name="salary"
          control={control}
          label="Salary"
          type="number"
        />

        {errorMessage && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded-sm">
            {errorMessage}
          </p>
        )}
      </div>
    </Modal>
  );
}
