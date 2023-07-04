import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Appointment.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';



export default function Appointment() {
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
    return base64Image;
  };

  return (
    <Grid container spacing={2}>
      {doctors.map((doctor) => (
        <Grid item key={doctor.doctor_Id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={doctor.imageData ? convertToImage(doctor.imageData) : ''}
                alt={doctor.Doctor_Name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {doctor.Doctor_Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.specialization}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
