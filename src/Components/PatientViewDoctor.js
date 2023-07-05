import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientViewDoctor.css';

export default function PatientViewDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

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
    const appointmentDate = prompt('Enter the appointment date (YYYY-MM-DD):');
    if (appointmentDate) {
      const appointment = {
        patientId: 'YOUR_PATIENT_ID', // Replace with the actual patient ID
        doctorId: doctorId,
        appointmentDate: appointmentDate
      };
      axios
        .post('https://localhost:7114/api/Appointments', appointment)
        .then((response) => {
          console.log('Appointment booked:', response.data);
          alert('Appointment booked successfully!');
        })
        .catch((error) => {
          console.error('Error booking appointment:', error);
          alert('Failed to book appointment. Please try again.');
        });
    } else {
      alert('Appointment date is required. Please try again.');
    }
  };

  const toggleButton = (doctorId) => {
    setActiveCard(doctorId === activeCard ? null : doctorId);
  };

  return (
    <div>
      <nav className="navbar-nav">{/* Navbar code */}</nav>
      <center>
        <h2>Our Doctors</h2>
      </center>
      <div className="card-container">
        {doctors.map((doctor) => (
          <div
            key={doctor.doctor_Id}
            className={`card ${doctor.doctor_Id === activeCard ? 'active' : ''}`}
            onClick={() => toggleButton(doctor.doctor_Id)}
          >
            <center>
              <h2>{doctor.doctor_Name}</h2>
              <p>Specialization: {doctor.specialization}</p>
              <p>Email: {doctor.doctor_Email}</p>
              <p>Phone number: {doctor.doctor_PhNo}</p>
              <div className="doc-image">
                {doctor.imageData && convertToImage(doctor.imageData)}
              </div>
            </center>
            <br />
            {doctor.doctor_Id === activeCard && (
              <div className="button-container">
                {/* <button
                  className="appointment-btn"
                  onClick={() => bookAppointment(doctor.doctor_Id)}
                >
                  Book an Appointment
                </button> */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}