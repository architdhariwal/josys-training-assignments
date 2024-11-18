import React, { useState, useEffect } from "react";
import FadingEffectComponent from "./FadingEffectComponent";
import "../TableStyles.css"; 
import { ApiResponse, CustomerStruc } from "../types/customerTypes";

const CustomerTable: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerStruc[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("https://www.w3schools.com/angular/customers.php");
      const data: ApiResponse = await response.json(); 
      console.log("data------->",data);
      setCustomers(data.records);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch customers");
      setLoading(false);
    }
  };

  const countries = Array.from(
    new Set(customers.map((customer) => customer.Country))
  );

  const filteredCustomers = selectedCountry
    ? customers.filter((customer) => customer.Country === selectedCountry)
    : customers;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <FadingEffectComponent>
        <h1 style={{ textAlign: "center", color: "blue" }}>Customer List</h1>
      </FadingEffectComponent>

      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">All Countries</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.Name}</td>
              <td>{customer.City}</td>
              <td>{customer.Country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
