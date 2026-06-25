import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmployeeFormOutput } from "../../schemes/employee.schema";
import { employeeService } from "../services/employees.service";
import type { AxiosError } from "axios";
import type { Employee } from "../types/employee.types";

interface ApiValidationError {
  title: string;
  status: number;
  errors: Record<string, string[]>;
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  const createEmployee = useMutation<
    Employee,
    AxiosError<ApiValidationError>,
    EmployeeFormOutput
  >({
    mutationFn: (data: EmployeeFormOutput) => employeeService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  const errorMessage = createEmployee.error
    ? Object.values(createEmployee.error.response?.data?.errors ?? {})
        .flat()
        .join(", ") || createEmployee.error.response?.data?.title
    : null;

  return {
    createEmployee,
    errorMessage,
  };
}
