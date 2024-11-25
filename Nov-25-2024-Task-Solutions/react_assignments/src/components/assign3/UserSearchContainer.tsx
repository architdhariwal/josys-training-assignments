import React, { useState } from 'react';
import { UserList } from './UserList';

export const UserSearchContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
        className="px-4 py-2 border rounded-md"
      />
      
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {isVisible ? 'Unmount' : 'Mount'} Users
      </button>

      {isVisible && <UserList searchTerm={searchTerm} />}
    </div>
  );
};