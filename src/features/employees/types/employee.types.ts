import type { EmployeeFormOutput } from "../../schemes/employee.schema";

export interface Employee {
  id: number;
  name: string;
  age: number;
  department: string;
  salary: number;
}

export interface EmployeeService {
  getAll(): Promise<Employee[]>;
  create(data: EmployeeFormOutput): Promise<Employee>;
  update(id: number, data: EmployeeFormOutput): Promise<Employee>;
  delete(id: number): Promise<void>;
}
