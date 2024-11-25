import React, { useState } from "react";
import { useEmployees } from "./hooks/useEmployee";
import { Employee } from "./types";

export const EmpList: React.FC = () => {
  const {
    employees,
    isLoading,
    error,
    updateEmployee,
    deleteEmployee,
    isUpdatingEmployee,
    isDeletingEmployee,
  } = useEmployees();

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded">
        Error loading employees: {error.message}
      </div>
    );
  }

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdate = () => {
    if (editingEmployee) {
      updateEmployee(editingEmployee);
      setEditingEmployee(null);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingEmployee?.id === employee.id ? (
                    <input
                      type="text"
                      value={editingEmployee.name}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          name: e.target.value,
                        })
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    employee.name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingEmployee?.id === employee.id ? (
                    <input
                      type="email"
                      value={editingEmployee.email}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          email: e.target.value,
                        })
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    employee.email
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingEmployee?.id === employee.id ? (
                    <input
                      type="text"
                      value={editingEmployee.department}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          department: e.target.value,
                        })
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    employee.department
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {editingEmployee?.id === employee.id ? (
                    <button
                      onClick={handleUpdate}
                      disabled={isUpdatingEmployee}
                      className="text-green-600 hover:text-green-900 mr-4"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(employee)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(employee.id)}
                    disabled={isDeletingEmployee}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
