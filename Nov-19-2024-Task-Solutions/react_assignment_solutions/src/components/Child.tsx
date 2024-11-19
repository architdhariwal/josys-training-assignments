import React from 'react';
import GrandChild from './GrandChild';


class Child extends React.Component {
  render() {
    return (
      <div style={{ margin: "10px", border: "2px solid Green", padding: "10px" }}>
        <h3>This is Child Component</h3>
        <hr />
        <GrandChild />
      </div>
    );
  }
}

export default Child;