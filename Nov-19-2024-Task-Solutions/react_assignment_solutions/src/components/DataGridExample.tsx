import React from 'react';
import { componentHOC, } from './componentHOC';
import { UserList } from './UserList';

const UserListWithGrid = componentHOC(UserList);

class DataGridExample extends React.Component {
  render() {
    return (
      <div style={{ margin: "10px", border: "2px solid purple", padding: "10px" }}>
        <UserListWithGrid 
          url="https://jsonplaceholder.typicode.com/users"
          dataProperties={{
            headers: ['ID', 'Name', 'Email'],
            dataKeys: ['id', 'name', 'email']
          }}
        />
      </div>
    );
  }
}

export default DataGridExample;