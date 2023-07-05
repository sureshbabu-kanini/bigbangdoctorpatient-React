import React, { useState } from 'react';
import axios from 'axios';

export default function DoctorUpdate() {
  const [selectedDoctor, setSelectedDoctor] = useState({
    firstName: '',
    specialization: '',
    email: '',
    phoneNumber: '',
  });

  const handleUpdate = () => {
    const doctor_Id = selectedDoctor.id; // Replace with the actual doctor ID

    const updatedData = {
      Doctor_Name: selectedDoctor.firstName,
      Specialization: selectedDoctor.specialization,
      Doctor_Email: selectedDoctor.email,
      Doctor_PhNo: selectedDoctor.phoneNumber,
    };

    axios
      .put(`https://localhost:7114/api/Doctor/${doctor_Id}`, updatedData)
      .then((response) => {
        console.log('Doctor updated:', response.data);
        // Handle success, e.g., show a success message
      })
      .catch((error) => {
        console.error('Error updating doctor:', error);
        // Handle error, e.g., show an error message
      });
  };

  const handleInputChange = (e) => {
    setSelectedDoctor({
      ...selectedDoctor,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Update Doctor Data</h2>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={selectedDoctor.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="specialization">Specialization:</label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          value={selectedDoctor.specialization}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={selectedDoctor.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={selectedDoctor.phoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
