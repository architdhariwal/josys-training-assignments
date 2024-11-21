import React, { useState, useEffect } from 'react';
import { Customer } from '../types/Customer';
import { customerService } from '../services/customerService';
import { validateCustomer } from '../utils/validation';

interface CustomerFormProps {
  customerToEdit?: Customer;
  onCustomerSaved?: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customerToEdit, onCustomerSaved }) => {
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    city: '',
    contactNumber: '',
    year: new Date().getFullYear(),
    photo: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
    totalPurchasesPerYear: 0
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (customerToEdit) {
      setCustomer(customerToEdit);
      setIsEditing(true);
    }
  }, [customerToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCustomer(customer);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isEditing && customer.id) {
        await customerService.updateCustomer(customer);
        alert('Customer updated successfully!');
      } else {
        await customerService.createCustomer(customer);
        alert('Customer added successfully!');
      }
      
      setCustomer({
        name: '',
        city: '',
        contactNumber: '',
        year: new Date().getFullYear(),
        photo: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
        totalPurchasesPerYear: 0
      });
      setIsEditing(false);
      setErrors([]);
      
      onCustomerSaved && onCustomerSaved();
    } catch (error) {
      alert('Error saving customer');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-auto"
    >
      <h2 className="text-2xl mb-6 font-bold text-center">
        {isEditing ? 'Edit Customer' : 'Add Customer'}
      </h2>
      
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
          {errors.map((error, index) => (
            <div key={index} className="mb-1">{error}</div>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={customer.name}
          onChange={(e) => setCustomer({...customer, name: e.target.value})}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="text"
          placeholder="City"
          value={customer.city}
          onChange={(e) => setCustomer({...customer, city: e.target.value})}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="tel"
          placeholder="Contact Number (10 digits)"
          value={customer.contactNumber}
          onChange={(e) => setCustomer({...customer, contactNumber: e.target.value})}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        
          <input
            type="number"
            placeholder="Total Purchases"
            value={customer.totalPurchasesPerYear}
            onChange={(e) => setCustomer({...customer, totalPurchasesPerYear: Number(e.target.value)})}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="text"
            placeholder="Photo URL"
            value={customer.photo}
            onChange={(e) => setCustomer({...customer, photo: e.target.value})}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mt-6">
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
          >
            {isEditing ? 'Update Customer' : 'Add Customer'}
          </button>
        </div>
      </form>
    );
  };
  
  export default CustomerForm;