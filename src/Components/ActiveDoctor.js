import React, { useEffect, useState } from 'react';
import './ActiveDoctor.css';
import Navbar from './Navbar';

const ActiveDoctor = () => {
  const [pendingDoctorData, setPendingDoctorData] = useState([]);
  const [approvedDoctorData, setApprovedDoctorData] = useState([]);

  useEffect(() => {
    // Call the API to retrieve pending doctor data
    fetch('https://localhost:7114/api/Admins/DoctorRequests')
      .then((response) => response.json())
      .then((data) => setPendingDoctorData(data));

    // Call the API to retrieve approved doctor data
    fetch('https://localhost:7114/api/Doctor/ApprovedDoctors')
      .then((response) => response.json())
      .then((data) => setApprovedDoctorData(data));
  }, []);

  const handleApproveDoctor = (id) => {
    // Call the API to approve the doctor with the given id
    fetch(`https://localhost:7114/api/Admins/ApproveDoctorRequest/${id}`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          // Refresh the doctor data after successful approval
          fetch('https://localhost:7114/api/Admins/DoctorRequests')
            .then((response) => response.json())
            .then((data) => setPendingDoctorData(data));
        }
      })
      .catch((error) => {
        console.error('Error approving doctor:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="card-list">
        <div className="card pending-doctor-card">
          <div className="card-body">
            <h5 className="card-title-pending">Pending Request Doctors</h5>
            {pendingDoctorData.map((doctor) => (
              <div key={doctor.doctor_Id} className="card-item">
                <h6>{doctor.doctor_Name}</h6>
                <p>Specialization: {doctor.specialization}</p>
                <p>Email: {doctor.doctor_Email || doctor.email}</p> {/* Use the correct property name for Email */}
                <p>Phone: {doctor.doctor_PhNo || doctor.phone}</p> {/* Use the correct property name for Phone */}
                <p>Status: {doctor.status}</p>
                <button
                  onClick={() => handleApproveDoctor(doctor.doctor_Id)}
                  className="approve-button"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card approved-doctor-card">
          <div className="card-body">
            <h5 className="card-title">Approved Doctors</h5>
            {approvedDoctorData.map((doctor) => (
              <div key={doctor.doctor_Id} className="card-item">
                <h6>{doctor.doctor_Name}</h6>
                <p>Specialization: {doctor.specialization}</p>
                <p>Email: {doctor.doctor_Email || doctor.email}</p> {/* Use the correct property name for Email */}
                <p>Phone: {doctor.doctor_PhNo || doctor.phone}</p> {/* Use the correct property name for Phone */}
                <p>Status: {doctor.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveDoctor;
