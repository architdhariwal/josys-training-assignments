import React from 'react';
import { User } from '../types';


interface UserListProps {
  data: User[];
}

export class UserList extends React.Component<UserListProps> {
  render() {
    const { data } = this.props;
    return (
      <div className="user-details">
        <h4>Additional User Details Component</h4>
        <p>Total Users: {data.length}</p>
      </div>
    );
  }
}