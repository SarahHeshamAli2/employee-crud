import { useQuery } from "@tanstack/react-query";
import { employeeService } from "../services/employees.service";

export function useEmployee(id: number) {
  const {
    data: employee = null,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => employeeService.getSingle(id),
    enabled: !!id,
  });

  return { employee, isLoading, isError, refetch, error };
}
