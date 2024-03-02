// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchData();
  }, [searchTerm, sortBy]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/customers?search=${searchTerm}&sortBy=${sortBy}`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search by name or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort by</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.sno}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{customer.created_at.split(' ')[0]}</td>
              <td>{customer.created_at.split(' ')[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
