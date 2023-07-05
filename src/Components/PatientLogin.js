import React, { useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientLogin = () => {
  const api_url = "https://localhost:7114/api/Token/Patient";
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      patient_Name: patientName,
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
      
      // Store patient name in local storage
      localStorage.setItem('patientName', patientName);
      
      // Perform any necessary actions after successful POST request
      navigate('/PatientView'); // Redirect to PatientView on successful login
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
        <div className="form-container" style={{ marginTop: '200px' }}>
          <div className="form login">
            <header>Patient Login</header>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                placeholder="Username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
              <a href="#">Forgot password?</a>
              <input
                type="submit"
                className="button"
                value="Login"
              />
            </form>
            <div className="signup">
              <span className="signup" >Don't have an account? <Link to="/patientregister" className="nav-link">
                Register
              </Link></span>
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

export default PatientLogin;
