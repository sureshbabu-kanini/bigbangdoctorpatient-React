import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Patientcard.css';
import Navbar from './Navbar';


export default function PatientCard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('https://localhost:7114/api/Patient');
      if (!response.data) {
        throw new Error('Failed to fetch patients');
      }
      const fetchedPatients = response.data.map((patient) => ({ ...patient, isEditable: false }));
      setPatients(fetchedPatients);
      return fetchedPatients; // Return the fetched data
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleUpdate = async (patientId) => {
    try {
      const response = await axios.get(`https://localhost:7114/api/Patient/${patientId}`);
      const updatedPatient = response.data;

      setPatients((prevPatients) =>
        prevPatients.map((prevPatient) =>
          prevPatient.patient_Id === patientId
            ? {
                ...prevPatient,
                isEditable: true,
                updatedName: updatedPatient.patient_Name,
                updatedDisease: updatedPatient.disease,
                updatedPhone: updatedPatient.patient_PhNo,
              }
            : prevPatient
        )
      );
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };
  
  const handleSave = async (patientId) => {
    const patientToSave = patients.find((patient) => patient.patient_Id === patientId);
    if (!patientToSave) return;
  
    try {
      await axios.put(`https://localhost:7114/api/Patient/${patientId}`, {
        patient_Name: patientToSave.updatedName,
        disease: patientToSave.updatedDisease,
        patient_PhNo: patientToSave.updatedPhone,
      });
  
      const updatedPatients = await fetchPatients(); // Fetch the updated list of patients
      setPatients(updatedPatients);
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };
  
  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`https://localhost:7114/api/Patient/${patientId}`);
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="cont">
        {patients.map((patient) => (
          <div key={patient.patient_Id} className="patient-card">
            <div className="patient-details">
              <h2>
                {patient.isEditable ? (
                  <input
                    type="text"
                    value={patient.updatedName}
                    onChange={(e) =>
                      setPatients((prevPatients) =>
                        prevPatients.map((prevPatient) =>
                          prevPatient.patient_Id === patient.patient_Id
                            ? { ...prevPatient, updatedName: e.target.value }
                            : prevPatient
                        )
                      )
                    }
                  />
                ) : (
                  patient.patient_Name
                )}
                <br />
                <span>
                  {patient.isEditable ? (
                    <input
                      type="text"
                      value={patient.updatedDisease}
                      onChange={(e) =>
                        setPatients((prevPatients) =>
                          prevPatients.map((prevPatient) =>
                            prevPatient.patient_Id === patient.patient_Id
                              ? { ...prevPatient, updatedDisease: e.target.value }
                              : prevPatient
                          )
                        )
                      }
                    />
                  ) : (
                    patient.disease
                  )}
                </span>
              </h2>
              <p>
                {patient.isEditable ? (
                  <input
                    type="text"
                    value={patient.updatedPhone}
                    onChange={(e) =>
                      setPatients((prevPatients) =>
                        prevPatients.map((prevPatient) =>
                          prevPatient.patient_Id === patient.patient_Id
                            ? { ...prevPatient, updatedPhone: e.target.value }
                            : prevPatient
                        )
                      )
                    }
                  />
                ) : (
                  patient.patient_PhNo
                )}
              </p>
            </div>
            <div className="patient-buttons">
              {patient.isEditable ? (
                <>
                  <button
                    className="patient-save-btn"
                    onClick={() => handleSave(patient.patient_Id)}
                  >
                    Save
                  </button>
                  <button
                    className="patient-cancel-btn"
                    onClick={() =>
                      setPatients((prevPatients) =>
                        prevPatients.map((prevPatient) =>
                          prevPatient.patient_Id === patient.patient_Id
                            ? { ...prevPatient, isEditable: false }
                            : prevPatient
                        )
                      )
                    }
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="patient-edit-btn"
                    onClick={() => handleUpdate(patient.patient_Id)} // Call handleUpdate when the Edit button is clicked
                  >
                    Edit
                  </button>
                  <button
                    className="patient-delete-btn"
                    onClick={() => handleDelete(patient.patient_Id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
