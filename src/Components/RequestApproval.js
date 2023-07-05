import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RequestApproval.css';

const AdminDoctorRequests = () => {
  const [doctorRequests, setDoctorRequests] = useState([]);

  useEffect(() => {
    fetchDoctorRequests();
  }, []);

  const fetchDoctorRequests = async () => {
    try {
      const response = await axios.get('https://localhost:7114/api/Admins/DoctorRequests');
      setDoctorRequests(response.data);
    } catch (error) {
      console.error('Error fetching doctor requests:', error);
    }
  };

  const approveDoctorRequest = async (id) => {
    try {
      await axios.post(`https://localhost:7114/api/Admins/ApproveDoctorRequest/${id}`);
      // Refresh the doctor requests list
      fetchDoctorRequests();
      toast.success('Doctor Approved successfully');
    } catch (error) {
      console.error('Error approving doctor request:', error);
    }
  };

  return (
    <div className="doctor-requests-container">
      <h2>Doctor Requests</h2>
      {doctorRequests.length === 0 ? (
        <p>No pending doctor requests</p>
      ) : (
        <div className="doctor-cards-container">
          {doctorRequests.map((doctor) => (
            <div key={doctor.doctor_Id} className="doctor-card">
              <h3>Doctor Name: {doctor.doctor_Name}</h3>
              <p>Specialization: {doctor.specialization}</p>
              <p>Email: {doctor.doctor_Email}</p>
              <p>Status: {doctor.status}</p>
              <button className="approve-button" onClick={() => approveDoctorRequest(doctor.doctor_Id)}>
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer /> {/* Place this component at the root of your app */}
    </div>
  );
};

export default AdminDoctorRequests;
