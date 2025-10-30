import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💪 Gym Tracker
        </Link>

        {isAuthenticated ? (
          <div className="navbar-menu">
            <Link
              to="/dashboard"
              className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link
              to="/add-workout"
              className={`navbar-link ${location.pathname === '/add-workout' ? 'active' : ''}`}
            >
              Add Workout
            </Link>
            <div className="navbar-user">
              <span className="user-name">{user?.name}</span>
              <button onClick={handleLogout} className="btn btn-logout">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar-menu">
            <Link
              to="/login"
              className={`navbar-link ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`navbar-link ${location.pathname === '/register' ? 'active' : ''}`}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
