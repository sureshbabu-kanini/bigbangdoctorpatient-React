import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DoctorCard.css';
import Navbar from './Navbar';

export default function DoctorCard() {
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

  return (
    <div className='new'>
      <Navbar />
      <div className="card-list">
        {doctors.map((doctor) => (
          <div key={doctor.doctor_Id} className="card">
            <div className="card-image">{doctor.imageData && convertToImage(doctor.imageData)}</div>
            <div className="card-details">
              <h2>{doctor.doctor_Name}</h2>
              <p>Specialization: {doctor.specialization}</p>
              <p>Email: {doctor.doctor_Email}</p>
              <p>Phone: {doctor.doctor_PhNo}</p>
              {/* Render other doctor details */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
