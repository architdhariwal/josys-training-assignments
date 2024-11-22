import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import { RoleBasedRoute } from "./components/RoleBasedRoute";

const About = React.lazy(() => import("./components/About"));
const Contact = React.lazy(() => import("./components/Contact"));
const Emps = React.lazy(() => import("./components/Emps"));
const Depts = React.lazy(() => import("./components/Depts"));
const Login = React.lazy(() => import("./components/Login"));
const Details = React.lazy(() => import("./components/Details"));
const NotFound = React.lazy(() => import("./components/NotFound"));

const Admin = React.lazy(() => import("./components/admin/Admin"));
const AdminHome = React.lazy(() => import("./components/admin/AdminHome"));
const Projects = React.lazy(() => import("./components/admin/Projects"));
const Customers = React.lazy(() => import("./components/admin/Customers"));

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link to={to} className="text-blue-600 hover:text-blue-800 px-2 py-1">
    {children}
  </Link>
);

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();

  const hasRole = (role: string) => {
    return user?.roles.includes(role as "ADMIN" | "USER");
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-3xl font-bold text-center mb-6">
          Routing implementation in React JS
        </h3>

        <nav className="flex justify-center space-x-1 mb-6">
          {/* Always visible */}
          <NavLink to="/">Home</NavLink>
          <span className="px-2">|</span>
          <NavLink to="/contact">Contact Us</NavLink>
          <span className="px-2">|</span>
          <NavLink to="/about">About Us</NavLink>

          {user && (
            <>
              <span className="px-2">|</span>
              <NavLink to="/department">Department</NavLink>
            </>
          )}

          {hasRole("ADMIN") && (
            <>
              <span className="px-2">|</span>
              <NavLink to="/employees">Employees</NavLink>
              <span className="px-2">|</span>
              <NavLink to="/admin">Admin</NavLink>
            </>
          )}

          <span className="px-2">|</span>
          {!user ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="text-blue-600 hover:text-blue-800 px-2 py-1"
            >
              Logout
            </button>
          )}
        </nav>

        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/employees"
              element={
                <RoleBasedRoute allowedRoles={["ADMIN"]} returnUrl="/employees">
                  <Emps />
                </RoleBasedRoute>
              }
            />

            <Route
              path="/department"
              element={
                <RoleBasedRoute allowedRoles={["USER","ADMIN"]} returnUrl="/department">
                  <Depts />
                </RoleBasedRoute>
              }
            />

            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details/:id" element={<Details />} />

            <Route
              path="/admin"
              element={
                <RoleBasedRoute allowedRoles={["ADMIN"]} returnUrl="/admin">
                  <Admin />
                </RoleBasedRoute>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="home" element={<AdminHome />} />
              <Route path="projects" element={<Projects />} />
              <Route path="customers" element={<Customers />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
