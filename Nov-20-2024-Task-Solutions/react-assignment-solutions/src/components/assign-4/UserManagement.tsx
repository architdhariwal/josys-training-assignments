import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
}

const SimpleUserApp = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Add user
  const addUser = () => {
    if (!name.trim()) {
      setError('Name cannot be empty');
      return;
    }
    const newUser: User = {
      id: users.length + 1,
      name,
    };
    setUsers([...users, newUser]);
    setName('');
    setError(null);
  };

  // Delete user
  const deleteUser = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>User Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Enter user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginRight: '8px',
          }}
        />
        <button
          onClick={addUser}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add User
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              padding: '10px',
              marginBottom: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {user.name}
            <button
              onClick={() => deleteUser(user.id)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleUserApp;
