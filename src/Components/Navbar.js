import React, { useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';



const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const adminName = location.state?.adminName || ''; // Access the adminName from location state


  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
        <li className="nav-item">
          <Link to="/Doctor" className="nav-link">
            Doctor
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/active" className="nav-link">
            Admit Requests
          </Link>
        </li>
        <li className="nav-item">
          <div className="dropdown-container">
            <button className="dropdown-btn" onClick={handleDropdownToggle}>
              <i className="fas fa-user"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg></i>
              <Navbar adminName={adminName} /> {/* Pass the adminName as a prop */}
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
