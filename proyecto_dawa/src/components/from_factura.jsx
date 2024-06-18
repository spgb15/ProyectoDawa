import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Box, Grid, Button } from '@mui/material';

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
  createRow('Product A', 2, 50.00),
  createRow('Product B', 1, 75.00),
  createRow('Product C', 3, 25.00),
];

export default function Invoice() {
  const [rows, setRows] = React.useState(initialRows);

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

  const addNewItem = () => {
    setRows([...rows, createRow('', 0, 0)]);
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
          <Typography variant="h6">FACTURA #001</Typography>
          <Typography variant="subtitle1">June 18, 2024</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Datos:</Typography>
          <Typography>Codigo</Typography>
          <Typography>Cliente</Typography>
          <Typography>9 de Obtubre </Typography>
          <Typography>Ecuador, Guayaquil</Typography>
        </Grid>
        </Grid>
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={addNewItem}>
          Agregar producto
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
        
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
              <TableCell align="right">{`${(TAX_RATE * 150).toFixed(0)} %`}</TableCell>
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
          <Typography variant="h6">Notes:</Typography>
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

    
    </Box>
  );
}

