import { z } from "zod";

export const employeeFormSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters."),
  age: z.preprocess(
    (value) => {
      if (value === "") return undefined;
      return Number(value);
    },
    z
      .number({
        error: "Age is required",
      })
      .max(90, "max age is 90")
      .int("Age must be a whole number")
      .positive("Age must be a positive number"),
  ),
  department: z.string().min(2, "Department is required"),
  salary: z.preprocess(
    (value) => {
      if (value === "") return undefined;
      return Number(value);
    },
    z
      .number({
        error: "Salary is required",
      })
      .max(100000, "max salary is million")
      .positive("Salary must be a positive number"),
  ),
});

export type EmployeeFormInput = z.input<typeof employeeFormSchema>;
export type EmployeeFormOutput = z.output<typeof employeeFormSchema>;
