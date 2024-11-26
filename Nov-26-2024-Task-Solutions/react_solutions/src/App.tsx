import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductDetails from './components/assign1/ProductDetails';
import Login from './components/assign2&3/Login';

function App() {
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
                to="/productdetails"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Product Details
              </Link>
              <Link
                to="/login"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <Routes>
          <Route path="/" element={<ProductDetails />} />
          <Route path="/productdetails" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
