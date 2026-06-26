import { useQuery } from "@tanstack/react-query";
import { employeeService } from "../services/employees.service";

export function useEmployees(search?: string) {
  const {
    data: employees = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["employees", search],
    queryFn: () => employeeService.getAll(search),
  });

  return {
    employees,
    isLoading,
    isError,
    refetch,
    error,
  };
}
