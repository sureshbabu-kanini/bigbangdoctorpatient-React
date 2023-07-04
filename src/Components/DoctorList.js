import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DoctorList.css';
import Navbar from './Navbar';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('https://localhost:7114/api/Doctor/ApprovedDoctors');
      if (!response.data) {
        throw new Error('Failed to fetch doctors');
      }
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const convertToImage = (imageData) => {
    const base64Image = `data:image/jpeg;base64,${imageData}`;
    return <img src={base64Image} alt="Doctor" className="docimg" />;
  };

  const renderDoctors = () => {
    return doctors.map((doctor) => (
      <div key={doctor.doctor_Id} className="card">
        <div className="card-image">
          {doctor.imageData && convertToImage(doctor.imageData)}
        </div>
        <div className="card-body">
          <h5 className="card-title">{doctor.doctor_Name}</h5>
          <p className="card-text">Specialization: {doctor.specialization}</p>
          <p className="card-text">Email: {doctor.doctor_Email}</p>
          <p className="card-text">Phone: {doctor.doctor_PhNo}</p>
          {/* Render other doctor details */}
        </div>
      </div>
    ));
  };

  return (
    <div className='DoctorList'>
      <Navbar/>  
      <center><h1>Doctor List</h1></center>
      <div className="card-container">
        {doctors.length > 0 ? (
          renderDoctors()
        ) : (
          <p>Loading doctors...</p>
        )}
      </div>
    </div>
  );
}
