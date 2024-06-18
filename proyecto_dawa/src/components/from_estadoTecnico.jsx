import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Grid, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function RepairDetailsForm() {
  const [phoneName, setPhoneName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [technicianName, setTechnicianName] = useState('');
  const [repairDetails, setRepairDetails] = useState([]);

  const handleSubmit = () => {
    const newRepairDetail = {
      phoneName,
      brand,
      model,
      status,
      note,
      technicianName,
    };
    setRepairDetails([...repairDetails, newRepairDetail]);
    // Clear the form fields
    setPhoneName('');
    setBrand('');
    setModel('');
    setStatus('');
    setNote('');
    setTechnicianName('');
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Detalle de Reparación
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre del Teléfono"
              variant="outlined"
              fullWidth
              value={phoneName}
              onChange={(e) => setPhoneName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Marca"
              variant="outlined"
              fullWidth
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Modelo"
              variant="outlined"
              fullWidth
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Estado del Teléfono</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Estado del Teléfono"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Recibido">Recibido</MenuItem>
                <MenuItem value="En Reparación">En Reparación</MenuItem>
                <MenuItem value="Reparado">Reparado</MenuItem>
                <MenuItem value="Entregado">Entregado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nota"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nombre del Técnico"
              variant="outlined"
              fullWidth
              value={technicianName}
              onChange={(e) => setTechnicianName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Ingresar Producto
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h5" gutterBottom>
          Productos Ingresados
        </Typography>
        {repairDetails.map((detail, index) => (
          <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography><strong>Nombre del Teléfono:</strong> {detail.phoneName}</Typography>
            <Typography><strong>Marca:</strong> {detail.brand}</Typography>
            <Typography><strong>Modelo:</strong> {detail.model}</Typography>
            <Typography><strong>Estado del Teléfono:</strong> {detail.status}</Typography>
            <Typography><strong>Nota:</strong> {detail.note}</Typography>
            <Typography><strong>Nombre del Técnico:</strong> {detail.technicianName}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default RepairDetailsForm;

