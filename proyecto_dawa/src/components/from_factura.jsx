import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  Grid,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';

const TAX_RATE = 0.10;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const initialRows = [
  createRow('Batería', 2, 50.00),
  createRow('Pantalla', 1, 75.00),
  createRow('Cámara', 3, 25.00),
];

export default function Invoice() {
  const [rows, setRows] = useState(initialRows);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false); 
  const [saveError, setSaveError] = useState(null); 


  useEffect(() => {
    fetch('http://localhost:3200/api/factura/obtener')
      .then(response => response.json())
      .then(data => {
        const formattedClients = data.data.map(client => ({
          id: client.usuario_id,
          name: client.nombre,
          code: client.cedula,
          address: client.direccion,
          city: 'Guayaquil',
          country: 'Ecuador'
        }));
        setClients(formattedClients);
      })
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        const updatedRow = { ...row, [field]: value };
        updatedRow.price = priceRow(updatedRow.qty, updatedRow.unit);
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleClientChange = (event) => {
    const clientId = event.target.value;
    const client = clients.find(c => c.id === clientId);
    setSelectedClient(client);
  };

  const addNewItem = () => {
    setRows([...rows, createRow('', 0, 0)]);
  };

  const saveInvoice = () => {
    fetch('http://localhost:3200/api/factura/guardar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cliente_id: selectedClient.id,
        reparacion_id: 1, 
        fecha_emision: new Date().toISOString(),
        subtotal: subtotal(rows),
        iva: TAX_RATE * subtotal(rows),
        monto_total: subtotal(rows) + (TAX_RATE * subtotal(rows)),
        items: rows.map(({ desc, qty, unit, price }) => ({
          descripcion: desc,
          cantidad: qty,
          valor_unitario: unit,
          valor_total: price,
        })),
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Factura guardada con éxito:', data);
        setSaveSuccess(true);
        setSaveError(null);
      })
      .catch(error => {
        console.error('Error al guardar la factura:', error);
        setSaveError(error.message);
        setSaveSuccess(false);
      });
  };

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    
    <Box sx={{ padding: 2 }}>
      
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="h4" component="h1">JUAN REPARA.</Typography>
          <Typography variant="subtitle1">DAWA</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Typography variant="h6">FACTURA #01</Typography>
          <Typography variant="subtitle1">June 18, 2024</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Datos:</Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Seleccione Cliente</InputLabel>
            <Select value={selectedClient?.id || ''} onChange={handleClientChange} label="Seleccione Cliente">
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedClient && (
            <>
              <Typography>Código: {selectedClient.code}</Typography>
              <Typography>Cliente: {selectedClient.name}</Typography>
              <Typography>Dirección: {selectedClient.address}</Typography>
              <Typography>Ciudad: {selectedClient.city}</Typography>
              <Typography>País: {selectedClient.country}</Typography>
            </>
          )}
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={addNewItem}>
          Agregar producto
        </Button>
        <Button variant="contained" color="primary" onClick={saveInvoice} sx={{ marginLeft: 2 }}>
          Guardar factura
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Precio Unitario</TableCell>
              <TableCell align="right">Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={row.desc}
                    onChange={(e) => handleInputChange(index, 'desc', e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleInputChange(index, 'qty', parseFloat(e.target.value) || 0)}
                    variant="outlined"
                    fullWidth
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={row.unit}
                    onChange={(e) => handleInputChange(index, 'unit', parseFloat(e.target.value) || 0)}
                    variant="outlined"
                    fullWidth
                  />
                </TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IVA</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6">Notas:</Typography>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            placeholder="Observaciones..."
            sx={{ width: '100%', maxWidth: 400 }}
          />
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body1">Subtotal: {ccyFormat(invoiceSubtotal)}</Typography>
          <Typography variant="body1">Tax (10%): {ccyFormat(invoiceTaxes)}</Typography>
          <Typography variant="h6">Total: {ccyFormat(invoiceTotal)}</Typography>
        </Box>
      </Box>

      {saveSuccess && (
        <Typography variant="body1" sx={{ color: 'green', marginTop: 2 }}>
          Factura guardada correctamente.
        </Typography>
      )}
      {saveError && (
        <Typography variant="body1" sx={{ color: 'red', marginTop: 2 }}>
          Error al guardar la factura: {saveError}
        </Typography>
      )}
    </Box>
  );
}
