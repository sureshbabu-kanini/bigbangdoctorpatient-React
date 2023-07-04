import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import DoctorLogin from './Components/DoctorLogin';
import Navbar from './Components/Navbar';
import ActiveDoctor from './Components/ActiveDoctor';
import PatientCard from './Components/Patientcard';
import AdminLogin from './Components/AdminLogin';
import PatientLogin from './Components/PatientLogin';
import DoctorRegister from './Components/DoctorRegister';
import PatientDoctorCard from './Components/PatientDoctorCard';
import PatientRegister from './Components/PatientRegister';
import Home from './Components/Home';
import PatientViewDoctor from './Components/PatientViewDoctor';
import Appointment from './Components/Appointment';
import RequestApproval from './Components/RequestApproval';
import DoctorList from './Components/DoctorList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/DoctorRegister" element={<DoctorRegister />} />
        <Route path="/login" element={<DoctorLogin />} />
        {/* <Route path="/OTP" element={<Otp />} /> */}
        <Route path="/active" element={<ActiveDoctor />} />
        <Route path="/patient" element={<PatientCard />} />
        <Route path="/Admin" element={<AdminLogin />} />
        <Route path="/patientlogin" element={<PatientLogin />} />
        <Route path="/PatientDoctor" element={<PatientDoctorCard />} />
        <Route path="/patientregister" element={<PatientRegister/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/PatientView" element={<PatientViewDoctor/>}/>
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/Cards" element={<DoctorList />} />
        <Route path="/Navbar" element={<Navbar/>} />
        <Route path="/request" element={<RequestApproval/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
