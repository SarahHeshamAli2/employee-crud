import { useQuery } from "@tanstack/react-query";
import { employeeService } from "../services/employees.service";

export function useEmployees() {
  const {
    data: employees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => employeeService.getAll(),
  });

  return {
    employees,
    isLoading,
    isError,
  };
}
