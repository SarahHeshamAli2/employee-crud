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
} from "../../schemes/employee.schema";

export interface EmployeeFormModalProps {
  isOpen: boolean;
  employee?: Employee | null;
  onClose: () => void;
  onSubmit: (data: EmployeeFormOutput) => void;
}

export default function EmployeeFormModal({
  isOpen,
  onClose,
  onSubmit,
  employee,
}: EmployeeFormModalProps) {
  const isEdit = !!employee;

  const { control, handleSubmit, reset } = useForm<
    EmployeeFormInput,
    unknown,
    EmployeeFormOutput
  >({
    resolver: zodResolver(employeeFormSchema),
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
      </div>
    </Modal>
  );
}
