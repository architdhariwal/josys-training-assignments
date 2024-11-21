import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_JSON_SERVER,
  headers: {
    'Content-Type': 'application/json'
  }
});