import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorViewPatient.css';

export default function DoctorViewPatient() {
  const [patients, setPatients] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [specialization, setSpecialization] = useState('');
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  const navigate = useNavigate();

  const fetchDoctorDetails = async () => {
    try {
      const doctorName = localStorage.getItem('username');
      const response = await axios.get(
        `https://localhost:7114/api/Doctor/ByDoctorName?doctorName=${doctorName}`
      );
      if (!response.data) {
        throw new Error('Failed to fetch doctor details');
      }
      setDoctor(response.data[0]); // Assuming only one doctor is returned
      setPatients(response.data[0].patients);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7114/api/Patient/search?query=${specialization}`
      );
      if (!response.data) {
        throw new Error('Failed to fetch patients');
      }
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); // Assuming you store the username in local storage
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar-nav">
        <div className="loader">
          {/* Loader code */}
        </div>
        <h1>Hospital Management</h1>
        <ul>
          <li className="nav-item">
            <div className="search-container">
              <input
                type="text"
                placeholder="Enter specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="search-input"
              />
              <button className="search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </li>
          <li>
            {doctor && <span>Hi, {doctor.doctor_Name}</span>}
          </li>
          <li>
            <div className="dropdown" style={{ marginLeft: '20px' }}>
              <button
                className="btn btn-link dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                onClick={handleLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg> Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
      <center>
        <h1>My Patients</h1>
      </center>
      <div className="patient-card-container">
        {patients.map((patient) => (
          <div key={patient.patient_Id} className="patient-card">
            <h2>{patient.patient_Name}</h2>
            <p>Disease: {patient.disease}</p>
            <p>Phone Number: {patient.patient_PhNo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
