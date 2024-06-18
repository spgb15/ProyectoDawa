import React, { useState } from 'react';
import { Typography, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Rating } from '@mui/material';

const sampleData = [
  { tecnico: 'Juan', phoneName: 'iPhone 12', brand: 'Apple', model: 'A2403', status: 'Completado', hours: 5, rating: 4 },
  { tecnico: 'Juan', phoneName: 'Galaxy S21', brand: 'Samsung', model: 'SM-G996B', status: 'En proceso', hours: 3, rating: 3 },
  { tecnico: 'Juan', phoneName: 'Pixel 5', brand: 'Google', model: 'GD1YQ', status: 'Cancelado', hours: 2, rating: 2 },
  { tecnico: 'Juan', phoneName: 'Xperia 1', brand: 'Sony', model: 'J9110', status: 'Completado', hours: 4, rating: 5 },
];

function AdminDashboard() {
  const [repairDetails, setRepairDetails] = useState(sampleData);

  const totalRepairs = repairDetails.length;
  const inProcess = repairDetails.filter(detail => detail.status === 'En proceso').length;
  const completed = repairDetails.filter(detail => detail.status === 'Completado').length;
  const cancelled = repairDetails.filter(detail => detail.status === 'Cancelado').length;
  const totalHours = repairDetails.reduce((acc, detail) => acc + detail.hours, 0);

  return (
    <Box sx={{ padding: 2, maxWidth: 800, margin: 'auto' }}>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom>
          Panel de Administración de Reparaciones
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Total de Reparaciones: {totalRepairs}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">En Proceso: {inProcess}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Completadas: {completed}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Canceladas: {cancelled}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Total de Horas de Reparación: {totalHours}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>Tecnico</TableCell>
              <TableCell>Nombre del Teléfono</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Horas de Reparación</TableCell>
              <TableCell>Calificación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairDetails.map((detail, index) => (
              <TableRow key={index}>
                <TableCell>{detail.tecnico}</TableCell>
                <TableCell>{detail.phoneName}</TableCell>
                <TableCell>{detail.brand}</TableCell>
                <TableCell>{detail.model}</TableCell>
                <TableCell>{detail.status}</TableCell>
                <TableCell>{detail.hours}</TableCell>
                <TableCell>
                  <Rating value={detail.rating} readOnly />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminDashboard;
