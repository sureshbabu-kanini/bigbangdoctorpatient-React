import React, { useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const adminName = location.state?.adminName || '';

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Define the array of route items
  const routes = [
    { path: '/Doctor', label: 'Doctor' },
    { path: '/active', label: 'Admit Requests' },
    { path: '/Admin', label: 'Logout' },
  ];

  return (
    <nav className="navbar-nav">
      <div className="loader">
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
      </div>
      <h1>Hospital Management</h1>
      <ul>
        {routes.map((route, index) => (
          <li className="nav-item" key={index}>
            <Link to={route.path} className="nav-link">
              {route.label}
            </Link>
          </li>
        ))}
        <li className="nav-item">
          <div className="dropdown-container">
            <button className="dropdown-btn" onClick={handleDropdownToggle}>
              <i className="fas fa-user">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
              </i>
              <Navbar adminName={adminName} />
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link to="/Admin" className="nav-link">
                  Logout
                </Link>
              </div>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
