import axiosInstance from "../api/axios";
import type { EmployeeService } from "../types/employee.types";

export const employeeService: EmployeeService = {
  getAll: async (search) => {
    const { data } = await axiosInstance.get("/employees", {
      params: { search: search?.trim() ? search.trim() : undefined },
    });
    return data;
  },
  getSingle: async (id) => {
    const { data } = await axiosInstance.get(`/employees/${id}`);
    return data;
  },
  create: async (data) => {
    const { data: newEmployee } = await axiosInstance.post("/employees", data);
    return newEmployee;
  },

  update: async (id, data) => {
    const { data: updatedEmployee } = await axiosInstance.put(
      `/employees/${id}`,
      data,
    );
    return updatedEmployee;
  },

  delete: async (id) => {
    await axiosInstance.delete(`/employees/${id}`);
  },
};
