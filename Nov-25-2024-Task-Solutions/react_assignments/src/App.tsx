import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { EmpList } from "./components/assign1/EmpList";
import { EmpOperations } from "./components/assign1/EmpOperations";
import { VehicleRegistrationForm } from "./components/assign2/VehicleRegistrationForm";
import { UserSearchContainer } from "./components/assign3/UserSearchContainer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link
                to="/"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                to="/users"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Users
              </Link>
              <Link
                to="/employees"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Employees
              </Link>
              <Link
                to="/employees/add"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Add Employee
              </Link>
              <Link
                to="/vehicles/register"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Vehicle Registration
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserSearchContainer />} />
          <Route path="/employees" element={<EmpList />} />
          <Route path="/employees/add" element={<EmpOperations />} />
          <Route
            path="/vehicles/register"
            element={<VehicleRegistrationForm />}
          />
        </Routes>
      </main>
    </div>
  );
};

const Home: React.FC = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">
      React App For Assignment
    </h1>
    <p className="text-xl text-gray-600">React Assignment Topics</p>
    <ul className="mt-4 space-y-2 text-lg text-gray-700">
      <li>Class Components with Lifecycle Methods</li>
      <li>React Query for API State Management</li>
      <li>Form Handling with React Hook Form</li>
    </ul>
  </div>
);

export default App;
