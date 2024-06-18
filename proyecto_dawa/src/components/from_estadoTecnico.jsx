import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Box, Grid, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function RepairDetailsForm() {
  const [phoneName, setPhoneName] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [technicianName, setTechnicianName] = useState('');
  const [repairDetails, setRepairDetails] = useState([]);
  const [usersDatos, setUsersDatos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const [modeloSeleccionado, setModeloSeleccionado] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [technicians, setTechnicians] = useState([]);
  const [valor, setValor] = useState("");

  useEffect(() => {
    fetch('http://localhost:3200/api/usuarios/users')
      .then((res) => res.json())
      .then((data) => {
        setUsersDatos(data.data);
      })
      .catch(error => console.error('Error al traer usuarios:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3200/api/usuarios/datos')
      .then((res) => res.json())
      .then((data) => {
        setEstados(data.data);
      })
      .catch(error => console.error('Error al cargar los estados:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3200/api/usuarios/tecnicos')
      .then((res) => res.json())
      .then((data) => {
        setTechnicians(data.data);
      })
      .catch(error => console.error('Error al cargar los tecnicos:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3200/api/marcas')
      .then((res) => res.json())
      .then((data) => {
        setMarcas(data.data || []);
      })
      .catch(error => console.error('Error al cargar las marcas:', error));
  }, []);

  const cargarModelos = (selectedMarca) => {
    if (selectedMarca) {
      fetch(`http://localhost:3200/api/modelos/${selectedMarca}`)
        .then((res) => res.json())
        .then((data) => {
          setModelos(data.data || []);
        })
        .catch(error => {
          console.error('Error al cargar los modelos:', error);
        });
    }
  };

  const handleMarcaChange = (event) => {
    const selectedMarca = event.target.value;
    setMarcaSeleccionada(selectedMarca);
    setModeloSeleccionado('');
    cargarModelos(selectedMarca);
  };

  const handleModeloChange = (event) => {
    const selectedModelo = event.target.value;
    setModeloSeleccionado(selectedModelo);
  };

  const handleClienteChange = (event) => {
    const selectedCliente = event.target.value;
    setClienteSeleccionado(selectedCliente);
  };

  const handleSubmit = () => {
    const newRepairDetail = {
      phoneName,
      brand: marcas.find(marca => marca.id_marca === marcaSeleccionada)?.descripcion || '',
      model: modelos.find(modelo => modelo.id_modelo === modeloSeleccionado)?.descripcion || '',
      status: estados.find(estado => estado.id_estado === status)?.descripcion || '',
      technicianName: technicians.find(technician => technician.id_tecnico === technicianName)?.nombre || '',
      cliente: usersDatos.find(user => user.id_usuario === clienteSeleccionado)?.nombre || '',
      valor_total: valor
    };

    fetch('http://localhost:3200/api/usuarios/insertar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRepairDetail),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);

      })
      .catch(error => console.error('Error al enviar los detalles de reparación:', error));
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Detalle de Reparación
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Nombre del cliente</InputLabel>
              <Select
                value={clienteSeleccionado}
                onChange={handleClienteChange}
                label="Nombre del cliente"
              >
                <MenuItem key="" value="">
                  Seleccione un cliente
                </MenuItem>
                {Array.isArray(usersDatos) &&
                  usersDatos.map((user) => (
                    <MenuItem key={user.cedula} value={user.cedula}>
                      {user.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="marca-select-label">Marca</InputLabel>
              <Select
                labelId="marca-select-label"
                id="marca-select"
                value={marcaSeleccionada}
                onChange={handleMarcaChange}
                label="Marca"
                fullWidth
              >
                <MenuItem value="">Seleccione una marca</MenuItem>
                {marcas.map((marca) => (
                  <MenuItem key={marca.id_marca} value={marca.id_marca}>
                    {marca.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="modelo-select-label">Modelo</InputLabel>
              <Select
                labelId="modelo-select-label"
                id="modelo-select"
                value={modeloSeleccionado}
                onChange={handleModeloChange}
                disabled={!marcaSeleccionada}
                label="Modelo"
                fullWidth
              >
                <MenuItem value="">Seleccione un modelo</MenuItem>
                {modelos.map((modelo) => (
                  <MenuItem key={modelo.id_modelo} value={modelo.id_modelo}>
                    {modelo.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                {Array.isArray(estados) && estados.map((estado) => (
                  <MenuItem key={estado.id_estado} value={estado.id_estado}>
                    {estado.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="note"
              label="Notas"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Nombre del Técnico</InputLabel>
              <Select
                value={technicianName}
                onChange={(e) => setTechnicianName(e.target.value)}
                label="Nombre del Técnico"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {Array.isArray(technicians) && technicians.map((technician) => (
                  <MenuItem key={technician.cedula} value={technician.cedula}>
                    {technician.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Valor Total"
              label="Valor Total "
              variant="outlined"
              fullWidth
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default RepairDetailsForm;
