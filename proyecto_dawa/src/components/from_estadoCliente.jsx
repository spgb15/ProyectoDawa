import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Grid, Paper, TextField } from '@mui/material';

function RepairStatus() {
  const [status, setStatus] = useState('En espera');
  const [waitTime, setWaitTime] = useState(120); // tiempo de espera en minutos
  const [technicianName, setTechnicianName] = useState('Juan Pérez');

  useEffect(() => {
    if (waitTime > 0) {
      const timer = setInterval(() => {
        setWaitTime(waitTime - 1);
      }, 60000); // disminuir el tiempo cada minuto
      return () => clearInterval(timer);
    } else {
      setStatus('Completo');
    }
  }, [waitTime]);

  const handleContactTechnician = () => {
    // Aquí puedes añadir la lógica para contactar al técnico, como abrir una ventana de chat o enviar un correo electrónico
    alert(`Contactando a ${technicianName}`);
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Estado del Producto
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6">
              Estado: <Button variant="contained" color={status === 'Completo' ? 'success' : 'warning'}>{status}</Button>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Tiempo de espera restante: {waitTime > 0 ? `${Math.floor(waitTime / 60)}h ${waitTime % 60}m` : 'Listo'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Técnico: {technicianName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleContactTechnician}>
              Contactar al Técnico
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default RepairStatus;
