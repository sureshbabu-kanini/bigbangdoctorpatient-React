import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientViewDoctor.css';

export default function PatientViewDoctor() {
  const [doctors, setDoctors] = useState([]);

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

  const convertToImage = (imageData) => {
    const base64Image = `data:image/jpeg;base64,${imageData}`;
    return <img src={base64Image} alt="Doctor" className="docimg" />;
  };

  const bookAppointment = (doctorId) => {
    // Handle the logic to book an appointment for the selected doctor
    console.log(`Booking appointment for doctor with ID: ${doctorId}`);
  };

  return (
    <div>
      <nav className="navbar-nav">
        {/* Navbar code */}
      </nav>
      <center>
        <h2>Our Doctors</h2>
      </center>
      <div className="card-container">
        {doctors.map((doctor) => (
          <div key={doctor.doctor_Id} className="card">
            <h2>{doctor.doctor_Name}</h2>
            <p>Specialization: {doctor.specialization}</p>
            <p>Email: {doctor.doctor_Email}</p>
            <p>Phone number: {doctor.doctor_PhNo}</p>
            <div className="doc-image">
              {doctor.imageData && convertToImage(doctor.imageData)}
            </div>
            <div className="button-container">
              <button
                className="appointment-btn"
                onClick={() => bookAppointment(doctor.doctor_Id)}
              >
                Book an Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
