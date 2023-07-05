import React, { useState } from 'react';
import './AdminLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const api_url = "https://localhost:7114/api/Token/Admin";
  const navigate = useNavigate();

  const [admin_Name, setAdminName] = useState('');
  const [admin_Password, setAdminPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!admin_Name || !admin_Password) {
      toast.error('Please fill in all fields.');
      return;
    }

    // Create a payload object with the user input
    const payload = {
      admin_Name,
      admin_Password
    };

    try {
      const response = await axios.post(api_url, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('New item added:', response.data);
      // Perform any necessary actions after successful POST request
      toast.success('Login successful!');
      navigate('/request', { state: { adminName: admin_Name } });
    } catch (error) {
      console.error('Error adding new item:', error);
      // Perform any necessary actions for error handling
      toast.error('Invalid credentials.');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="form-login">
          <header>Admin Login</header>
          <form>
            <input
              type="text"
              value={admin_Name}
              onChange={(e) => setAdminName(e.target.value)}
              required
              placeholder="Enter your Name"
            />
            <input
              type="password"
              value={admin_Password}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <a href="#">Forgot password?</a>
            <input
              type="submit"
              className="button"
              onClick={handleFormSubmit}
              value="Login"
            />
          </form>
        </div>
        <div className="form registration">
          {/* Add your registration form here */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
