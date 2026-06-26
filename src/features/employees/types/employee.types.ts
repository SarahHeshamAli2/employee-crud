import type { EmployeeFormOutput } from "../schemes/employee.schema";

export interface Employee {
  id: number;
  name: string;
  age: number;
  department: string;
  salary: number;
  createdDate: string;
  modifiedDate?: string;
}

export interface EmployeeService {
  getAll: (search?: string) => Promise<Employee[]>;
  getSingle(id: number): Promise<Employee>;
  create(data: EmployeeFormOutput): Promise<Employee>;
  update(id: number, data: EmployeeFormOutput): Promise<Employee>;
  delete(id: number): Promise<void>;
}
