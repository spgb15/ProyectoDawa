import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Tabla_Repuestos({ id_marca, id_modelo, rol }) {
    const [repuestos, setRepuestos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id_marca && id_modelo) {
                    const response = await fetch('http://localhost:3200/api/repuestos/', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id_marca, id_modelo })
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    
                    const data = await response.json();
                    setRepuestos(data.data || []);
                }
            } catch (error) {
                console.error('Error fetching repuestos:', error);
            }
        };

        fetchData();
    }, [id_marca, id_modelo]);

    return (
        <Box sx={{ marginLeft: '10%', marginRight: '10%', width: '80%' }}>
            <Typography variant='h4' component="h4" textAlign="center">Precios de referencia de los productos</Typography>
            <Typography variant="body1" component="h4" textAlign="center" color="main">Precio referencial. Para mayor información comunicarse con servicio al cliente</Typography>
            <br/>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{fontWeight: "700"}}>Repuesto</TableCell>
                            <TableCell align="left" sx={{fontWeight: "700"}}>Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {repuestos.map((repuesto) => (
                            <TableRow key={repuesto.repuesto_id}>
                                <TableCell align="center">{repuesto.descripcion}</TableCell>
                                <TableCell align="left">$ {repuesto.costo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
