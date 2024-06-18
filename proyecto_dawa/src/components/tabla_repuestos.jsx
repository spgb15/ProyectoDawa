import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

export default function Tabla_Repuestos({ id_marca, id_modelo, rol }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const [repuestos, setRepuestos] = useState([]);
    const [banderaEditar, setBanderaEditar] = useState(false);
    const [banderaEliminar, setBanderaEliminar] = useState(false);
    const [nuevoRepuestoModal, setNuevoRepuestoModal] = useState({
        repuesto_id: '',
        marca: '',
        modelo: '',
        descripcion: '',
        precio: '',
        stock: ''
    });

    useEffect(() => {
        const fetchRepuestos = async () => {
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
                        throw new Error('Fallo al traer los datos');
                    }

                    const data = await response.json();
                    setRepuestos(data.data || []);
                }
            } catch (error) {
                console.error('Error al traer los repuestos:', error);
            }
        };

        fetchRepuestos();
    }, [id_marca, id_modelo]);

    const handleEditar = (repuesto) => {
        setBanderaEditar(true);
        setNuevoRepuestoModal({
            repuesto_id: repuesto.repuesto_id,
            marca: repuesto.id_marca,
            modelo: repuesto.id_modelo,
            descripcion: repuesto.descripcion,
            precio: repuesto.costo,
            stock: repuesto.stock
        });
    };

    const handleEliminar = (repuesto) => {
        setBanderaEliminar(true);
        setNuevoRepuestoModal({
            repuesto_id: repuesto.repuesto_id,
        });
    };

    const eliminarRepuesto = async () => {
            if (banderaEliminar && nuevoRepuestoModal.repuesto_id) {
                try {
                    const response = await fetch(`http://localhost:3200/api/repuestos/eliminar/${nuevoRepuestoModal.repuesto_id}`, {
                        method: 'DELETE',
                    });
                    if (!response.ok) {
                        throw new Error('Failed to delete repuesto');
                    }
                    const data = await response.json();

                    const fetchRepuestos = async () => {
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
                            console.error('Error al traer los repuestos:', error);
                        }
                    };
                    fetchRepuestos();
                } catch (error) {
                    console.error('Error deleting repuesto:', error);
                } finally {
                    setBanderaEliminar(false);
                }
            }
        };


    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setNuevoRepuestoModal(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const guardarCambios = async () => {
        try {
            const response = await fetch('http://localhost:3200/api/repuestos/actualizar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    repuesto_id: nuevoRepuestoModal.repuesto_id,
                    marca: nuevoRepuestoModal.marca,
                    modelo: nuevoRepuestoModal.modelo,
                    descripcion: nuevoRepuestoModal.descripcion,
                    precio: nuevoRepuestoModal.precio,
                    stock: nuevoRepuestoModal.stock
                })
            });
            if (!response.ok) {
                throw new Error('Fallo al actualizar el repuesto');
            }
            const data = await response.json();
            setBanderaEditar(false);

            const fetchRepuestos = async () => {
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
                            throw new Error('Fallo al traer información');
                        }

                        const data = await response.json();
                        setRepuestos(data.data || []);
                    }
                } catch (error) {
                    console.error('Error al traer repuestos:', error);
                }
            };
            fetchRepuestos();
        } catch (error) {
            console.error('Error updating repuesto:', error);
        }
    };

    const headersAdmin = [
        { id: 0, label: 'Repuesto', align: "center", fontWeight: "700" },
        { id: 1, label: 'Precio', align: "center", fontWeight: "700" },
        { id: 2, label: 'Stock', align: "center", fontWeight: "700" },
        { id: 3, label: 'Acciones', align: "center", fontWeight: "700" }
    ];

    const headersTecnico = [
        { id: 0, label: 'Repuesto', align: "center", fontWeight: "700" },
        { id: 1, label: 'Precio', align: "center", fontWeight: "700" },
        { id: 2, label: 'Stock', align: "center", fontWeight: "700" }
    ];

    const headersUser = [
        { id: 0, label: 'Repuesto', align: "center", fontWeight: "700" },
        { id: 1, label: 'Precio', align: "center", fontWeight: "700" }
    ];

    let cabeceraTabla = [];
    if (rol === 1) {
        cabeceraTabla = headersAdmin;
    } else if (rol === 2) {
        cabeceraTabla = headersTecnico;
    } else {
        cabeceraTabla = headersUser;
    }

    return (
        <div>
            <Box sx={{ marginLeft: '10%', marginRight: '10%', width: '80%' }}>
                <Typography variant='h4' component="h4" textAlign="center">Precios de referencia de los productos</Typography>
                <Typography variant="body1" component="h4" textAlign="center" color="main">Precio referencial. Para mayor información comunicarse con servicio al cliente</Typography>
                <br />
                <TableContainer component={Paper} sx={{ marginTop: '2%' }}>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {cabeceraTabla.map((titulo) => (
                                    <TableCell key={titulo.id} align={titulo.align} sx={{ fontWeight: titulo.fontWeight }}>
                                        {titulo.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {repuestos.map((repuesto) => (
                                <TableRow key={repuesto.repuesto_id}>
                                    <TableCell align="center">{repuesto.descripcion}</TableCell>
                                    <TableCell align="center">$ {repuesto.costo}</TableCell>
                                    {(rol === 1 || rol === 2) && <TableCell align="center">{repuesto.stock} unidades</TableCell>}
                                    {rol === 1 && (
                                        <TableCell align="center">
                                            <Stack spacing={2} direction="row" sx={{ marginLeft: '30%' }}>
                                                <Button variant="contained" color="info" onClick={() => handleEditar(repuesto)}>
                                                    Editar
                                                </Button>
                                                <Button variant="contained" color="error" onClick={() => handleEliminar(repuesto)}>
                                                    Eliminar
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Modal
                open={banderaEditar}
                onClose={() => setBanderaEditar(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Editar repuesto
                    </Typography>
                    <br />

                    <TextField
                        name="descripcion"
                        id="outlined-required"
                        label="Nombre del Repuesto"
                        onChange={handleChangeInput}
                        value={nuevoRepuestoModal.descripcion}
                        sx={{ width: '100%', marginBottom: '2%' }}
                    />

                    <TextField
                        name="precio"
                        id="outlined-required"
                        label="Costo"
                        value={nuevoRepuestoModal.precio}
                        onChange={handleChangeInput}
                        sx={{ width: '100%', marginBottom: '2%' }}
                    />

                    {(rol === 1 || rol === 2) && (
                        <TextField
                            name="stock"
                            id="outlined-required"
                            label="Stock"
                            value={nuevoRepuestoModal.stock}
                            onChange={handleChangeInput}
                            sx={{ width: '100%', marginBottom: '10%' }}
                        />
                    )}

                    <Stack spacing={2} direction="row">
                        <Button variant='contained' onClick={guardarCambios}>
                            Guardar
                        </Button>
                        <Button variant='contained' color="error" onClick={() => setBanderaEditar(false)}>
                            Cancelar
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            <Modal
                open={banderaEliminar}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        ¿Está seguro de querer eliminar el repuesto?
                    </Typography>
                    <br />
                    <Stack spacing={2} direction="row">
                        <Button variant='contained' onClick={eliminarRepuesto}>
                            Si
                        </Button>
                        <Button variant='contained' color='error' onClick={() => setBanderaEliminar(false)}>
                            No
                        </Button>
                    </Stack>
                </Box>
            </Modal>

        </div>
    );
}
