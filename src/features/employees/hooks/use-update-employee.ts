import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmployeeFormOutput } from "../../schemes/employee.schema";
import { employeeService } from "../services/employees.service";

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  const updateEmployee = useMutation({
    mutationFn: ({ id, data }: { id: number; data: EmployeeFormOutput }) =>
      employeeService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  return {
    updateEmployee,
  };
}
