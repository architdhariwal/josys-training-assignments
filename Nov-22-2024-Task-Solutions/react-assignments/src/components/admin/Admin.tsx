import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Admin: React.FC = () => {
  return (
    <div className="border-2 border-blue-500 p-6 bg-yellow-50">
      <h2 className="text-2xl font-bold mb-4">This is Admin Component</h2>
      
      <nav className="mb-6">
        <Link to="/admin/home" className="text-blue-600 hover:text-blue-800 mr-4">AdminHome</Link> |
        <Link to="/admin/projects" className="text-blue-600 hover:text-blue-800 mx-4">Projects</Link> |
        <Link to="/admin/customers" className="text-blue-600 hover:text-blue-800 ml-4">Customers</Link>
      </nav>

      <div className="bg-pink-200 p-6 rounded">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;