import React, { useState } from 'react';
import './DoctorRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DoctorRegister() {
  const navigate = useNavigate();

  const [doctor_Name, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [doctor_Email, setDoctorEmail] = useState('');
  const [doctor_PhNo, setDoctorPhNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!doctor_Name || !specialization || !doctor_Email || !doctor_PhNo || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Create form data object
    const formData = new FormData();
    formData.append('doctor_Name', doctor_Name); // Use the correct property name
    formData.append('specialization', specialization);
    formData.append('doctor_Email', doctor_Email); // Use the correct property name
    formData.append('doctor_PhNo', doctor_PhNo); // Use the correct property name
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('imageFile', selectedFile);

    // Send POST request to API URL
    axios
      .post('https://localhost:7114/api/Doctor', formData)
      .then((response) => {
        console.log('Successfully registered:', response.data);
        toast.success('Registered successfully!');
      })
      .catch((error) => {
        console.error('Error registering:', error);
        // Perform any necessary actions for error handling
      });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <div className="container">
        <div className="registration-form">
          <header>Doctor Signup</header>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <input
              type="text"
              placeholder="Doctor Name"
              value={doctor_Name}
              onChange={(e) => setDoctorName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
            <input
              type="email"
              placeholder="Doctor Email"
              value={doctor_Email}
              onChange={(e) => setDoctorEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={doctor_PhNo}
              onChange={(e) => setDoctorPhNo(e.target.value)}
            />
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input type="file" onChange={handleFileChange} accept="image/*" />
            {error && <p className="error-message">{error}</p>}
            {/* Submit button */}
            <input type="submit" className="button" value="Signup" />
          </form>
          <div className="signup">
            <span className="signup-text">
              Already have an account?{' '}
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
