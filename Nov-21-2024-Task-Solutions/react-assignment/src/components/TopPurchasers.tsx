import React, { useState, useEffect } from 'react';
import { Customer } from '../types/Customer';
import { customerService } from '../services/customerService';

const TopPurchasers: React.FC = () => {
  const [topPurchasers, setTopPurchasers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopPurchasers = async () => {
      try {
        const purchasers = await customerService.getTopPurchasers();
        setTopPurchasers(purchasers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch top purchasers');
        setLoading(false);
      }
    };

    fetchTopPurchasers();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) return <div className="text-center p-4">Loading top purchasers...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {topPurchasers.map(customer => (
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
          <div className="text-center">
            <p className="text-green-600 font-semibold text-lg">
              Total Purchases: {formatCurrency(customer.totalPurchasesPerYear)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopPurchasers;