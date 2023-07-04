import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListOfCards.css';
import Navbar from './Navbar';

export default function ListOfcard() {
  const [doctorRequests, setDoctorRequests] = useState([]);

  useEffect(() => {
    fetchDoctorRequests();
  }, []);

  const fetchDoctorRequests = () => {
    fetch('https://localhost:7114/api/Admins/DoctorRequests')
      .then(response => response.json())
      .then(data => {
        setDoctorRequests(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleApproveDoctor = (id) => {
    axios.post(`https://localhost:7114/api/Admins/ApproveDoctorRequest/${id}`)
      .then((response) => {
        if (response.status === 200) {
          // Refresh the doctor data after successful approval
          fetchDoctorRequests();
        }
      })
      .catch((error) => {
        console.error('Error approving doctor:', error);
      });
  };

  const renderDoctorRequests = () => {
    if (doctorRequests.length === 0) {
      return <div className="no-requests">No requests at the moment</div>;
    }

    return doctorRequests.map(doctor => (
      <div className="doctor-card" key={doctor.doctor_Id}>
        <img className="doctor-card__img" src={`data:image/jpeg;base64,${doctor.imageData}`} alt={doctor.Name} />
        <div className="doctor-card__content">
          <h2>{doctor.Name}</h2>
          <p>Specialty: {doctor.Specialty}</p>
          <p>Doctor Name: {doctor.doctor_Name}</p>
          <p>Email: {doctor.doctor_Email}</p>
          <p>Phone: {doctor.contact_No}</p>
          <p>Password: {doctor.password}</p>
          <p>Status: {doctor.status}</p>
        </div>
        <button className="doctor-card__button" onClick={() => handleApproveDoctor(doctor.doctor_Id)}>
          Approve
        </button>
      </div>
    ));
  };

  return (
    <div>
      <Navbar/> 
      <h1>Doctor Requests</h1>
      <div id="doctorRequestsContainer">{renderDoctorRequests()}</div>
    </div>
  );
}