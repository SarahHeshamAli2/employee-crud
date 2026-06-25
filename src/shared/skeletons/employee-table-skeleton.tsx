interface EmployeeTableSkeletonProps {
  rows?: number;
  hasActions?: boolean;
}

export default function EmployeeTableSkeleton({
  rows = 5,
  hasActions = false,
}: EmployeeTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={`skeleton-${index}`}>
          <td className="px-6 py-4">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </td>
          {hasActions && (
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-14 animate-pulse rounded bg-gray-200" />
                <div className="h-8 w-14 animate-pulse rounded bg-gray-200" />
              </div>
            </td>
          )}
        </tr>
      ))}
    </>
  );
}