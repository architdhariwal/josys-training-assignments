import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CustomersByCity from './components/CustomersByCity';
import TopPurchasers from './components/TopPurchasers';
import CustomerForm from './components/CustomerForm';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto">
        <header 
          className="
            text-2xl 
            font-bold 
            text-center 
            bg-blue-900 
            text-white 
            py-4
          "
        >
          Customer Management System
        </header>

        <nav 
          className="
            mb-4 
            flex 
            justify-center 
            space-x-4 
            bg-blue-700 
            py-3 
          "
        >
          <NavLink 
            to="/customers" 
            className={({ isActive }) => 
              `px-4 py-2 rounded transition-colors ${
                isActive 
                  ? 'bg-blue-950 text-white'
                  : 'text-blue-100 hover:bg-blue-800'
              }`
            }
          >
            Customers
          </NavLink>
          <NavLink 
            to="/top-purchasers" 
            className={({ isActive }) => 
              `px-4 py-2 rounded transition-colors ${
                isActive 
                  ? 'bg-blue-950 text-white'
                  : 'text-blue-100 hover:bg-blue-800'
              }`
            }
          >
            Top Purchasers
          </NavLink>
          <NavLink 
            to="/add-customer" 
            className={({ isActive }) => 
              `px-4 py-2 rounded transition-colors ${
                isActive 
                  ? 'bg-blue-950 text-white'
                  : 'text-blue-100 hover:bg-blue-800'
              }`
            }
          >
            Add Customer
          </NavLink>
        </nav>

        <Routes>
          <Route path="/customers" element={<CustomersByCity />} />
          <Route path="/top-purchasers" element={<TopPurchasers />} />
          <Route path="/add-customer" element={<CustomerForm />} />
          <Route path="/" element={<CustomersByCity />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;