import React, { useState } from 'react';
import { Typography, Box, Grid, Container, Paper, TextField, Button } from '@mui/material';
import '../styles/ContactUs.css'; 

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
        console.error('Error al enviar el formulario:', error);
      });
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} className="contact-form">
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom className="blue-title">
            Contáctanos
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  name="name"
                  label="Nombre"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Correo Electrónico"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  id="message"
                  name="message"
                  label="Mensaje"
                  variant="outlined"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Enviar Mensaje
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
      <img src="https://leyantisectas.com/wp-content/uploads/2021/07/contactanos-2000x789-1.png" alt="Compromiso" className="about-us-image" />
    </Container>
    
  );
};

export default ContactUs;
