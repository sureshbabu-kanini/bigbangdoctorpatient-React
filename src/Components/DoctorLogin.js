import React, { useState } from 'react';
import './DoctorLogin.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorLogin = () => {
  const api_url = "https://localhost:7114/api/Token";
  const navigate = useNavigate();

  const [doctor_Name, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ doctor_Name: '', password: '' });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ doctor_Name: '', password: '' });

    // Validate form inputs
    let hasErrors = false;
    const newErrors = { doctor_Name: '', password: '' };

    if (!doctor_Name) {
      newErrors.doctor_Name = 'Please enter a username.';
      hasErrors = true;
    }

    if (!password) {
      newErrors.password = 'Please enter a password.';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Create a payload object with the user input
    const payload = {
      doctor_Name,
      password
    };

    try {
      const response = await axios.post(api_url, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('New item added:', response.data);
      toast.success('Login successful!'); // Display success toast
      
      // Store username in local storage
      localStorage.setItem('username', doctor_Name);
      
      // Perform any necessary actions after successful POST request
      navigate('/DoctorView'); // Redirect to PatientDoctorCard on successful login
    } catch (error) {
      console.error('Error adding new item:', error);
      toast.error('Login failed!'); // Display error toast
      // Perform any necessary actions for error handling
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <div className="login-form-container" style={{ marginTop: '200px' }}>
          <div className="form login">
            <header>Doctor Login</header>
            <form>
              <input
                type="text"
                value={doctor_Name}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
                placeholder="Username"
              />
              {errors.doctor_Name && <div className="error">{errors.doctor_Name}</div>} {/* Display error message */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
              {errors.password && <div className="error">{errors.password}</div>} {/* Display error message */}
              <a href="#">Forgot password?</a>
              <input
                type="submit"
                className="button"
                onClick={handleFormSubmit}
                value="Login"
              />
            </form>
            <div className="signup">
              <span className="signup">Don't have an account?</span> <Link to="/DoctorRegister" className="nav-link">
                Register
              </Link>
            </div>
          </div>
          <div className="form registration">
            {/* Add your registration form here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorLogin;
