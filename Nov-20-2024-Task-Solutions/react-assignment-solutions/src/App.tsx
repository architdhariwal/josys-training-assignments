import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './components/assign-1/AuthProvider';
import UserProfile from './components/assign-1/UserProfile';
import './App.css';
import BankApp from './components/assign-2/BankApp';
import SimpleUserApp from './components/assign-4/UserManagement';
import PostList from './components/assign-3/PostList';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app-container">
          <h2 className="header">Assignment Navigation</h2>
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li>
                <Link to="/context-api" className="nav-link">useContext</Link>
              </li>
              <li>
                <Link to="/bank-app" className="nav-link">Bank App</Link>
              </li>
              <li>
                <Link to="/react-query" className="nav-link">React Query</Link>
              </li>
              <li>
                <Link to="/json-server" className="nav-link">JSON server</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/context-api"
              element={
                <AuthProvider>
                  <UserProfile />
                </AuthProvider> 
              }
            />
            <Route path="/bank-app" element={<BankApp />} />
            <Route path="/react-query" element={<PostList />} />
            <Route path="/json-server" element={<SimpleUserApp />} />
          </Routes>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </Router>
    </QueryClientProvider>
  )
}

const Home: React.FC = () => (
  <div className="home">
    <h3>Assignments Portal</h3>
    <p>Click on the assignment names in the navigation bar to view details.</p>
  </div>
);

export default App