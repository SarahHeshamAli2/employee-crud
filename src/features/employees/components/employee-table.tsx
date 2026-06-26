import EmployeeTableSkeleton from "../../../shared/skeletons/employee-table-skeleton";
import Button from "../../../shared/ui/button";
import { formatSalary } from "../../../shared/utils/format-salary";
import type { Employee } from "../types/employee.types";

interface EmployeeTableProps {
  employees: Employee[];
  isLoading?: boolean;
  skeletonRows?: number;
  onEdit?: (employee: Employee) => void;
  onDelete?: (employee: Employee) => void;
  onView?: (employee: Employee) => void;
  emptyMessage?: string;
}

export default function EmployeeTable({
  employees,
  isLoading,
  onEdit,
  onDelete,
  onView,
  emptyMessage = "No employees found.",
}: EmployeeTableProps) {
  const hasActions = Boolean(onEdit || onDelete);

  return (
    <div className="w-full overflow-x-auto max-h-200 rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
              Employee Name
            </th>
            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
              Age
            </th>
            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
              Department
            </th>
            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
              Salary
            </th>
            {hasActions && (
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            <EmployeeTableSkeleton />
          ) : employees.length === 0 ? (
            <tr>
              <td
                colSpan={hasActions ? 5 : 4}
                className="px-6 py-8 text-center text-sm text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {employee.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {employee.age}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {employee.department}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatSalary(employee.salary)}
                </td>
                {hasActions && (
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {onView && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onView(employee)}>
                          View
                        </Button>
                      )}
                      {onEdit && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(employee)}>
                          Edit
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(employee)}>
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
