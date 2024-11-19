import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Child from './components/Child';
import StorageDemo from './components/StorageDemo';
import LifecycleDemo from './components/LifecycleDemo';
import DataGridExample from './components/DataGridExample';
import { UserContext } from './context/UserContext';
import { User } from './types';
import './App.css';

interface AppState {
  user: User;
}

class App extends React.Component<{}, AppState> {
  state = {
    user: { id: 1, name: "Scott", email: "scott@gmail.com" },
  };

  render() {
    return (
      <Router>
        <div className="app-container">
          <h2 className="header">Assignment Navigation</h2>
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li>
                <Link to="/context-api" className="nav-link">Context API Example</Link>
              </li>
              <li>
                <Link to="/hoc-grid" className="nav-link">HOC Grid Example</Link>
              </li>
              <li>
                <Link to="/storage-demo" className="nav-link">Storage and User Profile</Link>
              </li>
              <li>
                <Link to="/lifecycle-demo" className="nav-link">Lifecycle Methods Demo</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/context-api"
              element={
                <UserContext.Provider value={this.state.user}>
                  <div style={{ margin: "10px", border: "2px solid red", padding: "10px" }}>
                    <h3>This is App Component (Context API Example)</h3>
                    <Child />
                  </div>
                </UserContext.Provider>
              }
            />
            <Route path="/hoc-grid" element={<DataGridExample />} />
            <Route
              path="/storage-demo"
              element={
                <div>
                  <h2>Storage and User Profile (Functional Components)</h2>
                  <StorageDemo />
                </div>
              }
            />
            <Route path="/lifecycle-demo" element={<LifecycleDemo initialCount={0} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

const Home: React.FC = () => (
  <div className="home">
    <h3>Assignments Portal</h3>
    <p>Click on the assignment names in the navigation bar to view details.</p>
  </div>
);

export default App;
