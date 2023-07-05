import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DoctorUpdate() {
  const [selectedDoctor, setSelectedDoctor] = useState({
    doctor_Name: '',
    specialization: '',
    doctor_Email: '',
    doctor_PhNo: '',
    password: '',
  });

  const [userData, setUserData] = useState([]); // Define userData state variable

  useEffect(() => {
    // Fetch and update doctor details from local storage when the component mounts
    fetchDoctorDetailsFromLocalStorage();
  }, []);

  const fetchDoctorDetailsFromLocalStorage = () => {
    // Retrieve doctor name from local storage
    const doctorName = localStorage.getItem('username');

    // Fetch doctor details based on the doctor name
    fetchDoctorDetails(doctorName);
  };

  const fetchDoctorDetails = (doctorName) => {
    axios
      .get(`https://localhost:7114/api/Doctor/ByDoctorName?doctorName=${doctorName}`)
      .then((response) => {
        const doctorData = response.data[0]; // Access the first doctor in the response array

        setSelectedDoctor({
          doctor_Name: doctorData.doctor_Name,
          specialization: doctorData.specialization,
          doctor_Email: doctorData.doctor_Email,
          doctor_PhNo: doctorData.doctor_PhNo,
          password: doctorData.password,
        });
        setUserData(response.data); // Update the userData state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching doctor details:', error);
        // Handle error, e.g., show an error message
      });
  };

  const handleUpdate = () => {
    axios
      .put(`https://localhost:7114/api/Doctor/${selectedDoctor.docter_Id}`, selectedDoctor)
      .then((response) => {
        console.log(response);
        const updatedData = userData.map((data) =>
          data.docter_Id === selectedDoctor.docter_Id ? selectedDoctor : data
        );
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
        <label htmlFor="doctor_Name">Name:</label>
        <input
          type="text"
          id="doctor_Name"
          name="doctor_Name"
          value={selectedDoctor.doctor_Name}
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
        <label htmlFor="doctor_Email">Email:</label>
        <input
          type="email"
          id="doctor_Email"
          name="doctor_Email"
          value={selectedDoctor.doctor_Email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="doctor_PhNo">Phone Number:</label>
        <input
          type="tel"
          id="doctor_PhNo"
          name="doctor_PhNo"
          value={selectedDoctor.doctor_PhNo}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={selectedDoctor.password}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
}
