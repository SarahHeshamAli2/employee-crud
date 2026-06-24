import { z } from "zod";

export const employeeFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  age: z.preprocess(
    (value) => {
      if (value === "") return undefined;
      return Number(value);
    },
    z
      .number({
        error: "Age is required",
      })
      .int("Age must be a whole number")
      .positive("Age must be a positive number"),
  ),
  department: z.string().min(3, "Department is required"),
  salary: z.preprocess(
    (value) => {
      if (value === "") return undefined;
      return Number(value);
    },
    z
      .number({
        error: "Salary is required",
      })
      .positive("Salary must be a positive number"),
  ),
});

export type EmployeeFormInput = z.input<typeof employeeFormSchema>;
export type EmployeeFormOutput = z.output<typeof employeeFormSchema>;
