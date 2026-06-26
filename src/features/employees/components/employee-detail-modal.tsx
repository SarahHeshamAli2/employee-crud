// components/employee-detail-modal.tsx

import Button from "../../../shared/ui/button";
import Modal from "../../../shared/ui/modal";
import type { Employee } from "../types/employee.types";

interface EmployeeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onEdit?: (employee: Employee) => void;
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-semibold text-indigo-700">
      {initials}
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm text-gray-800">{value ?? "—"}</p>
    </div>
  );
}

export default function EmployeeDetailModal({
  isOpen,
  onClose,
  employee,
  onEdit,
}: EmployeeDetailModalProps) {
  if (!employee) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Employee Details">
      {/* Header — avatar + name + role */}
      <div className="flex items-center gap-4 pb-5">
        <Avatar name={employee.name} />
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {employee.name}
          </h3>
          {employee.department && (
            <span className="mt-1 inline-block rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
              {employee.department}
            </span>
          )}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Detail grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 pt-5">
        <Field
          label="Date of creation"
          value={new Date(employee.createdDate).toLocaleDateString()}
        />
        <Field
          label="Salary"
          value={
            employee.salary != null
              ? `EGP ${Number(employee.salary).toLocaleString()}`
              : null
          }
        />
        <Field label="department" value={String(employee.department)} />

        <Field label="Employee ID" value={String(employee.id)} />
      </div>

      {/* Footer action */}
      {onEdit && (
        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => {
              onEdit(employee);
            }}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Edit Employee
          </Button>
        </div>
      )}
    </Modal>
  );
}
