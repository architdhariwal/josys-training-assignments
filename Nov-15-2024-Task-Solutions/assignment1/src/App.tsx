import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await axios.get('https://reqres.in/api/users/');
      console.log("result------>",result)
      setUsers(result.data.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error("User data not found", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <button 
        onClick={fetchUsers}
        disabled={loading}
        className="fetch-button"
      >
        {loading ? 'Loading...' : 'Get Users'}
      </button>

      {error && <div className="error">{error}</div>}

      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img 
              src={user.avatar} 
              alt={`${user.first_name}`}
              className="user-avatar"
            />
            <h4 className="user-name">
              {user.first_name} {user.last_name}
            </h4>
            <p className="user-email">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;