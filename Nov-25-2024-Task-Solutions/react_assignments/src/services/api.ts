import axios from 'axios';
import { Employee } from '../components/assign1/types';


const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export const api = {
  employees: {
    getAll: async (): Promise<Employee[]> => {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      return response.data;
    },
    getById: async (id: number): Promise<Employee> => {
      const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
      return response.data;
    },
    add: async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
      const response = await axios.post(`${API_BASE_URL}/employees`, employee);
      return response.data;
    },
    update: async (employee: Employee): Promise<Employee> => {
      const response = await axios.put(`${API_BASE_URL}/employees/${employee.id}`, employee);
      return response.data;
    },
    delete: async (id: number): Promise<void> => {
      await axios.delete(`${API_BASE_URL}/employees/${id}`);
    },
  },
};