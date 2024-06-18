import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Grid, Paper, CardContent, Card } from '@mui/material';
import { Link } from 'react-router-dom';


function RepairStatus() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [id, setId] = useState(null);
  const [informacion, setInformacion] = useState([]);


  useEffect(() => {
    if (user) {
      setId(user.id_usuario);
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3200/api/usuarios/estado/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          console.log(informacion)
          setInformacion(data.data || []);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [id]);



  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 1200, margin: 'auto' }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Estado del Producto
        </Typography>
        <Grid container spacing={2} alignItems="stretch">
          {informacion.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">
                    Estado:
                    <Button
                      variant="contained"
                      color={item.estado === 'Finalizado' ? 'success' : 'warning'}
                      sx={{ marginLeft: '5%', marginBottom: '2%' }}
                    >
                      {item.estado}
                    </Button>
                  </Typography>
                  <Typography variant="h6">
                    Técnico: {item.nombre_tecnico}
                  </Typography>
                  <Typography variant="body1">
                    Fecha de ingreso: {formatDate(item.fecha_inicio)}
                  </Typography>
                  <Typography variant="body1">
                    Marca: {item.nombre_marca}
                  </Typography>
                  <Typography variant="body1">
                    Modelo: {item.nombre_modelo}
                  </Typography>
                  <Typography variant="body1">
                    Descripcion: {item.descripcion}
                  </Typography>
                  <Typography variant="body1">
                    Costo Total: {"$ " +item.costo_total + " dolares"}
                  </Typography> 
                  </CardContent>
                <Grid container justifyContent="flex-end" sx={{ padding: 2 }}>
                  <Button variant="contained" color="primary" href='/contacto'>
                    Contactar al Técnico
                  </Button>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}

export default RepairStatus;
