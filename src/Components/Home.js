import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


export default function Home() {
  return (
    <div id="cards_landscape_wrap-2">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <Link to="/Admin">
              <div className="card-flyer">
                <div className="text-box">
                  <div className="image-box">
                    <img src="https://digitalgyantech.com/wp-content/uploads/2021/05/hospitals.jpg" alt="" />
                  </div>
                  <div className="text-container">
                    <h6>Admin</h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <Link to="/login">
              <div className="card-flyer">
                <div className="text-box">
                  <div className="image-box">
                    <img src="https://i.pinimg.com/736x/11/c9/3d/11c93dd6540948421daabb53832e657e.jpg" alt="" />
                  </div>
                  <div className="text-container">
                    <h6>Doctor</h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <Link to="/patientlogin">
              <div className="card-flyer">
                <div className="text-box">
                  <div className="image-box">
                    <img src="https://media.istockphoto.com/id/1225743855/vector/doctor-visiting-patient-and-explains-the-diagnosis-of-the-disease-in-cartoon-flat.jpg?s=612x612&w=0&k=20&c=jM_jBr0NMUmqi-80QMOPrgjGxUb4ow-eo0Xjmnzq8PU=" alt="" />
                  </div>
                  <div className="text-container">
                    <h6>Patient</h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
    </div>
  );
}
