import React, { useState } from "react";
import { Employee } from "../models/employeeType";
import "./styles.css";

const initialEmployees: Employee[] = [
  {
    employeeNo: "1234",
    employeeName: "AVINASH",
    job: "MANAGER",
    salary: 3200,
    deptNo: 32,
  },
  {
    employeeNo: "5678",
    employeeName: "KRISHNA",
    job: "CLERK",
    salary: 800,
    deptNo: 20,
  },
  {
    employeeNo: "6345",
    employeeName: "NARSGINGH",
    job: "SALESMAN",
    salary: 1600,
    deptNo: 30,
  },
  {
    employeeNo: "6521",
    employeeName: "AKSHAY",
    job: "ANALYST",
    salary: 1250,
    deptNo: 30,
  },
  {
    employeeNo: "6247",
    employeeName: "RATNA",
    job: "MANAGER",
    salary: 2975,
    deptNo: 20,
  },
  {
    employeeNo: "7654",
    employeeName: "MURALI",
    job: "SALESMAN",
    salary: 1250,
    deptNo: 30,
  },
  {
    employeeNo: "7698",
    employeeName: "KARTIK",
    job: "MANAGER",
    salary: 2850,
    deptNo: 30,
  },
  {
    employeeNo: "7782",
    employeeName: "KAVITA",
    job: "MANAGER",
    salary: 2450,
    deptNo: 10,
  },
];

const initialFormState: Employee = {
  employeeNo: "",
  employeeName: "",
  job: "",
  salary: 0,
  deptNo: 0,
};

const EmployeeTableComp: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [formData, setFormData] = useState<Employee>(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" || name === "deptNo" ? Number(value) : value,
    }));
  };

  const handleGetEmployees = () => {
    setEmployees(initialEmployees);
  };

  const handleAddEmployee = () => {
    if (!formData.employeeName || !formData.job) {
      alert("Please fill in all required fields");
      return;
    }

    setEmployees((prev) => [...prev, formData]);
    handleClearFields();
  };

  const handleUpdateEmployee = () => {
    if (!formData.employeeName || !formData.job) {
      alert("Please fill in all required fields");
      return;
    }

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.employeeNo === formData.employeeNo ? formData : emp
      )
    );
    handleClearFields();
  };

  const handleClearFields = () => {
    setFormData(initialFormState);
    setIsEditing(false);
  };

  const handleSelect = (employee: Employee) => {
    setFormData(employee);
    setIsEditing(true);
  };

  const handleDelete = (employeeNo: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) =>
        prev.filter((emp) => emp.employeeNo !== employeeNo)
      );
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        Perform CRUD operations with remote data in React
      </h1>

      <div className="form-container">
        <div className="form-row">
          <input
            type="text"
            className="input-field"
            placeholder="Employee Name*"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Job*"
            name="job"
            value={formData.job}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <input
            type="number"
            className="input-field"
            placeholder="Department No"
            name="deptNo"
            value={formData.deptNo || ""}
            onChange={handleInputChange}
          />
          <input
            type="number"
            className="input-field"
            placeholder="Salary"
            name="salary"
            value={formData.salary || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="button-container">
          <button className="btn btn-secondary" onClick={handleGetEmployees}>
            Get Employees
          </button>
          <button
            className="btn btn-primary"
            onClick={isEditing ? handleUpdateEmployee : handleAddEmployee}
          >
            {isEditing ? "Update Employee" : "Add Employee"}
          </button>
          <button className="btn btn-danger" onClick={handleClearFields}>
            Clear Fields
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee No</th>
              <th>Employee Name</th>
              <th>Job</th>
              <th>Salary</th>
              <th>Dept No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeNo}>
                <td>{employee.employeeNo}</td>
                <td>{employee.employeeName}</td>
                <td>{employee.job}</td>
                <td>{employee.salary}</td>
                <td>{employee.deptNo}</td>
                <td>
                  <span
                    className="action-link"
                    onClick={() => handleSelect(employee)}
                  >
                    Select
                  </span>
                  <span
                    className="action-link delete"
                    onClick={() => handleDelete(employee.employeeNo)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTableComp;
