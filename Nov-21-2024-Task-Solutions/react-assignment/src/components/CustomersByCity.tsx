import React, { useState, useEffect } from 'react';
import { Customer } from '../types/Customer';
import { customerService } from '../services/customerService';
import CustomerForm from './CustomerForm';

const CustomersByCity: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCities = await customerService.getAllCities();
        setCities(fetchedCities);
        
        const fetchedCustomers = await customerService.getAllCustomers();
        setCustomers(fetchedCustomers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch customers');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = async (city: string) => {
    setSelectedCity(city);
    setLoading(true);
    try {
      const fetchedCustomers = city === 'All' 
        ? await customerService.getAllCustomers()
        : await customerService.getCustomersByCity(city);
      setCustomers(fetchedCustomers);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch customers for selected city');
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await customerService.deleteCustomer(id);
        setCustomers(customers.filter(c => c.id !== id));
        alert('Customer deleted successfully');
      } catch (error) {
        alert('Failed to delete customer');
      }
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
  };

  const handleCustomerSaved = async () => {
    try {
      const fetchedCustomers = selectedCity === 'All' 
        ? await customerService.getAllCustomers()
        : await customerService.getCustomersByCity(selectedCity);
      setCustomers(fetchedCustomers);
      setEditingCustomer(undefined);
    } catch (err) {
      alert('Failed to refresh customer list');
    }
  };

  if (loading) return <div className="text-center p-4">Loading customers...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4">
        <select 
          value={selectedCity} 
          onChange={(e) => handleCityChange(e.target.value)} 
          className="w-full p-2 border rounded"
        >
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {customers.map(customer => (
          <div 
            key={customer.id} 
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <img 
                src={customer.photo} 
                alt={customer.name} 
                className="w-20 h-20 rounded-full mr-4 object-cover"
              />
              <div>
                <h3 className="text-xl font-bold">{customer.name}</h3>
                <p className="text-gray-600">{customer.city}</p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button 
                onClick={() => handleEdit(customer)} 
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button 
                onClick={() => customer.id && handleDelete(customer.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <CustomerForm 
            customerToEdit={editingCustomer}
            onCustomerSaved={handleCustomerSaved}
          />
        </div>
      )}
    </div>
  );
};

export default CustomersByCity;