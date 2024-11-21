import { Customer } from '../types/Customer';
import axios from 'axios';

const API_URL = process.env.REACT_APP_JSON_SERVER;

export const customerService = {
  getAllCustomers: async () => {
    const response = await axios.get<Customer[]>(`${API_URL}/customers`);
    return response.data;
  },

  getCustomerById: async (id: number) => {
    const response = await axios.get<Customer>(`${API_URL}/customers/${id}`);
    return response.data;
  },

  createCustomer: async (customer: Customer) => {
    const response = await axios.post<Customer>(`${API_URL}/customers`, customer);
    return response.data;
  },

  updateCustomer: async (customer: Customer) => {
    const response = await axios.put<Customer>(`${API_URL}/customers/${customer.id}`, customer);
    return response.data;
  },

  deleteCustomer: async (id: number) => {
    await axios.delete(`${API_URL}/customers/${id}`);
  },

  getTopPurchasers: async () => {
    const response = await axios.get<Customer[]>(
      `${API_URL}/customers?_sort=totalPurchasesPerYear&_order=desc&_limit=5`
    );
    return response.data;
  },

  getCustomersByCity: async (city: string) => {
    const response = await axios.get<Customer[]>(`${API_URL}/customers?city=${city}`);
    return response.data.sort((a, b) => a.name.localeCompare(b.name));
  },

  getAllCities: async () => {
    const response = await axios.get<Customer[]>(`${API_URL}/customers`);
    return ['All', ...Array.from(new Set(response.data.map(c => c.city)))];
  }
};