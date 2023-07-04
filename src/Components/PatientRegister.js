import React, { useState, useEffect } from 'react';
import './PatientRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PatientRegister() {
  const [patientName, setPatientName] = useState('');
  const [disease, setDisease] = useState('');
  const [patientPhNo, setPatientPhNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Create a navigate function

  useEffect(() => {
    // Fetch the list of approved doctors
    axios
      .get('https://localhost:7114/api/Doctor/ApprovedDoctors')
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!patientName || !disease || !patientPhNo || !password || !confirmPassword || !selectedDoctor) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Find the selected doctor
    const selectedDoctorObj = doctors.find((doctor) => doctor.doctor_Name === selectedDoctor);

    if (!selectedDoctorObj) {
      setError('Invalid doctor selection');
      return;
    }

    // Create the payload object
    const payload = {
      patient_Name: patientName,
      disease: disease,
      patient_PhNo: patientPhNo,
      password: password,
      Doctor: {
        doctor_Id: selectedDoctorObj.doctor_Id,
      },
    };

    // Send POST request to API URL
    axios
      .post('https://localhost:7114/api/Patient', payload)
      .then((response) => {
        console.log('Successfully registered:', response.data);
        toast.success('Registered successfully!');
        // Navigate to the patient login page
        navigate('/patientlogin');
      })
      .catch((error) => {
        console.error('Error registering:', error);
        toast.error('Registration failed');
        // Perform any necessary actions for error handling
      });
  };

  return (
    <center>
      <div className="registration-form">
        <header className="form-header">Patient Signup</header>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <input
            type="text"
            className="form-input"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          />
          <input
            type="tel"
            className="form-input"
            placeholder="Phone Number"
            value={patientPhNo}
            onChange={(e) => setPatientPhNo(e.target.value)}
          />
          <input
            type="password"
            className="form-input"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="form-input"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <select
            className="form-input"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">Select a Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctor_Id} value={doctor.doctor_Name}>
                {doctor.doctor_Name} - {doctor.specialization}
              </option>
            ))}
          </select>
          {error && <p className="error-message">{error}</p>}
          {/* Submit button */}
          <button type="submit" className="form-button">
            Signup
          </button>
        </form>
        <div className="signup">
          <span className="signup-text">
            Already have an account?{' '}
            <Link to="/patientlogin" className="nav-link">
              Login
            </Link>
          </span>
        </div>
      </div>
    </center>
  );
}
