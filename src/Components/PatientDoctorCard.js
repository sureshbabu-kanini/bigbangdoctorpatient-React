import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatientDoctorCard.css';


export default function PatientDoctorCard() {
  const [patients, setPatients] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [specialization, setSpecialization] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('https://localhost:7114/api/Patient');
      if (!response.data) {
        throw new Error('Failed to fetch patients');
      }
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

  return (
    <div>
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
          <li className="nav-item"></li>
          <li className="nav-item">
            <a className="nav-link" href="#"></a>
          </li>
          <li className="nav-item">
            <div className="dropdown-container">
              <button className="dropdown-btn" onClick={handleDropdownToggle}>
                <i className="fas fa-user"></i>
              </button>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <a href="/login">Logout</a>
                </div>
              )}
            </div>
          </li>

        </ul>
      </nav>
      <center>
        <h1>Patient Details</h1>
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
      <div className="doctor-card-container">
        {doctors.map((doctor) => (
          <div key={doctor.doctor_Id} className="doctor-card">
            <h2>{doctor.doctor_Name}</h2>
            <p>Specialization: {doctor.specialization}</p>
            <p>Phone Number: {doctor.doctor_PhNo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
