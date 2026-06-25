import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeService } from "../services/employees.service";

interface UseDeleteEmployeeOptions {
  onSuccess?: () => void;
}

export function useDeleteEmployee({
  onSuccess,
}: UseDeleteEmployeeOptions = {}) {
  const queryClient = useQueryClient();

  const deleteEmployee = useMutation({
    mutationFn: (id: number) => employeeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      onSuccess?.();
    },
  });

  return { deleteEmployee };
}
