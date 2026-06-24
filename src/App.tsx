import Employee from "./features/employees/employees";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-350 p-6 md:p-8">
        <Employee />
      </main>
    </div>
  );
}
