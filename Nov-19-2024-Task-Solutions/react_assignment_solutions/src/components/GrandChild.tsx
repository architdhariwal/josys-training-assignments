import React from 'react';
import { UserContext } from '../context/UserContext';
import { User } from '../types';

class GrandChild extends React.Component {
  render() {
    return (
      <div style={{ margin: "10px", border: "2px solid Blue", padding: "10px" }}>
        <h3>This is Grand Child Component</h3>
        <hr />
        <UserContext.Consumer>
          {(contextData: User | null) => (
            <div>
              <h3>User Details:</h3>
              <p>
                User Id: {contextData?.id} <br />
                User Name: {contextData?.name} <br />
                User Email: {contextData?.email}
              </p>
            </div>
          )}
        </UserContext.Consumer>
      </div>
    );
  }
}

export default GrandChild;
